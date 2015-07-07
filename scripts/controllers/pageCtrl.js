mySite.controller('pageCtrl', function($scope, $document) {

    // Tabs
    // $scope.content = 'posts';
    $scope.link = function(param){
        var element = document.getElementById(param);
        var options = {
            duration: 700,
            easing: 'easeInOutQuad',
            offset: 200,
            callbackBefore: function(element) {
                console.log('about to scroll to element', element, options);
            },
            callbackAfter: function(element) {
                console.log('scrolled to element', element);
            }
        }        
        $scope.content = param;
        smoothScroll(element, options)
    };
    // $scope.checkContent = function(x) {
    //     return $scope.content === x;
    // };

    $scope.mobileMenu = false;
    $scope.toggleMenu = function(){
        $scope.mobileMenu=($scope.mobileMenu) ? false : true;
        console.log($scope.mobileMenu);
    }
})