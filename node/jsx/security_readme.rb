# generate a salt and store it

salt = BCrypt::Engine.generate_salt

# save a password that is a hash with the salt

pw = BCrypt::Password.create(salt+'my_password')

# users table

columns include id, username, email pw_hash, create date, disable_date, enabled, admin_level 

# how do i store the session? cookie? 

https://paragonie.com/blog/2015/04/secure-authentication-php-with-long-term-persistence
Section: Proactively Secure Long-Term User Authentication

CREATE TABLE auth_tokens (
    id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_id INTEGER UNSIGNED NOT NULL,
    token TEXT NOT NULL,
    user_id INTEGER UNSIGNED NOT NULL,
    expiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth_tokens (
    id INTEGER UNSIGNED NOT NULL PRIMARY KEY,
    
    token TEXT NOT NULL,
    user_id INTEGER UNSIGNED NOT NULL,
    expiry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

session_id INTEGER UNSIGNED NOT NULL UNIQUE KEY,



* though Id use a unique id for SELECTOR

check_session( selector, hash ) 
    select row(SELECTOR) and 
        if result
            check expiry date 
                if fine
                    verify that token = encrypted(hash)
                elsif old 
                    delete that row from the table
                    redirect to /login
        elsif no result
            redirect to /login or tell user to login again
end

login (username and password)
    SELECT the row in user table by username
        if result
            verify that the stored hash matched BCrypt::Password.create(salt+password)
            if verified
                create session
                return session cookie with selector and token
            else
                 "Sorry that username or password is incorrect"
            end
        elsif no result
            "Sorry that username or password is incorrect"
end

create_admin_user (username, email, password)
    # happens during setup for now and there isn't an endpoint
    save: username, email, BCrypt::Password.create(salt+password)
end

delete_users id
    delete: from user table based on id
end

    

