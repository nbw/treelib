module Plantae
    @@species, @@genera, @@families = [], [], []
    def self.init
        @@species, @@genera, @@families = [], [], []
        links = SQLer.query("SELECT sl.species_id, sl.name, sl.url
                    FROM species_links AS sl 
                    JOIN species AS s ON s.id = sl.species_id
                    WHERE s.enabled").to_a.group_by{|l| l["species_id"]}
        SQLer.query('SELECT s.id, s.name, s.common_name, s.description, s.genus_id, s.album_id, 
                            g.name AS genus_name, g.common_name AS genus_common_name
            FROM species AS s
            JOIN genera as g ON s.genus_id = g.id 
            WHERE s.enabled').each do |row|
            # build species
            @@species <<  Species.new({
                :id => row["id"],
                :g_id => row["genus_id"],
                :genus_name => row["genus_name"],
                :genus_common_name => row["genus_common_name"],
                :name => row["name"],
                :common_name => row["common_name"],
                :descrip => row["description"],
                :album_id => row["album_id"],
                :links => links[row["id"]]
            })  
        end

        q_genera = 'SELECT id, name, common_name, description, fam_id FROM genera WHERE enabled'
        SQLer.query(q_genera).each do |row|
            # build genera
            @@genera <<  Genus.new({
                :id => row["id"],
                :name => row["name"],
                :common_name => row["common_name"],
                :descrip => row["description"],
                :f_id => row["fam_id"],
                :species => @@species.select{ |s| s.genus_id == row["id"] }
            })
        end

        q_families = 'SELECT id, name, common_name, description FROM families WHERE enabled'
        SQLer.query(q_families).each do |row|
            # build families
            @@families <<  Family.new({
                :id => row["id"],
                :name => row["name"],
                :common_name => row["common_name"],
                :descrip => row["description"],
                :genera => @@genera.select{ |g| g.family_id == row["id"] }
            })
        end
    end

    def self.species
        return @@species
    end

    def self.get_species id
      return nil if id.nil?
      @@species.find{ |s| s.id == id }
    end

    def self.get_species_by_name name, genus_name=nil
        return name if name.nil?
        if genus_name
          genus = get_genus_by_name(genus_name)
          species = genus ? genus.species.find{ |s| s.name.downcase == name.downcase } : nil
        else
          species = @@species.find{ |s| s.name.downcase == name.downcase }
        end
        return species
    end

    def self.get_species_photos species
        species = species.to_hash
        if album_id = species[:album_id]
            sizes = ['q','z','h']
            photos = Photos::get_photos_urls(album_id, sizes)
            photos.map do |p|
                {   
                    :thumb=>p[sizes[0]], 
                    :medium=>p[sizes[1]], 
                    :original=>p[sizes[2]], 
                    :name => p['name'],
                    :description => p['description'],
                    :flickr_url => p['flickr_url']
                }
            end
        end
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
        q_id, q_name, q_common_name, q_descrip, q_g_id, q_album_id = SQLer.escape(p[:id], p[:name], p[:common_name], p[:descrip], p[:g_id], p[:album_id])
            SQLer::query("UPDATE species
            SET name = '#{q_name}',
                common_name = '#{q_common_name}',
                description = '#{q_descrip}',
                genus_id = #{q_g_id},
                album_id = #{q_album_id}
                WHERE id = #{q_id};")
            SQLer::query("DELETE FROM species_links WHERE species_id=#{q_id}")
            if !p[:links].empty?   
                SQLer::query(Plantae::add_links_query(p[:id], p[:links]))
            end
        end
        self.init # update the tree
        return Species.new(p)
        # s_i = @@species.find_index{ |s| s.id == p[:id] }
        # @@species[s_i] = Species.new(p)
    end

    def self.add_species p
        SQLer::transaction do 
            SQLer::query("INSERT INTO species
                SET name = '#{SQLer.escape(p[:name])}',
                    common_name = '#{SQLer.escape(p[:common_name])}',
                    description = '#{SQLer.escape(p[:descrip])}',
                    genus_id = #{SQLer.escape(p[:g_id])},
                    album_id = #{SQLer.escape(p[:album_id])}")
            p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
            SQLer::query(Plantae::add_links_query(p[:id], p[:links])) if !p[:links].empty?
        end
        s = Species.new(p)
        self.init # update the tree
        # @@species << s
        # @@genera.find{ |g| g.id == p[:g_id].to_i }.species << s
        return s
    end

    def self.delete_species id
        SQLer::query("UPDATE species SET enabled = 0 WHERE id=#{id}")
        s = self.get_species(id)
        g = self.get_genus(s.genus_id)
        @@species.delete(s)
        g.species.delete(s)
    end

    def self.genera
        return @@genera
    end

    def self.get_genus id
      return nil if id.nil?
      @@genera.find{ |g| g.id == id }
    end

    def self.get_genus_by_name name
        return name if name.nil?
        @@genera.find{ |g| g.name.downcase == name.downcase }
    end

    def self.get_genus_photos genus
        num_photos = 15 # genus image cap
        genus = genus.to_hash        
        species_photos, genus_photos = [], []
        genus[:species].each do |s|
            s = s.to_hash
            if album_id = s[:album_id]
                sizes = ['q','z','h']
                photos = Photos::get_photos_urls(album_id, sizes)
                species_photos += photos.map do |p|
                    {   
                        :thumb =>p[sizes[0]], 
                        :medium =>p[sizes[1]], 
                        :original =>p[sizes[2]], 
                        :name => p['name'],
                        :description => p['description'],
                        :flickr_url => p['flickr_url']
                    }
                end
            end
        end

        if species_photos.length > num_photos
            num_photos.times do
                rand_index = rand(species_photos.length)
                genus_photos << species_photos.delete_at(rand_index)
            end
        end

        return genus_photos
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
            common_name = '#{SQLer.escape(p[:common_name])}',
            description = '#{SQLer.escape(p[:descrip])}',
            fam_id = #{SQLer.escape(p[:f_id])}
            WHERE id = #{SQLer.escape(p[:id])};")
        
        self.init # update the tree
        return Genus.new(p)

        # g_i = @@genera.find_index{ |g| g.id == p[:id] }
        # save species reference for new updated copy
        # g_new = Genus.new(p)
        # g_new.species = @@genera[g_i].species
        # @@genera[g_i] = g_new
    end

    def self.add_genus p
        SQLer::transaction do 
            SQLer::query("INSERT INTO genera
                SET name = '#{SQLer.escape(p[:name])}',
                    common_name = '#{SQLer.escape(p[:common_name])}',
                    description = '#{SQLer.escape(p[:descrip])}',
                    fam_id = #{SQLer.escape(p[:f_id])};")
            p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        end
        g = Genus.new(p)
        self.init # update the tree
        # @@genera << g
        # @@families.find{ |f| f.id == p[:f_id].to_i }.genera << g
        return g
    end

    def self.delete_genus id
        SQLer::query("UPDATE genera SET enabled = 0 WHERE id=#{id}")
        g = self.get_genus(id)
        f = self.get_family(g.family_id)
        @@genera.delete(g)
        f.genera.delete(g)
    end

    def self.families
        return @@families
    end

    def self.get_family id
      return nil if id.nil?
      @@families.find{ |f| f.id == id }
    end

    def self.get_family_by_name name
        return name if name.nil?
        @@families.find{ |f| f.name.downcase == name.downcase }
    end

    def self.get_family_photos family
        num_photos = 15 # genus image cap
        family = family.to_hash        
        species_photos, family_photos = [], []
        family[:genera].each do |g|
            g[:species].each do |s|
                s = s.to_hash
                if album_id = s[:album_id]
                    sizes = ['q','z','h']
                    photos = Photos::get_photos_urls(album_id, sizes)
                    species_photos += photos.map do |p|
                        {   
                            :thumb => p[sizes[0]], 
                            :medium => p[sizes[1]], 
                            :original => p[sizes[2]], 
                            :name => p['name'],
                            :description => p['description'],
                            :flickr_url => p["flickr_url"]
                        }
                    end
                end
            end
        end

        if species_photos.length > num_photos
            num_photos.times do
                rand_index = rand(species_photos.length)
                family_photos << species_photos.delete_at(rand_index)
            end
        end

        return family_photos
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
            common_name = '#{SQLer.escape(p[:common_name])}',
            description = '#{SQLer.escape(p[:descrip])}'
            WHERE id = #{SQLer.escape(p[:id])};")
        f_i = @@families.find_index{ |f| f.id == p[:id] }
        @@families[f_i] = Family.new(p)
    end

    def self.add_family p
        SQLer::transaction do
            SQLer::query("INSERT INTO families
            SET name = '#{SQLer.escape(p[:name])}',
                common_name = '#{SQLer.escape(p[:common_name])}',
                description = '#{SQLer.escape(p[:descrip])}';")
            p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        end
        f = Family.new(p)
        @@families << f
        return f
    end

    def self.delete_family id
        SQLer::query("UPDATE families SET enabled = 0 WHERE id=#{id}")
        f = self.get_family(id)
        @@families.delete(f)
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
