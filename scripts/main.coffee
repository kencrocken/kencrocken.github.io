---
---
$ ->
  scrollToTop = ->
    $('a[href=\'#top\']').on 'click', ->
      $('html, body').animate { scrollTop: 0 }, 'slow'
      false
    return

  scrollToTop()
  

  $header = $('header')
  $h = window.innerHeight
  $header.css('min-height', $h)
    
  return  
# onepage-scroll Config
# $('.wrapper').onepage_scroll
#   sectionContainer: 'article'
#   easing: 'linear'
#   animationTime: 600
#   pagination: true
#   updateURL: false
#   # beforeMove: (index) ->
#   # afterMove: (index) ->
#   loop: false
#   keyboard: true
#   responsiveFallback: false
#   direction: 'vertical'
  
# $('.scroll-down-icon').on 'click', ->
#   $('.wrapper').moveTo(2)
#   return

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