module Users

    def self.auth creds, is_admin = false
        name, pwd = creds
        user = SQLer.query("SELECT * FROM users WHERE name='#{SQLer.escape(name)}'").first

        if BCrypt::Password.new(user["pw_hash"]) == (CONFIG["salt"] + pwd)
            if is_admin
                return user["admin_level"] > 0 ? true : false
            end
            return true
        else 
            return false
        end
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