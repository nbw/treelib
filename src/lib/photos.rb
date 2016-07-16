module Photos
    @scheduler = nil
    def self.init
        self.update
        @scheduler = Rufus::Scheduler.new
        @scheduler.every '1h' do
            self.update
        end
    end

    def self.update
        #.............................
        # Photo albums
        flickr_albums = Flickr::get_photosets
        db_albums = deleted_albums = Photos::get_photo_albums 
        new_albums, modified_albums = [], []
        flickr_albums.each do |fa|
            # check if a new photoset
            db_album_index = db_albums.find_index{|r| r["photoset_id"] == fa["id"]}
            if db_album_index && a = db_albums.delete_at(db_album_index)
                # if not new, check if photoset has been modified
                if a["last_updated"] != Time.at(fa["date_update"])
                    fa["album_id"] = a["id"]
                    modified_albums << fa
                end 
            else 
                # New photosets!
                new_albums << fa
            end
        end

        #.............................
        # Images in modified photo albums
        db_photos = modified_albums_deleted_photos = modified_albums.empty? ? [] : Photos::get_photos(modified_albums.collect{|ma| ma["album_id"]})
        modified_photos, modified_albums_new_photos = [], []
        modified_albums.each do |ma|
            Flickr::get_photos_from_photoset(ma["id"]).each do |fp|
                # check if a new photo
                db_photo_index = db_photos.find_index{|mp| mp["flickr_id"] == fp["id"]}
                if db_photo_index && p = db_photos.delete_at(db_photo_index)
                    if p["secret"] != fp["secret"]
                        fp["photo_id"] = p["id"]
                        modified_photos << fp
                    end
                else
                    # New photos!
                    fp["photoset_id"] = ma["id"]
                    modified_albums_new_photos << fp
                end
            end
        end

        #...............................
        # QUERIES 
        #...............................
        q_new_photo_albums =  []
        q_update_photo_albums = q_update_photos = q_insert_photo_albums = q_insert_photos = q_delete_photo_albums = q_delete_photos = nil
        

        #.......................
        # update modified photos
        if !modified_photos.empty?
            q_modified_photos = modified_photos.collect do|p| 
                q_p_id, q_p_farm, q_p_secret, q_p_server = SQLer.escape(p["photo_id"], p['farm'], p['secret'], p['server'])
                "(#{q_p_id}, #{q_p_farm}, '#{q_p_secret}', #{q_p_server})"
            end.join(",\n")
            
            q_update_photos = "INSERT INTO photos (id, farm, secret, server) VALUES\n" + 
                q_modified_photos +
                "\nON DUPLICATE KEY UPDATE id=VALUES(id),\nfarm=VALUES(farm),\nsecret=VALUES(secret),\nserver=VALUES(server)"

        end

        #.......................
        # update modified photo_albums
        if !modified_albums.empty?
            q_modified_albums_names = "name = CASE photoset_id\n" + modified_albums.collect{|ma| "WHEN #{ma["id"]} THEN '#{ma["title"]["_content"]}'"}.join("\n") + "\nEND,\n"
            q_modified_albums_dates = "last_updated = CASE photoset_id\n" + modified_albums.collect{|ma| "WHEN #{ma["id"]} THEN '#{Time.at(ma["date_update"]).to_s}'"}.join("\n") + "\nEND"
            q_update_photo_albums = "UPDATE photo_albums\nSET " + 
                q_modified_albums_names + q_modified_albums_dates +
                "\nWHERE photoset_id IN (#{modified_albums.collect{|ma| ma['id']}.join(', ')})"
        end

        #.....................................
        # new photos for existing photo albums
        q_new_photos = modified_albums_new_photos.collect do |p|
                q_p_id, q_ps_id, q_p_farm, q_p_secret, q_p_server = SQLer.escape(p["id"], p["photoset_id"], p['farm'], p['secret'], p['server'])
                "(#{q_p_id}, #{q_ps_id},  #{q_p_farm}, '#{q_p_secret}', #{q_p_server})"
        end
        #...........................
        # new albums with new photos
        new_albums.each do |na|
            q_ps_id, q_pa_name, q_pa_lu = SQLer.escape(na["id"], na["title"]["_content"], Time.at(na["date_update"]).to_s)
            q_new_photo_albums << "(#{q_ps_id}, '#{q_pa_name}', '#{q_pa_lu}')"
            
            Flickr::get_photos_from_photoset(na["id"]).each do |p|
                q_p_id, q_p_farm, q_p_secret, q_p_server = SQLer.escape(p["id"], p['farm'], p['secret'], p['server'])
                q_new_photos << "(#{q_p_id}, #{q_ps_id},  #{q_p_farm}, '#{q_p_secret}', #{q_p_server})"
            end
        end
        
        if !q_new_photo_albums.empty?
            q_insert_photo_albums = "INSERT INTO photo_albums (photoset_id, name, last_updated) VALUES \n" + q_new_photo_albums.join(",\n") + ";" 
        end

        if !q_new_photos.empty?
            q_insert_photos = "INSERT INTO photos (flickr_id, photoset_id, farm, secret, server) VALUES \n" + q_new_photos.join(",\n") + ";" 
        end

        #.......................
        # Deleted photo albums
        q_delete_photos_where = []
        if !deleted_albums.empty?
            delete_album_ids = deleted_albums.collect{|da| da["photoset_id"]}
            q_delete_photo_albums = "DELETE FROM photo_albums WHERE photoset_id IN ( #{delete_album_ids.join(", ")} )"    
            q_delete_photos_where <<  "photoset_id IN ( #{delete_album_ids.join(", ")} )"
        end
        #...............................
        # deleted photos from modified albums
        delete_photo_ids = modified_albums_deleted_photos.collect{|da| da["flickr_id"]}
        q_delete_photos_where << "flickr_id IN ( #{delete_photo_ids.join(", ")} )" if !delete_photo_ids.empty?
        #...............................
        # deleted photos query
        if !q_delete_photos_where.empty?
            q_delete_photos = "DELETE FROM photos WHERE " + q_delete_photos_where.join(" OR ") 
        end

        if(q_update_photo_albums||q_delete_photo_albums||q_insert_photo_albums)        
            SQLer.transaction do 
                SQLer.query(q_update_photos) if q_update_photos
                SQLer.query(q_update_photo_albums) if q_update_photo_albums
                SQLer.query(q_insert_photo_albums) if q_insert_photo_albums
                SQLer.query(q_insert_photos) if q_insert_photos
                SQLer.query(q_delete_photo_albums) if q_delete_photo_albums
                SQLer.query(q_delete_photos) if q_delete_photos
            end
        end
    end

    def self.get_photo_albums _id=nil, _photoset_id=nil
        q = "SELECT id, photoset_id, name, last_updated
            FROM photo_albums "
        q_where = []
        q_where << "id = #{SQLer.escape(_id)}" if _id
        q_where << "photoset_id = #{SQLer.escape(_photoset_id)}" if _photoset_id
        q += "WHERE " + q_where.join(" AND ") if !q_where.empty?
        return SQLer.query(q).to_a;
    end

    def self.get_photos _album_ids=nil, _id=nil,
        q = "SELECT p.id, p.flickr_id, p.photoset_id, p.farm, p.secret, p.server, p.name, p.description, p.credit
            FROM photos AS p "
        q_where = []
        if _album_ids
            q += "\nJOIN photo_albums AS pa ON pa.photoset_id = p.photoset_id\n"
            if _album_ids.class == Array
                _album_ids = _album_ids.join(', ')
            end
            q_where << "pa.id IN (#{SQLer.escape(_album_ids)})"
        end
        q_where << "p.id = #{SQLer.escape(_id)}" if _id
        q += "WHERE " + q_where.join(" AND ") if !q_where.empty?
        return SQLer.query(q).to_a;
    end

    def self.get_photos_urls photoset_id, _size = ""
        photos = self.get_photos(photoset_id)
        photos.collect do |p|
            Flickr.imageURLBuilder(p,_size)
        end
    end

end