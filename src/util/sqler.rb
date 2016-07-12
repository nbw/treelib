module SQLer
    @db = @client = nil

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
        puts "::SQLer:: Running:<\n\n #{query} \n\n"
        @client.query(query)
    end

    def self.transaction(&block)
        begin
            SQLer.query("BEGIN")
            block.call
            SQLer.query("COMMIT")
        rescue Mysql2::Error => e
            puts e
            SQLer.query("ROLLBACK")
        end 
    end

    def self.escape(*args)
        args = *args

        args.collect do |val|
            val = val.to_s if val.is_a? Numeric
            @client.escape(val)
        end

        return args.size > 1 ? args : args.first
    end

end