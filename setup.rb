require 'rubygems'
require 'mysql2'
require 'json'
require 'bcrypt'
require_relative 'src/users'
require_relative 'src/lib/sqler'

DEV  = ARGV.include? 'dev'

CONFIG = JSON.parse(File.read('config.json'))
SQLer.init
####################################
##### INSTALLING GEMS #####
####################################

# GEMS = ['sinatra', 'sinatra-contrib', 'mysql2', 'json','bcrypt', tree]


# GEMS.each do{ |g|
#     gem install g
# }



####################################
# Database and client
####################################

begin 
    puts 'Connecting to client: #{DB}..'
    username = CONFIG['username'] || "root"
    pw = CONFIG['password'] || ""
    client = Mysql2::Client.new(:host => "localhost", :username => username, :password => pw, :database => CONFIG["database"])
    puts 'Connected to client: #{DB}!'
rescue Mysql2::Error => e
    error = e
    puts e.message
    if e.errno == 1049
        Mysql2::Client.new(:host => "localhost", :username => "root", :password => pw).query("CREATE database #{CONFIG["database"]}")
        puts 'Created database: #{DB}'
        retry
    end  
end


####################################
# Tables
####################################

## Families
begin
    client.query('CREATE TABLE families (
        id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        common_name TEXT DEFAULT NULL,
        description TEXT NOT NULL,
        enabled tinyint(1) DEFAULT 1
    );')
    puts 'Created table families'
rescue Mysql2::Error => e
    error = e
    puts e.message
end 

## Genera
begin
    client.query('CREATE TABLE genera (
        id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        common_name TEXT DEFAULT NULL,
        description TEXT NOT NULL,
        fam_id INTEGER UNSIGNED NOT NULL,
        enabled tinyint(1) DEFAULT 1
    );')
    puts 'Created table genera'
rescue Mysql2::Error => e
    error = e
    puts e.message
end

## Species
begin
    client.query('CREATE TABLE species (
        id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        common_name TEXT DEFAULT NULL,
        description TEXT NOT NULL,
        genus_id INTEGER UNSIGNED NOT NULL,
        album_id INTEGER UNSIGNED DEFAULT NULL,
        enabled tinyint(1) DEFAULT 1
    );')
    puts 'Created table species'
rescue Mysql2::Error => e
    error = e
    puts e.message
end

## Users
# 
begin
    client.query('CREATE TABLE users (
        id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(64) NOT NULL,
        pw_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        create_date DATETIME NOT NULL, 
        disable_date DATETIME DEFAULT NULL,
        enabled tinyint(1) DEFAULT 1,
        admin_level tinyint(1) DEFAULT 0
    );')
    puts 'Created table users'

    puts "\nHi, you're the first one. What's your username?"
    username = gets.chomp
    puts "\nAnd your email?"
    email = gets.chomp
    puts "\nAnd your password?"
    password = BCrypt::Password.create(CONFIG["salt"] + gets.chomp)

    client.query("INSERT INTO users
    SET name = '#{client.escape(username)}',
        email = '#{client.escape(email)}',
        pw_hash = '#{client.escape(password)}',
        create_date = NOW(),
        admin_level = 1;") 

    puts "\nPerfect.\n\n"

rescue Mysql2::Error => e
    error = e
    puts e.message
end

## Photo_albums
begin
    client.query('CREATE TABLE photo_albums (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        photoset_id BIGINT UNSIGNED NOT NULL,
        name TEXT NOT NULL,
        last_updated DATETIME NOT NULL
    );')
    puts 'Created table photo_albums'

rescue Mysql2::Error => e
    error = e
    puts e.message
end

## Photos
begin
    client.query('CREATE TABLE photos (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        flickr_id BIGINT UNSIGNED NOT NULL,
        photoset_id BIGINT UNSIGNED NOT NULL,
        farm INTEGER UNSIGNED NOT NULL,
        secret varchar(64) NOT NULL,
        server INTEGER UNSIGNED NOT NULL,
        name TEXT DEFAULT NULL,
        description TEXT DEFAULT NULL,
        credit TEXT DEFAULT NULL,
        disable_date DATETIME DEFAULT NULL
    );')
    puts 'Created table photos'

rescue Mysql2::Error => e
    error = e
    puts e.message
end

## species_links
begin
    client.query('CREATE TABLE species_links (
        id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        species_id INTEGER UNSIGNED NOT NULL,
        name TEXT NOT NULL,
        url TEXT NOT NULL
    );')
    puts 'Created table species_links'
rescue Mysql2::Error => e
    error = e
    puts e.message
end

# TEST DATA
if DEV 
    ["   INSERT INTO families SET name = 'betulaceae';
    ",
    "   INSERT INTO genera
        SET name = 'alnus',
            fam_id = 1;
    ",
    "   INSERT INTO species
        SET name = 'rubra',
            description = 'early succession species in the coastal area',
            genus_id = 1;
    ",
    "   INSERT INTO species
            SET name = 'sinuata',
            description = 'shrub growing in the boreal forest',
            genus_id = 1;
    ",
    "INSERT INTO genera
            SET name = 'betula',
            fam_id = 1;
    ",
    "INSERT INTO species
        SET name = 'nigra',
        description = 'river birch, grows in southern us',
        genus_id = 2;
    ",
    "INSERT INTO families SET name = 'africa';",
    "INSERT INTO genera
        SET name = 'fake',
        fam_id = 2;
    ",
    "   INSERT INTO species
            SET name = 'fake species',
            description = 'shrub growing in the boreal forest',
            genus_id = 3;
    "].each do |q|
        begin
            client.query(q)
        rescue Mysql2::Error => e
            error = e
            puts e.message
        end
    end
    
    puts "Added some good ol' test data"
end

puts "\nSetup done.\n\nBye!"
