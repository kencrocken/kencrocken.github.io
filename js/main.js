var mySite = angular.module('mySite', ['ngAnimate']);

mySite.controller('contactCtrl', function($scope, $http) {
    $http.defaults.useXDomain = true;
    $scope.message = {};
    $scope.submitForm = function(isValid, message) {
        $scope.submitted = true;
        // console.log(message);
        if (isValid) {
            // console.log('valid form');
            // console.log($scope.message);
            $http.post( '//formspree.io/kcrocken@gmail.com', $scope.message, {
                params:  $scope.message,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var key in obj) {
                        if (obj[key] instanceof Array) {
                            for(var idx in obj[key]){
                                var subObj = obj[key][idx];
                                for(var subKey in subObj){
                                    str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
                                }
                            }
                        }
                        else {
                            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
                        }
                    }
                    return str.join("&");
                }
            }).
                success(function(data, status, headers, config) {
                        console.log('Success!');
                }).
                    error(function(data, status, headers, config) {
                        console.log('error');
                        $scope.status = status;
                        $scope.data = data;
                        $scope.headers = headers;
                        $scope.config = config;
                        console.log (data,status,headers,config);
                });

            $scope.submittedValid = true;          
        } else {
            console.log('not valid');
        }
    };
});
$(function(){

  function scrollToTop() {
      $("a[href='#top']").on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
  }
  scrollToTop();


    // $('.contents>div:not(:first)').hide(); // hide div's on load using parent class as a starting point 
    // // $('.contents #rocket-content').show();  

    // $('.about-me a').click(function(e) {  // on the anchor clicks
    //     var $div = $('.contents div').eq($(this).index('#about-me-menu a'));
    //     var $link = $(this).find('i');

    //     e.preventDefault();
    //     $('.about-me a i').not($link).removeClass('active');
    //     $('.contents div').not($div).fadeOut(275);  // hide all but the relevant div
    //     $('.contents div').removeClass('active');

    //     $div.delay(300).fadeIn(400,"linear");
    //     $div.addClass('active');
    //     $link.addClass('active');
    // });
});
var config = {

  enter:    'bottom',
  move:     '8px',
  over:     '0.6s',
  wait:     '0s',
  easing:   'ease',

  scale:    { direction: 'up', power: '5%' },

  opacity:  0,
  mobile:   false,
  reset:    true,
  viewport: window.document.documentElement, // <HTML> element by default.

  /**
   *       'always' — delay every time an animation resets
   *       'once'   — delay only the first time an animation reveals
   *       'onload' - delay only for animations triggered by self.init()
   */
  delay:    'onload',

  /**
   *        vFactor changes when an element is considered in the viewport;
   *        the default requires 60% of an element be visible.
   */
  vFactor:  0.60,

  complete: function( el ) {} // Note: reset animations do not complete.
}
window.sr = new scrollReveal(config);
mySite.controller('aboutCtrl', function($scope) {
    
    $scope.content = 'rocket';

    $scope.link = function(param){
        $scope.content = param;
    };

    $scope.checkContent = function(x) {
        return $scope.content === x;
    };

})