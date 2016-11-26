# gems
require 'rubygems'
# require 'sinatra'
# require 'sinatra/base'
# require "sinatra/reloader" if development?
require 'net/http'
require 'date'
require 'json'
require 'mysql2'
require 'bcrypt'
require 'pp'
require 'open-uri'
require 'rufus-scheduler'

#local files
# CONFIG = JSON.parse(File.read('config.json'))
require_relative 'src/family'
require_relative 'src/genus'
require_relative 'src/species'
require_relative 'src/plantae'
require_relative 'src/users'
require_relative 'src/Discover'
require_relative 'src/lib/basic'
require_relative 'src/lib/flickr'
require_relative 'src/lib/sqler'
require_relative 'src/lib/apitools'
require_relative 'src/lib/photos'

puts "\n\nInitializing... \n\n"
CONFIG = JSON.parse(File.read('config.json'))
SQLer::init
Plantae::init
# Flickr::init
# Photos::init

puts "\n\nDone! \n\n"


# pp Plantae::species
pp Discover::get_rand_photos_uniq_species(3)
# pp SQLer.escape('213sd', 123, ['a', 'b', 'c'], [1,2,3])

# p = SQLer.transaction do
#     SQLer.query('INSERT INTO test SET name="poop"')
#     the_id = SQLer::query("SELECT LAST_INSERT_ID() AS id").first["id"]
#     pp the_id
#     res = SQLer.query("SELECT * FROM test WHERE id=#{the_id.to_s}").first
#     pp res
# end


# pp "DB: Photosets"
# pp Photos::get_photos 2
# Photos::update

# pp Flickr::imageURLBuilder(
#     {"flickr_id"=>25826495851,
#         "secret"=>"ebffc9a99f",
#         "server"=>1692,
#         "farm"=>2,
#         "title"=>"88-04-02",
#         "isprimary"=>0,
#         "ispublic"=>1,
#         "isfriend"=>0,
#         "isfamily"=>0}
# )

# pp Flickr::imageURLBuilder(p[0])
# pp Flickr::imageURLBuilder(p[0],'s')
# pp Flickr::imageURLBuilder(p[0],'a')

