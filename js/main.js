$(function(){

function scrollToTop() {
    $("a[href='#top']").on('click', function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
}
scrollToTop();


    $('.contents>div:not(:first)').hide(); // hide div's on load using parent class as a starting point 
    // $('.contents #rocket-content').show();  

    $('.about-me a').click(function(e) {  // on the anchor clicks
        var $div = $('.contents div').eq($(this).index('#about-me-menu a'));
        var $link = $(this).find('i');

        e.preventDefault();
        $('.about-me a i').not($link).removeClass('active');
        $('.contents div').not($div).fadeOut(275);  // hide all but the relevant div
        $('.contents div').removeClass('active');

        $div.delay(300).fadeIn(400,"linear");
        $div.addClass('active');
        $link.addClass('active');
    });
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
var mySite = angular.module('mySite', ['ngResource']);

mySite
.controller('contactCtrl', function($scope, $http, $resource) {
    $http.defaults.useXDomain = true;
    // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.message = {};
    $scope.submitForm = function(isValid, message) {
        $scope.submitted = true;
        console.log(message);
        if (isValid) {
            console.log('valid form');
            console.log($scope.message);
            $http.post( '//formspree.io/kcrocken@gmail.com', $scope.message, {
                params:  $scope.message,
                headers: {
                    // "Access-Control-Allow-Origin": "http://localhost:3000",
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
                        console.log('status');
                        $scope.status = status;
                        $scope.data = data;
                        $scope.headers = headers;
                        $scope.config = config;
                        console.log (data,status,headers,config);
                  }).
                  error(function(data, status, headers, config) {
                        console.log('error');
                        $scope.status = status;
                        $scope.data = data;
                        $scope.headers = headers;
                        $scope.config = config;
                        console.log (data,status,headers,config);
                  });
            //     url     : ,
            //     method  : 'POST',
            //     data    : $.param($scope.message),
            //     headers : {
            //         // 'Access-Control-Allow-Origin': 'http://localhost:3000', 
            //         'Content-Type': 'application/x-www-form-urlencoded' 
            //         },  // set the headers so angular passing info as form data (not request payload)
            //     dataType: "jsonp"
            //     // withCredentials: true
            // })
        //     .$promise.then(function(data) {
        //         console.log(data);

        //         if (!data.success) {
        //           // if not successful, bind errors to error variables
        //           $scope.errorName = data.errors;
        //         } else {
        //           // if successful, bind success message to message
        //           $scope.message = data.message;
        //         }
        //     });
        $scope.submittedValid = true;          
        } else {
            console.log('not valid');
        }
    };
});