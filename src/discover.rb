module Discover
    def self.get_rand_species n
        species = Plantae::species
        if n > species.length
            puts "Not enough species to choose from."
            return []
        end
        rand_candidates = []
        rand_indexes = (0...species.length).to_a.shuffle[0...n] 
        rand_indexes.each{|rn| rand_candidates  << species[rn]}
        return rand_candidates
    end
    def self.get_rand_photos_uniq_species n, photo_size=""
        species = self.get_rand_species(n)
        q_album_ids = SQLer.escape(species.collect{|s| s.album_id})
        photos = SQLer.query("SELECT 
            s.id AS species_id, s.name AS species_name, pa.id AS album_id, 
            p.flickr_id, p.photoset_id, p.farm, p.secret, p.name, p.description 
            FROM photos AS p
            JOIN photo_albums as pa ON pa.photoset_id = p.photoset_id
            JOIN species as s ON s.album_id =  pa.id
            WHERE pa.id IN (#{q_album_ids})").group_by{|r| r["album_id"]}.collect do |k,photo_pool| 
            rand_photo = photo_pool.sample
            {
                :species_id => rand_photo["species_id"],
                :species_name =>rand_photo["name"],
                :url => Flickr.imageURLBuilder(rand_photo, photo_size)
            }
        end      
    end
end