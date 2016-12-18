class Species
    def initialize(s)
        @id = s[:id].to_i
        @name = s[:name]
        @common_name = s[:common_name] || nil
        @descrip = s[:descrip]
        @genus_id = s[:g_id].to_i
        @genus_name = ""
        @album_id = s[:album_id] || nil
        @links = s[:links] || []
        @photos = []
    end

    attr_accessor :id, :name, :common_name, :descrip, :genus_id, :genus_name, :album_id, :links, :photos

    def to_hash
        h = {}
        instance_variables = self.instance_variables
        instance_variables.collect {|name| h[name.to_s.gsub('@','').to_sym] = instance_variable_get(name)}
        return h
    end

    def to_json
        hash = self.to_hash
        hash.to_json
    end
    
    def refresh
    end 
end