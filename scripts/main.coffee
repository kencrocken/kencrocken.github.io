---
---
$ ->
  scrollToTop = ->
    $('a[href=\'#top\']').on 'click', ->
      $('html, body').animate { scrollTop: 0 }, 'slow'
      false
    return

  scrollToTop()
  return
# scrollReveal CONFIG
config = 
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
  vFactor: 0.60
  complete: (el) ->
window.sr = new scrollReveal(config)