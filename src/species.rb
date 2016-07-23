class Species
    def initialize(s)
        @id = s[:id].to_i
        @name = s[:name]
        @descrip = s[:descrip]
        @genus_id = s[:g_id].to_i
        @album_id = s[:album_id] || nil
        @links = s[:links] || []
    end

    attr_accessor :id, :name, :descrip, :genus_id, :album_id, :link


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