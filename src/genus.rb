class Genus
    def initialize(g)
        @id = g[:id]
        @name = g[:name]
        @descrip = g[:descrip]
        @species = g[:species] || []
        @family_id = g[:f_id]
    end
    attr_reader :id, :name, :descrip, :species, :family_id
    def to_hash
        { 
            :id => @id,
            :name => @name,
            :description => @descrip,
            :family_id => @family_id,
            :species => @species.collect{|s| s.to_hash}
        }
    end
    def to_json
        hash = self.to_hash
        hash.to_json
    end
end
