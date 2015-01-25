mySite.controller('treehouseCtrl', function($scope, TreehouseProfileService){
    TreehouseProfileService.badges().then(function(badges){
        $scope.badges = badges;
        console.log('from controller:  ' + $scope.badges);
    }); 
});
    
