module SQLer
    @db = @client = nil

    class << self
        # class attr accessor
        attr_reader :db, :client
    end

    def self.init
        @db = CONFIG['database']
        @username = CONFIG['username'] || "root"
        @pw = CONFIG['password'] || ""
        begin
          puts "::SQLer:: starting or updating client connection"
            @client = Mysql2::Client.new(:host => "localhost", :username => @username, :password=>@pw, :database => @db)
        rescue Mysql2::Error => e
            puts e.message
        end
    end

    def self.query(query)
      tries = 3 
      begin
        puts "::SQLer:: Running:<\n\n #{query} \n\n"
        @client.query(query)
      rescue Mysql2::Error => e
        # Reset the client
        SQLer.init
        unless (tries -= 1).zero?
          retry
        else
          puts "::SQLer:: Connection Error: #{e}"
          # Add code here to send out an email notif
          raise "Connection issue. We'll be taking a closer look."
        end
      end
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
