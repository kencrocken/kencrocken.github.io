---
layout: post
title: "Rake Tweet"
description: "I thought it would be pretty cool if I could just <code>$rake tweet</code> and my last post would be tweeted.  Below is the solution I came up with."
category: 
tags: []
comments: true
---

I used the [Twitter Gem](https://github.com/sferik/twitter) and [Google_Url_Shortener Gem](https://github.com/joshnesbitt/google_url_shortener).

I created an env.rb file, required it in the Rakefile, and put all the keys and tokens there.   
I added the env.rb file to ```.gitignore```, no need for my keys and tokens to be floating around.

Here is the rake command:

{% highlight ruby %}
require 'rubygems'
require 'rake'
require 'yaml'
require 'twitter'
require 'google_url_shortener'

require File.join(File.dirname(__FILE__), 'env')

desc "Tweet last post"
task :tweet do

  ### Open an empty array and loop through the files in my _posts directory, 
  ### and storing the posts in an array.
  posts = []
  Dir.foreach('./_posts') do |post|
    next if post == '.' || post =='..'
    posts << post
  end

  ### I reverse the array and then grab the first file.
  ### I remove the extension - preparing to build the link.
  last_post_file = posts.reverse[0].gsub(/.markdown/,'')
  last_post_split = last_post_file.split('-',4)
  slug = last_post_split.join('/')
  slug = "http://kencrocken.github.io/#{slug}"
  post_title = last_post_split[3].gsub(/[-]/,' ')
  post_title = post_title.gsub(/\w+/) {|word| word.capitalize}

  ### Just so I know things are working I put the post title and slug strings.
  puts post_title
  puts slug

  ### I call the Url Shortener and pass it the api_key
  Google::UrlShortener::Base.api_key = "#{API_KEY}"
  url = Google::UrlShortener::Url.new(:long_url => "#{slug}")
  short_url = url.shorten!

  ### Just want to make sure things are working.
  puts short_url

  ### I call the Twitter gem and pass the configuration block.
  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = "#{CONSUMER_KEY}"
    config.consumer_secret     = "#{CONSUMER_SECRET}"
    config.access_token        = "#{ACCESS_TOKEN}"
    config.access_token_secret = "#{ACCESS_TOKEN_SECRET}"
  end

  ### Finally the post title and the short url are tweeted.
  client.update("#{post_title} #{short_url}")
end

{% endhighlight %}