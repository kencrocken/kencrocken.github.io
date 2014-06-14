---
layout: post
title:  "Ruby, R and My GMail"
date:   2014-06-14
---
For the Back End class at GA, we have to submit a final project.  One thing that is near and dear is E-Discovery.  I didn't realize that you needed a law degree and license to read emails, but it appears that you do - and it pays.  So, when the final project was brought up, I thought I could develop some basic assessment tools - an app that will help assess the size of the email data collected and the contents of the data collected.  I'm in the Data Science classes at Coursera too, so I thought I could plot some info and subset in R.  Pretty cool right?  Ruby & R!

I wasn't sure where to start with the Ruby script, so I turned to my old pal Google and we started to chat about Ruby script and email, when finally Google mentioned Sau Cheong Chang and the book Exploring Everyday Things, part of which deals with examining email with Ruby and R -- bingo!

The Ruby script below, is pretty much from the book - I didn't change too much up.  It basically reads my Gmail account and spits out a CSV file.  For my final project, things will have to be different, but this is a start.

{% highlight ruby %}

require 'csv'
require 'mail'

EMAILS = 2000
USER = 'kcrocken'
PASS = 'youdontgetmypassword'
x = 0

def write_row(mail, csv)
  email_data = []
  email_data << mail.from
  email_data << mail.to
  email_data << mail.date
  csv << email_data
end

Mail.defaults do
  retriever_method :imap, :address => "imap.gmail.com",
                          :port       => 993,
                          :user_name  => USER,
                          :password   => PASS,
                          :enable_ssl => true
end

gmail = {inbox: 'INBOX', sent: '[Gmail]/Sent Mail'}
gmail.each do |name, mailbox|
  emails = Mail.find(:mailbox => mailbox, 
                     :what => :last, 
                     :count => EMAILS, 
                     :order => :dsc)

  CSV.open("#{name}_gmail.csv", 'w') do |csv|
    csv << %w(from to date)
    emails.each do |mail|
      begin 
        write_row mail, csv
        x += 1
        puts "#{x} : #{mail.from} to #{mail.to} with subject: #{mail.date}"
      rescue
        puts "Cannot write this mail -> #{mail.from} to #{mail.to} with subject: #{mail.subject}"
      end
    end
  end
end
{% endhighlight %}

Chang also provides an R script to plot the data, I changed it up a little to suit my needs.  I found that the time frames for my inbox and sent mail is a bit different, not surprising since I get a lot more mail than I send out.  So I had to adjust the R script to account for the differing times.  Eventually, I just subsetted the data to May and then merged the data with "NA" where appropriate.

{% highlight ruby %}

library(ggplot2) ## Initialize the GGPlot library

# Read in our data from the Ruby script
inbox_data <- read.table("./data/inbox_gmail.csv", header=TRUE, sep=",")
sent_data <- read.table("./data/sent_gmail.csv", header=TRUE, sep=",")

# Get our inbox data to where we need it, a data frame of 
# the number of emails for each day of May
inbox_data$date <- as.Date(inbox_data$date, format = "%Y-%m-%d")  ## Convert the date column to date data type

# Subset the inbox data to just emails received in May
email_inbox <- subset(inbox_data, inbox_data$date >= "2014-05-01" & inbox_data$date <= "2014-05-30")

dates <- email_inbox$date ## get just the dates
elements <- format(dates, '%d') ## get just the day
inbox_count <- as.data.frame(table(elements)) ## table that up
colnames(inbox_count) <- c("days", "inbox") ## rename the columns - 'days' will be how we merge

# This is to get a count of the senders - similar to the dates.
senders <- as.data.frame(email_inbox$from)
senders_count <- as.data.frame(table(senders))
senders_count <- senders_count[ order(senders_count[,2]),]
senders_count <- subset(senders_count, senders_count$Freq >= 10)

# For the Sent data, its the same process as with the inbox box data
sent_data$date <- as.Date(sent_data$date, format = "%Y-%m-%d")
email_sent <- subset(sent_data, sent_data$date >= "2014-05-01" & sent_data$date <= "2014-05-30")
dates <- email_sent$date
elements <- format(dates, '%d')
sent_count <- as.data.frame(table(elements))
colnames(sent_count) <- c("days", "sent")

# Merge the inbox and sent counts into a data frame
# the merge is keyed on 'days'.  I sent significantly less emails than I received
# so I filled in any empty data in the sent_count with 'NA'
email <- merge(inbox_count, sent_count, by = "days", all.x = TRUE)

# --- Initialize the PNG graphic device to save the plot to an image file
png(file = "./data/figure/email.png", width = 480, height = 480)

# --- Start the plot by calling out the data set to be used - 'email'
ggplot(data = email) + 
    # --- sets our legends, have to set both or two legends are displayed ... weird.
    scale_shape_manual(name = "Mailbox", 
                       values = c(2,3)) + 
    
    scale_colour_manual(name = "Mailbox", 
                        values = c('red','black')) +
    # --- plot our points and lines
    geom_point(aes(x = days,y = inbox, shape = 'inbox', color = "inbox")) +
    geom_smooth(aes(x = days,y = inbox, shape = 'inbox', color = 'inbox', group = 1)) +
    geom_point(aes(x = days,y = sent, shape = 'sent', color = "sent")) +
    geom_smooth(aes(x = days,y = sent, shape = 'sent', color = 'sent', group = 2)) +
    # --- Label the plot
    labs (title = "May Gmail", 
          y = 'Number of Emails', 
          x = 'Days') 
    
dev.off() ## turn the device off
png(file = "./data/figure/senders.png", width = 480, height = 480)
m <- ggplot(senders_count, aes(x = senders, weight = Freq))
m + geom_histogram((aes(fill = ..count..))) +
    scale_fill_gradient("count", low = "black", high = "red") +
    theme(axis.text.x = element_text(size = 10, hjust = 1, angle = 90))
dev.off()

{% endhighlight %}
Below are the plots rendered from the R script - as you can see I get a whole lot more email than I send.
![my gmail]({{ site.url }}/images/email.png){: .img-responsive }

Where does all that email come from? 

![the senders]({{ site.url}}/images/senders.png){: .img-responsive }

Pretty cool, if I do say so myself - a ton of fun cranking this out.  Some emails were changed outside of the above script to protect the innovent.  Though in the end I think I will use the D3 javascript library to visualize the data rather than plots from R - I still think R may play a role, we gots to ensure that data is clean!