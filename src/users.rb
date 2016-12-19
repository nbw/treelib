module Users

    def self.auth creds, require_admin = false
        name = creds[:username]
        pwd = creds[:password]
        user = SQLer.query("SELECT * FROM users WHERE name='#{SQLer.escape(name)}'").first

        if user && BCrypt::Password.new(user["pw_hash"]) == (CONFIG["salt"] + pwd)
            puts "\n #{name} LOGIN SUCCESSFUL \n"
            return user
        else 
            return false
        end
    end

    def self.is_admin id
        user = SQLer.query("SELECT admin_level FROM users WHERE id='#{SQLer.escape(id)}'").first
        user["admin_level"] && (user["admin_level"] > 0) ? true : false
    end

    def self.new_user username, email, pwd, admin_level = 0
        password = BCrypt::Password.create(CONFIG["salt"] + pwd)

        SQLer.query("INSERT INTO users
            SET name = '#{SQLer.escape(username)}',
                email = '#{SQLer.escape(email)}',
                pw_hash = '#{SQLer.escape(password)}',
                create_date = NOW(),
                admin_level = #{SQLer.escape(admin_level)};")
    end

    def self.user name
        SQLer.query("SELECT * FROM users WHERE name='#{SQLer.escape(name)}'").to_a
    end
    
end