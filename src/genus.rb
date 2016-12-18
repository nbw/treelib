class Genus
    def initialize(g)
        @id = g[:id].to_i
        @name = g[:name]
        @common_name = g[:common_name] || nil
        @descrip = g[:descrip]
        @species = g[:species] || []
        @family_id = g[:f_id].to_i
    end
    
    attr_accessor :id, :name, :common_name, :descrip, :species, :family_id

    def to_hash
        { 
            :id => @id,
            :name => @name,
            :common_name => @common_name,
            :descrip => @descrip,
            :family_id => @family_id,
            :species => @species.collect{|s| s.to_hash}.sort_by!{|s| s[:name].downcase}
        }
    end
    def to_json
        hash = self.to_hash
        hash.to_json
    end
end
