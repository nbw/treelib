module Plantae
    @@species, @@genera, @@families, @@initialized = [], [], []
    def self.init
            q_species = 'SELECT id, name, description, genus_id FROM species'
            SQLer.query(q_species).each do |row|
                # build species
                @@species <<  Species.new({
                    :id => row["id"],
                    :g_id => row["genus_id"],
                    :name => row["name"], 
                    :descrip => row["description"]
                })  
            end

            q_genera = 'SELECT id, name, description, fam_id FROM genera'
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

            q_families = 'SELECT id, name, description FROM families'
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
        if p[:id] && g = self.get_species(p[:id])
            return self.update_species(g,p) 
        else
            return self.add_species(p)
        end
    end

    def self.update_species genus, p
        SQLer::query("UPDATE species
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}',
            genus_id = #{SQLer.escape(p[:g_id])}
            WHERE id = #{SQLer.escape(p[:id])};")
        species = Species.new(p)
    end

    def self.add_species p
        SQLer::query("INSERT INTO species
            SET name = '#{SQLer.escape(p[:name])}',
                description = '#{SQLer.escape(p[:descrip])}',
                genus_id = #{SQLer.escape(p[:g_id])};")
        p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        s = Species.new(p)
        @@species << s
        @@genera.find{ |g| g.id == p[:g_id] }.species << s
        return s
    end

    def self.genera
        return @@genera
    end

    def self.get_genus id
        @@genera.find{ |g| g.id == id }
    end

    def self.edit_genus p
        if p[:id] && g = self.get_genus(p[:id])
            return self.update_genus(g,p) 
        else
            return self.add_genus(p)
        end
    end

    def self.update_genus genus, p
        SQLer::query("UPDATE genera
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}',
            fam_id = #{SQLer.escape(p[:f_id])}
            WHERE id = #{SQLer.escape(p[:id])};")
        genus = Genus.new(p)
    end

    def self.add_genus p
        SQLer::query("INSERT INTO genera
            SET name = '#{SQLer.escape(p[:name])}',
                description = '#{SQLer.escape(p[:descrip])}',
                fam_id = #{SQLer.escape(p[:f_id])};")
        p[:id] = SQLer::query("SELECT LAST_INSERT_ID() AS id;").first["id"]
        g = Genus.new(p)
        @@genera << g
        @@families.find{ |f| f.id == p[:f_id] }.genera << g
        return g
    end

    def self.families
        return @@families
    end

    def self.get_family id
        @@families.find{ |f| f.id == id }
    end

    def self.edit_family p
        if p[:id] && f = self.get_family(p[:id])
            return self.update_family(f,p)
        else
            return self.add_family(p)
        end
    end

    def self.update_family family, p
        SQLer::query("UPDATE families
        SET name = '#{SQLer.escape(p[:name])}',
            description = '#{SQLer.escape(p[:descrip])}'
            WHERE id = #{SQLer.escape(p[:id])};")
        family = Family.new(p)
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

    def self.to_hash
        @@families.collect{ |f| f.to_hash }
    end

    def self.to_json
        hash = self.to_hash
        hash.to_json
    end
end