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