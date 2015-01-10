$(function(){

function scrollToTop() {
    $("a[href='#top']").on('click', function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
}
scrollToTop();
});
window.sr = new scrollReveal();