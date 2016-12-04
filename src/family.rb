class Family
    def initialize(f)
        @id = f[:id].to_i
        @name = f[:name]
        @descrip = f[:descrip]
        @genera = f[:genera] || []
    end
    attr_accessor :id, :name, :genera, :descrip
    def to_hash
        { 
            :id => @id,
            :name => @name,
            :descrip => @descrip,
            :genera => @genera.collect{|g| g.to_hash}.sort_by!{|g| g[:name].downcase}
        }
    end
    def to_json
        hash = self.to_hash
        hash.to_json
    end
end