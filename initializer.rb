# You'll need to require these if you
# want to develop while running with ruby.
# The config/rackup.ru requires these as well
# for it's own reasons.
#
# $ ruby heroku-sinatra-app.rb
#
# compatible with ruby 1.8, 1.9, and jruby
require 'rubygems'
require 'erb'
require 'eventmachine'
require 'osc-ruby'
require 'osc-ruby/em_server'
require 'sinatra'
# @server = OSC::EMServer.new( 3002 )

set :app_file, __FILE__
set :root, File.dirname(__FILE__)
set :config, "/config/"
set :models, Proc.new { File.join(root, "models") }
set :sessions, true
set :public, Proc.new { File.join(root, "public") }
set :views, Proc.new { File.join(root, "views") }


configure :production do
end