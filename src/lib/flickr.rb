module Flickr

    @api_key = @user_id = nil 

    def self.init
        @api_key = CONFIG["flickr_api_key"]
        @user_id = CONFIG["flickr_user_id"]
    end

    def self.get_photosets
        # Reference: https://www.flickr.com/services/api/flickr.photosets.getList.html
        #
        # Structure:
        # https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={api_key}&user_id={user_id}&format=json&nojsoncallback=1

        url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=#{@api_key}&user_id=#{@user_id}&format=json&nojsoncallback=1"
        request = open(url)
        body = request.read
        res = JSON.parse(body)["photosets"]["photoset"]

        # JSON.parse integers correctly instead of as strings
        res.each do |r| 
            r.each do |k,v|
                r[k] = v.to_i if v.class == String && v.is_i? 
            end
        end

        return res
    end
    def self.get_photos_from_photoset ps_id
        # Reference: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
        #
        # Structure:
        # https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={api_key}photoset_id={photoset_id}&user_id={user_id}&format=json&nojsoncallback=1
        url =  "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=#{@api_key}&photoset_id=#{ps_id}&user_id=#{@user_id}&format=json&nojsoncallback=1"
        request = open(url)
        body = request.read
        res = JSON.parse(body)["photoset"]["photo"]
        
        # JSON.parse integers correctly instead of as strings
        res.each do |r| 
            r.each do |k,v|
                r[k] = v.to_i if v.class == String && v.is_i? 
            end
        end
        
        return res
    end

    def self.imageURLBuilder photo, size = ""
        # Reference: https://www.flickr.com/services/api/misc.urls.html
        #
        # https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        #     or
        # https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
        #     or
        # https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
        # 
        # The letter suffixes are as follows:
        formats = [ 
            's',  #  small square 75x75
            'q',  #  large square 150x150
            't',  #  thumbnail, 100 on longest side
            'm',  #  small, 240 on longest side
            'n',  #  small, 320 on longest side
            "",   #  medium, 500 on longest side
            'z',  #  medium 640, 640 on longest side
            'c',  #  medium 800, 800 on longest side
            'b',  #  large, 1024 on longest side
            'h',  #  large 1600, 1600 on longest side
            'k',  #  large 2048, 2048 on longest side
            'o'   #  original image, either a jpg, gif or png, depending on source format
        ]

        if formats.include?(size)
            return "https://farm#{photo["farm"]}.staticflickr.com/#{photo["server"]}/#{photo["flickr_id"]}_#{photo["secret"]}#{size.empty? ? "":"_" + size}.jpg"
        else
            raise  "Not a correct flickr size format."
        end
    end
end