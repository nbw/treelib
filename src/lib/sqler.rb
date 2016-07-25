module SQLer
    @db = @client = nil

    class << self
        # class attr accessor
        attr_reader :db, :client
    end

    def self.init
        @db = CONFIG['database']
        @pw = CONFIG['password'] || ""
        begin
            @client = Mysql2::Client.new(:host => "localhost", :username => "root", :password=>@pw, :database => @db)
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

        args = *args.collect do |val|
            case val
            when Fixnum
                @client.escape(val.to_s).to_i
            when Numeric
                @client.escape(val.to_s).to_i
            when Array
                val.collect do |v|
                    if (v.is_a? Numeric)|| (v.is_a? Fixnum)
                        @client.escape(val.to_s).to_i
                    else
                        @client.escape(v)
                    end
                end
                val.join(", ")
            else
                @client.escape(val)
            end
        end

        return args.size > 1 ? args : args.first
    end

end