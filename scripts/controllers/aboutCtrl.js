mySite.controller('aboutCtrl', function($scope) {
    
    // Tabs
    $scope.content = 'rocket';
    $scope.link = function(param){
        $scope.content = param;
    };
    $scope.checkContent = function(x) {
        return $scope.content === x;
    };
})