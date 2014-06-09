---
layout: post
title:  "Color Up 256 Colors In The Terminal"
date:   2014-06-09
---

For the BEWD, we had to write a terminal program - I wrote a little script that makes calls to the WMATA api for next train times.  Pretty cool.

It was looking a bit dull - so I decided to add some color.

![metrocommand screenshot]({{ site.url }}/images/metrocommand.png)

Unfortunately, there was no orange for the Orange line.  It took some googling, but eventually - I found it ...  [Using ANSI Color Codes to Colorize Your Bash Prompt on Linux](http://bitmote.com/index.php?post/2012/11/19/Using-ANSI-Color-Codes-to-Colorize-Your-Bash-Prompt-on-Linux).

Dude even provides some useful info and a bit of code to generate a reference table.

>It is also possible (in these newfangled modern times) to use a full 256 colors in most consoles. The color table below can be used to determine the code for each color by adding the column and row number. In order to make use of these codes, we use the syntax `\033[38;5;#m` for the foreground (text) and `\033[48;5;#m` for the background, or in a single statement like `\033[38;5;#;48;5;#m` to set both at once, where # is an 8-bit (0-255) color code.

>The best way to understand is to try it out. Run the command: `echo -e "testing \033[38;5;196;48;5;21mCOLOR1\033[38;5;208;48;5;159mCOLOR2\033[m"`


{% highlight bash %}
#!/bin/bash
#
# generates an 8 bit color table (256 colors) for reference,
# using the ANSI CSI+SGR \033[48;5;${val}m for background and
# \033[38;5;${val}m for text (see "ANSI Code" on Wikipedia)
#
echo -en "\n   +  "
for i in {0..35}; do
printf "%2b " $i
done
printf "\n\n %3b  " 0
for i in {0..15}; do
echo -en "\033[48;5;${i}m  \033[m "
done
#for i in 16 52 88 124 160 196 232; do
for i in {0..6}; do
let "i = i*36 +16"
printf "\n\n %3b  " $i
for j in {0..35}; do
let "val = i+j"
echo -en "\033[48;5;${val}m  \033[m "
done
done
echo -e "\n"
{% endhighlight %}