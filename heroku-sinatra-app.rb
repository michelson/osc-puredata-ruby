# You'll need to require these if you
# want to develop while running with ruby.
# The config/rackup.ru requires these as well
# for it's own reasons.
#
# $ ruby heroku-sinatra-app.rb
#
# compatible with ruby 1.8, 1.9, and jruby
require 'rubygems'
require 'eventmachine'
require 'osc-ruby'
require 'osc-ruby/em_server'
require 'sinatra'
# @server = OSC::EMServer.new( 3002 )


configure :production do
  # Configure stuff here you'll want to
  # only be run at Heroku at boot

  # TIP:  You can get you database information
  #       from ENV['DATABASE_URI'] (see /env route below)
end



# Quick test
get '/' do
  "Congradulations!
   You're running a Sinatra application on Heroku!"
end

 get '/env' do
   ENV.inspect
 end
 
 get '/receive' do 
   @server = OSC::EMServer.new( 3004 )
   @server.add_method '/test' do | message |
     @msg =  message.to_a
   end
   @server.run
   "mensaje : #{@msg}"
 end


 get '/v/:num' do
   num = params[:num] || 20
   @client = OSC::Client.new( '190.164.164.193', 3002 )
   @client.send( OSC::Message.new( "/v" , num.to_i  ))
   " #{num} sended!"
 end
 
 get '/test/:num' do
   num = params[:num] || 20
   @client = OSC::Client.new( '190.164.164.193', 3002 )
   @client.send( OSC::Message.new( "/test" , num  ))
   " #{num} sended!"
 end

# Thread.new do
#   @server.run
# end

#@server.add_method '/test' do | message |
#  puts message.to_a
#end

