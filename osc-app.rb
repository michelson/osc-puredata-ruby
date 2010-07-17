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
   @client.send( OSC::Message.new( path , num.to_f  ))
  # session[:message] = "<div class='block'> #{num} sended!</div>"
  # redirect '/send'
 end
 
 get '/demo' do 
    erb :demo
 end

