puts "\n\nInitializing... \n\n"
CONFIG = JSON.parse(File.read('config.json'))
SQLer::init
Plantae::init
Flickr::init
Photos::init

puts "\n\nDone! \n\n"