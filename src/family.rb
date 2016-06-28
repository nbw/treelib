class Family
    def initialize(f)
        @id = f[:id]
        @name = f[:name]
        @descrip = f[:descrip]
        @genera = f[:genera] || []
    end
    attr_accessor :id, :name, :genera, :descrip
    def to_hash
        { 
            :id => @id,
            :name => @name,
            :description => @descrip,
            :genera => @genera.collect{|g| g.to_hash}
        }
    end
    def to_json
        hash = self.to_hash
        hash.to_json
    end
end