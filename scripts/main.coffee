---
---
$ ->
  scrollToTop = ->
    $('a[href=\'#top\']').on 'click', ->
      $('html, body').animate { scrollTop: 0 }, 'slow'
      false
    return

  scrollToTop()
  
  # VH Fix for mobile
  $header = $('header')
  $h = window.innerHeight
  $header.css('min-height', $h)
    
  return  

tb = $('.sub-header.blog')
tbs = 'top-bar-scrolled'
$(window).scroll ->
  if $(this).scrollTop()
    tb.addClass tbs
  else
    tb.removeClass tbs
  return

# scrollReveal CONFIG
scrollRevealConfig = 
  enter: 'bottom'
  move: '8px'
  over: '0.6s'
  wait: '0s'
  easing: 'ease'
  scale:
    direction: 'up'
    power: '5%'
  opacity: 0
  mobile: false
  reset: true
  viewport: window.document.documentElement
  delay: 'onload'
  vFactor: 0.70
  complete: (el) ->
window.sr = new scrollReveal(scrollRevealConfig)