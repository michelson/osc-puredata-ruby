require 'initializer'
require 'helpers'



# Quick test
get '/' do
  "Congradulations!
   You're running a Sinatra application on Heroku!"
end

 get '/env' do
   ENV.inspect
 end
 
 get '/receive' do 
   @server = OSC::EMServer.new( 3003 )
   @client = OSC::Client.new( 'localhost', 3002 )

   @server.add_method '/test' do | message |
     puts message.inspect
   end

   Thread.new do
     @server.run
   end
   
 end

 get '/send' do 
   protected!
   erb :send
 end

 post '/arg' do
   # pd path listen /test and /test/v
   #protected!
   num = params[:num] || 20
   port = params[:port] || 3002
   ip = params[:ip] || '190.164.164.193'
   path = params[:path] || '/v'
   
   @client = OSC::Client.new( ip, port )
   @client.send( OSC::Message.new( path , num.to_i  ))
   
  # session[:message] = "<div class='block'> #{num} sended!</div>"
  # redirect '/send'
   
 end
 
 get '/demo' do 
    erb :demo
 end

