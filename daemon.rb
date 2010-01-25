require 'rubygems'
require 'eventmachine'
require 'osc-ruby'
require 'osc-ruby/em_server'

 @server = OSC::EMServer.new( 3003 )

 @server.add_method '/test' do | message |
   puts message.to_a
 end
 
 @server.add_method '/test/v' do | message |
   puts message.to_a
 end

 #Thread.new do
   @server.run
 #end