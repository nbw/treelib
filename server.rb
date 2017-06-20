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
require 'pry'

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
if CONFIG["production"] 
    set :environment, :production 
else
    set :environment, :development
end
use Rack::Session::Cookie, { 
   :key => 'rack.session',
   :domain => CONFIG["domain"],
   :path => '/',
   :expire_after => 3600, # In seconds
   :secret => CONFIG["session_secret"]
}

helpers do
  def admin_protected!
    return if !!session[:user_id] && Users.is_admin(session[:user_id])
    session[:redirect] = request.url
    redirect '/login'
  end

   def admin_api_protected!
    return if !!session[:user_id] && Users.is_admin(session[:user_id])
    session[:redirect] = request.url
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
    @page_data = {
        :page => "home"
    }
    erb :"homepage"
end

get '/about' do
    @page_data = {
        :page => "about"
    }
    erb :"homepage"
end

get '/contact' do
    @page_data = {
        :page => "contact"
    }
    erb :"homepage"
end

get '/search' do
  if params[:species] && item = Plantae::get_species_by_name(params[:species].split('_').last, params[:species].split('_').first)
    item = item.to_hash
    item[:photos] = Plantae::get_species_photos(item)
    type = "species"
  elsif params[:genus] && item = Plantae::get_genus_by_name(params[:genus].gsub("_"," "))
    item = item.to_hash
    item[:photos] = Plantae::get_genus_photos(item)
    type = "genus"
  elsif params[:family] && item = Plantae::get_family_by_name(params[:family].gsub("_"," "))
    item = item.to_hash
    item[:photos] = Plantae::get_family_photos(item)
    type = "family"
  else
    type = nil
  end 
  @page_data = {
    :tree => Plantae.to_hash,
    :pre_selected => (type && item) ? { :type => type, :item => item } : nil
  }
  erb :"search"
end

get '/species/:name' do
  if species = Plantae::get_species_by_name(params['name'].split('_').last, params['name'].split('_').first)
    species = species.to_hash
    species[:photos] = Plantae::get_species_photos(species)
  else 
        species = []
  end

  @page_data = {
    :species => species
  }

  erb :"species"
end

get '/genus/:name' do
    
    name = params['name'].gsub('_',' ')
    
    if genus = Plantae::get_genus_by_name(name).to_hash
        genus[:photos] = Plantae::get_genus_photos(genus)
    else 
        genus = []
    end

    @page_data = {
        :genus => genus
    }

    erb :"genus"
end

get '/family/:name' do
    
    name = params['name'].gsub('_',' ')
    
    if family = Plantae::get_family_by_name(name).to_hash
        family[:photos] = Plantae::get_family_photos(family)
    else 
        family = []
    end

    @page_data = {
        :family => family
    }

    erb :"family"
end

get '/api/get_species_photos' do
    p, photos = params.symbolize_keys, []
    if  !p[:species_id].blank? && species = Plantae::get_species(p[:species_id].to_i)
        photos = Plantae::get_species_photos(species)
    end
    photos.to_json
end

get '/api/get_genus_photos' do
    p, photos = params.symbolize_keys, []
    if  !p[:genus_id].blank? && genus = Plantae::get_genus(p[:genus_id].to_i)
        photos = Plantae::get_genus_photos(genus)
    end
    return photos.to_json
end

get '/api/get_family_photos' do
    p, photos = params.symbolize_keys, []
    if  !p[:family_id].blank? && family = Plantae::get_family(p[:family_id].to_i)
        photos = Plantae::get_family_photos(family)
    end
    return photos.to_json
end

get '/google4b21e8a8f1fbb0c6.html' do
  send_file File.join(settings.public_folder, 'google4b21e8a8f1fbb0c6.html')
end

get '/sitemap.xml' do
  send_file File.join(settings.public_folder, 'sitemap.xml')
end

get 'loaderio-2b04a6e06c2f38ff54ead1a171318b35.txt' do
  send file File.join(settings.public_folder, 'loaderio-2b04a6e06c2f38ff54ead1a171318b35.txt')
end

######################################
# ADMIN PAGES
######################################
get '/admin/family_tree' do

    @page_data = {
        :tree => Plantae.to_hash
    }
    erb :"admin/admin_family_tree"

end

get '/admin/edit_species' do
    admin_protected!
    Photos::update
    species, species_id = nil, params[:id].to_i

    if (species_id > 0) && (species = Plantae::get_species(species_id))
        species = species.to_hash
        if species[:album_id]
            species[:photos] = Photos::get_photos_urls(species[:album_id],['q'])
        end
    else 
        species = []
    end

    genera = Plantae::genera.collect do |g| 
        {   
            :name => g.name, 
            :id => g.id       
        } 
    end.sort_by!{|i| i[:name].downcase}

    if genera.empty?
        redirect '/admin/edit_genus'
    end

    @page_data = {
        :genera => genera,
        :species => species,
        :photo_albums => [{:name=>"select one", :id=>0}] + Photos::get_photo_albums
    }

    erb :"admin/edit_species"
end

get '/admin/edit_genus' do
    admin_protected! 

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
    end.sort_by!{|i| i[:name].downcase}

    if families.empty?
        redirect '/admin/edit_family'
    end

    @page_data = {
        :families => families,
        :genus => genus
    }

    erb :"admin/edit_genus"
end

get '/admin/edit_family' do
    admin_protected!

    family, family_id = nil, params[:id].to_i

    if (family_id > 0)  && (family = Plantae::get_family(family_id))
        family = family.to_hash
    else 
        family = []
    end

    @page_data = {
        :family => family
    }

    erb :"admin/edit_family"
end

get '/admin/signup' do
    admin_protected!
    erb :"admin/signup"
end

get '/login' do
    erb :"login"
end


######################################
# API REQUESTS
######################################
post '/api/edit_species' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    Plantae::edit_species(p).to_json
end

post '/api/edit_genus' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    Plantae::edit_genus(p).to_json
end

post '/api/edit_family' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    Plantae::edit_family(p).to_json
end

post '/api/login' do
    content_type :json
    creds = JSON.parse(request.body.read).symbolize_keys
    if user = Users::auth(creds)
        if user["admin_level"] 
            session[:user_id] = user["id"]
            return {"redirect" => session[:redirect] || '/' }.to_json
        end
        return {"redirect" => '/' }.to_json
    else
        return {"error" => true, "msg"=>"Username or password incorrect. Please try again."}.to_json
    end
end

post '/api/add_admin_user' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    Users::new_user(p[:username], p[:email], p[:password], 1)
end

post '/api/delete_species' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    Plantae::delete_species(p[:id])
    return 200.to_json
end

post '/api/delete_genus' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    s = Plantae::get_genus(p[:id]).species
    if s.empty?
        Plantae::delete_genus(p[:id])
        return 200.to_json
    else
        return {:err=>true, :msg=>"Species [#{s.collect{|sp|sp.name}.join(', ')}] are still linked to the genus."}.to_json
    end
end

post '/api/delete_family' do
    admin_api_protected!
    p = JSON.parse(request.body.read).symbolize_keys
    g = Plantae::get_family(p[:id]).genera
    if g.empty?
        Plantae::delete_family(p[:id])
        return 200.to_json
    else
        return {:err=>true, :msg=>"Genera [#{g.collect{|gs|gs.name}.join(', ')}] are still linked to the family."}.to_json
    end
end

post '/api/refresh' do
    admin_api_protected!
    Plantae::init
    Photos::update
    return 200.to_json
end
