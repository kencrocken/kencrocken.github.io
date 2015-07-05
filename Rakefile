require 'rubygems'
require 'rake'
require 'yaml'
require 'time'
require 'twitter'
require 'google_url_shortener'
require 'open-uri'

require File.join(File.dirname(__FILE__), 'env')


SOURCE = "."
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "markdown",
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"] [layout=layout]
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  layout = ENV["layout"] || "default"
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
    post.puts "layout: #{layout}"
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
  content = ENV["content"] || ""
  hashtags = ENV["hashtags"] || ""
  images = ENV["images"] || ""

  url = "http://dharmatala.net"

  posts = []
  Dir.foreach('./_posts') do |post|
    next if post == '.' || post =='..'
    posts << post
  end

  front_matter = YAML.load_file("./_posts/#{posts.reverse[0]}")
  url = !front_matter["category"].empty? ? "#{url}/#{front_matter["category"]}" : url

  last_post_file = posts.reverse[0].gsub(/.markdown/,'')
  last_post_split = last_post_file.split('-',4)
  slug = last_post_split.join('/')
  long_url = "#{url.downcase}/#{slug}"

  post_title = last_post_split[3].gsub(/[-]/,' ')
  post_title = post_title.gsub(/\w+/) {|word| word.capitalize}

  puts post_title
  puts long_url

  Google::UrlShortener::Base.api_key = "#{GOOGLE_API_KEY}"
  short_url = Google::UrlShortener.shorten!("#{long_url}")
  puts short_url

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = "#{CONSUMER_KEY}"
    config.consumer_secret     = "#{CONSUMER_SECRET}"
    config.access_token        = "#{ACCESS_TOKEN}"
    config.access_token_secret = "#{ACCESS_TOKEN_SECRET}"
  end

  tweet = "#{content} // #{post_title} #{short_url} #{hashtags}"
  count = tweet.length

  if !images.empty?
    OpenURI::Buffer.send :remove_const, 'StringMax' if OpenURI::Buffer.const_defined?('StringMax')
    OpenURI::Buffer.const_set 'StringMax', 0
    
    puts images
    media = open(images)
    client.update_with_media(tweet, media)
  else
    puts "Your tweet is #{count} characters long."
    if count > 140
      abort "Your tweet is too long. You have #{count} characters - it must be 140 or less."
    else
      puts tweet
      client.update(tweet)
    end
  end
end
