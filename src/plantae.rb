module Plantae
    @@species, @@genera, @@families, @@initialized = [], [], []
    def self.init
            
            links = SQLer.query("SELECT sl.species_id, sl.name, sl.url 
                        FROM species_links AS sl 
                        JOIN species AS s ON s.id = sl.species_id
                        WHERE s.enabled").to_a.group_by{|l| l["species_id"]}
            SQLer.query('SELECT id, name, description, genus_id, album_id FROM species WHERE enabled').each do |row|
                # build species
                @@species <<  Species.new({
                    :id => row["id"],
                    :g_id => row["genus_id"],
                    :name => row["name"], 
                    :descrip => row["description"],
                    :album_id => row["album_id"],
                    :links => links[row["id"]]
                })  
            end

            q_genera = 'SELECT id, name, description, fam_id FROM genera WHERE enabled'
            SQLer.query(q_genera).each do |row|
                # build genera
                @@genera <<  Genus.new({
                    :id => row["id"],
                    :name => row["name"],
                    :descrip => row["description"],
                    :f_id => row["fam_id"],
                    :species => @@species.select{ |s| s.genus_id == row["id"] }
                })
            end

            q_families = 'SELECT id, name, description FROM families WHERE enabled'
            SQLer.query(q_families).each do |row|
                # build families
                @@families <<  Family.new({
                    :id => row["id"],
                    :name => row["name"],
                    :descrip => row["description"],
                    :genera => @@genera.select{ |g| g.family_id == row["id"] }
                })
            end
    end

    def self.species
        return @@species
    end

    def self.get_species id
        @@species.find{ |s| s.id == id }
    end

    def self.edit_species p
        if p[:id]
            return self.update_species(p)
        else
            return self.add_species(p)
        end
    end

    def self.update_species p
        SQLer.transaction do
            q_id, q_name, q_descrip, q_g_id, q_album_id = SQLer.escape(p[:id], p[:name], p[:descrip], p[:g_id], p[:album_id])
            SQLer::query("UPDATE species
            SET name = '#{q_name}',
                description = '#{q_descrip}',
                genus_id = #{q_g_id},
                album_id = #{q_album_id}
                WHERE id = #{q_id};")
            SQLer::query("DELETE FROM species_links WHERE species_id=#{q_id}")
            if !p[:links].empty?   
                SQLer::query(Plantae::add_links_query(p[:id], p[:links]))
            end
        end
        s_i = @@species.find_index{ |s| s.id == p[:id] }
        @@species[s_i] = Species.new(p)
    end

    def self.add_species p
        species_id = nil
        SQLer::transaction do 
            SQLer::query("INSERT INTO species
                SET name = '#{SQLer.escape(p[:name])}',
                    description = '#{SQLer.escape(p[:descrip])}',
                    genus_id = #{SQLer.escape(p[:g_id])},
                    album_id = #{SQLer.escape(p[:album_id])}")
            species_id = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
            SQLer::query(Plantae::add_links_query(species_id, p[:links])) if !p[:links].empty?
        end
        p[:id] = species_id
        s = Species.new(p)
        @@species << s
        @@genera.find{ |g| g.id == p[:g_id].to_i }.species << s
        return s
        return []
    end

    def self.delete_species id
        s = self.get_species(id)
        g = self.get_genus(s.genus_id)
        @@species.delete(s)
        g.species.delete(s)
        SQLer::query("UPDATE species SET enabled = 0 WHERE id=#{id}")
    end


    def self.genera
        return @@genera
    end

    def self.get_genus id
        @@genera.find{ |g| g.id == id }
    end

    def self.edit_genus p
        if p[:id] 
            return self.update_genus(p)
        else
            return self.add_genus(p)
        end
    end

    def self.update_genus p
        SQLer::query("UPDATE genera
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}',
            fam_id = #{SQLer.escape(p[:f_id])}
            WHERE id = #{SQLer.escape(p[:id])};")
        g_i = @@genera.find_index{ |g| g.id == p[:id] }
        @@genera[g_i] = Genus.new(p)
    end

    def self.add_genus p
        SQLer::query("INSERT INTO genera
            SET name = '#{SQLer.escape(p[:name])}',
                description = '#{SQLer.escape(p[:descrip])}',
                fam_id = #{SQLer.escape(p[:f_id])};")
        p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        g = Genus.new(p)
        @@genera << g
        @@families.find{ |f| f.id == p[:f_id].to_i }.genera << g
        return g
    end

    def self.delete_genus id
        g = self.get_genus(id)
        f = self.get_family(g.family_id)
        @@genera.delete(g)
        f.genera.delete(g)
        SQLer::query("UPDATE genera SET enabled = 0 WHERE id=#{id}")
    end

    def self.families
        return @@families
    end

    def self.get_family id
        @@families.find{ |f| f.id == id }
    end

    def self.edit_family p
        if p[:id]
            return self.update_family(p)
        else
            return self.add_family(p)
        end
    end

    def self.update_family p
        SQLer::query("UPDATE families
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}'
            WHERE id = #{SQLer.escape(p[:id])};")
        f_i = @@families.find_index{ |f| f.id == p[:id] }
        @@families[f_i] = Family.new(p)
    end

    def self.add_family p
        SQLer::query("INSERT INTO families
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}';")
        p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        f = Family.new(p)
        @@families << f
        return f
    end

    def self.delete_family id
        f = self.get_family(id)
        @@families.delete(f)
        SQLer::query("UPDATE families SET enabled = 0 WHERE id=#{id}")
    end

    def self.add_links_query species_id, links
        if links.empty?
            return ""
        end
        q_links = links.collect do |link|
            q_name, q_url = SQLer.escape(link["name"], link["url"])
            "(#{species_id}, '#{q_name}', '#{q_url}')"
        end
        "INSERT INTO species_links (species_id, name, url) VALUES " + q_links.join(", ")
    end


    def self.to_hash
        @@families.collect{ |f| f.to_hash }.sort_by!{ |f| f[:name].downcase}
    end

    def self.to_json
        hash = self.to_hash
        hash.to_json
    end
end