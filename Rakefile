require "rubygems"
require 'rake'
require 'yaml'
require 'time'
require 'twitter'
require 'google_url_shortener'

require File.join(File.dirname(__FILE__), 'env')

SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "markdown",
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  category = ENV["category"] || ""
  category = "\"#{category.gsub(/-/,' ')}\"" if !category.empty?
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts 'description: ""'
    post.puts "category: #{category}"
    post.puts "tags: #{tags}"
    post.puts "---"
  end
end # task :post

desc "Begin server and watch for changes"
task :s do
  puts "Starting ..."
  system "jekyll serve -w"
end

desc "Tweet last post"
task :tweet do

  posts = []
  Dir.foreach('./_posts') do |post|
    next if post == '.' || post =='..'
    posts << post
  end
  last_post_file = posts.reverse[0].gsub(/.markdown/,'')
  last_post_split = last_post_file.split('-',4)
  slug = last_post_split.join('/')
  slug = "http://kencrocken.github.io/#{slug}"
  post_title = last_post_split[3].gsub(/[-]/,' ')
  post_title = post_title.gsub(/\w+/) {|word| word.capitalize}
  puts post_title
  puts slug

  Google::UrlShortener::Base.api_key = "#{API_KEY}"
  url = Google::UrlShortener::Url.new(:long_url => "#{slug}")
  short_url = url.shorten!
  puts short_url

  # client = Twitter::REST::Client.new do |config|
  #   config.consumer_key        = "#{CONSUMER_KEY}"
  #   config.consumer_secret     = "#{CONSUMER_SECRET}"
  #   config.access_token        = "#{ACCESS_TOKEN}"
  #   config.access_token_secret = "#{ACCESS_TOKEN_SECRET}"
  # end

  # client.update("#{post_title} #{short_url}")
end






