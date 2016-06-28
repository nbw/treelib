module SQLer
    @db, @client  = nil,nil

    class << self
        # class attr accessor
        attr_reader :db, :client
    end

    def self.init
        @db = CONFIG['database']
        begin
            @client = Mysql2::Client.new(:host => "localhost", :username => "root", :database => SQLer.db)
        rescue Mysql2::Error => e
            error = e
            puts e.message
        end
    end

    def self.query(query)
        puts "::SQLer:: Running:<\n #{query} \n"
        @client.query(query)
    end

    def self.escape(s) 
        # handle numbers
        s = s.to_s if s.is_a? Numeric 
        
        @client.escape(s)
    end

end