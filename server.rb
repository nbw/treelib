# gems
require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'net/http'
require 'date'
require 'json'
require 'mysql2'
require 'bcrypt'
require 'pp'
require 'open-uri'
require 'rufus-scheduler'

#local files
require_relative 'src/family'
require_relative 'src/genus'
require_relative 'src/species'
require_relative 'src/plantae'
require_relative 'src/users'
require_relative 'src/lib/apitools'
require_relative 'src/lib/basic'
require_relative 'src/lib/flickr'
require_relative 'src/lib/photos'
require_relative 'src/lib/sqler'
require_relative 'src/startup'

last_request = Time.now
p = []
set :public_folder, File.dirname(__FILE__) + '/static'
set :views, File.dirname(__FILE__) + '/templates'
set :port, CONFIG["port"]
set :environment, :development
set :session_secret, CONFIG["session_secret"]
enable :sessions


helpers do
  def protected!
    return if authorized?
    headers['WWW-Authenticate'] = 'Basic realm="Restricted Area - sorry!"'
    halt 401, "Not authorized\n"
  end

  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? and @auth.basic? and @auth.credentials and Users::auth(@auth.credentials,true)
  end
end

error Sinatra::NotFound do
  erb :"notfound"
end

get '/' do
    erb :"homepage"
end


get '/admin/family_tree' do

    @page_data = {
        :tree => Plantae.to_hash
    }

    erb :"admin/admin_family_tree"

end

get '/admin/edit_species' do
    protected!

    species, species_id = nil, params[:id].to_i

    if (species_id > 0) && (species = Plantae::get_species(species_id))
        species = species.to_hash
        if species[:album_id]
            Photos::update
            species[:photos] = Photos::get_photos_urls(species[:album_id],'q')
        end
    else 
        species = []
    end

    genera = Plantae::genera.collect do |g| 
        {   
            :name => g.name, 
            :id => g.id       
        } 
    end.sort{|a,b| a['name']<=>b['name']}

    if genera.empty?
        redirect '/admin/edit_genus'
    end

    @page_data = {
        :genera => genera,
        :species => species,
        :key => APITools::generate_key,
        :photo_albums => [{:name=>"select one", :id=>0}] + Photos::get_photo_albums
    }

    erb :"admin/edit_species"
end

get '/admin/edit_genus' do
    protected!

    genus, genus_id = nil, params[:id].to_i

    if (genus_id > 0) && (genus = Plantae::get_genus(genus_id))
        genus = genus.to_hash
    else 
        genus = []
    end

    families = Plantae::families.collect do |f| 
        {   
            :name => f.name, 
            :id => f.id       
        } 
    end.sort{|a,b| a['name']<=>b['name']}

    if families.empty?
        redirect '/admin/edit_family'
    end

    @page_data = {
        :families => families,
        :genus => genus,
        :key => APITools::generate_key
    }

    erb :"admin/edit_genus"
end

get '/admin/edit_family' do
    protected!

    family, family_id = nil, params[:id].to_i

    if (family_id > 0)  && (family = Plantae::get_family(family_id))
        family = family.to_hash
    else 
        family = []
    end

    @page_data = {
        :family => family,
        :key => APITools::generate_key
    }

    erb :"admin/edit_family"
end

get '/admin/signup' do
    protected!

    @page_data = {
        :key => APITools::generate_key
    }

    erb :"admin/signup"
end

# API REQUEST
post '/api/edit_species' do
    p = JSON.parse(request.body.read).symbolize_keys
    #validate api_key
    error 401 unless APITools::auth_key!(p[:key])

    Plantae::edit_species(p).to_json
end

post '/api/edit_genus' do
    p = JSON.parse(request.body.read).symbolize_keys

    #validate api_key
    error 401 unless APITools::auth_key!(p[:key])
    
    Plantae::edit_genus(p).to_json
end

post '/api/edit_family' do
    p = JSON.parse(request.body.read).symbolize_keys

    #validate api_key
    error 401 unless APITools::auth_key!(p[:key])

    Plantae::edit_family(p).to_json
end

post '/api/add_admin_user' do
    p = JSON.parse(request.body.read).symbolize_keys

    #validate api_key
    error 401 unless APITools::auth_key!(p[:key])

    Users::new_user(p[:username], p[:email], p[:password], 1)
end


# TO DO: add redirect to homepage for any non supported endpoints
