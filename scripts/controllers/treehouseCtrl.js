mySite.controller('treehouseCtrl', function($scope, TreehouseProfileService){

    var vm         = this;
    var title      = "My Treehouse";
    vm.loaded      = false;
    vm.myTreehouse = title.split('');
    vm.profile     = {}; 
    vm.badges      = [];
    vm.points      = [];
    vm.membershipDates;

    console.log(vm.myTreehouse);
    // Load Treehouse JSON
    var treehousePromise = TreehouseProfileService.badges.get();


    treehousePromise.$promise.then(function(response){
        console.log(response);

        //Get profile info
        vm.profile = {
            name     : response.name,
            gravatar : response.gravatar_hash,
            profile  : response.profile_url
        };

        //Populate badges array
        _.each(response.badges, function(badge){
            vm.badges.push({
                name   : badge['name'],
                icon   : badge['icon_url'],
                date   : badge['earned_date'],
                course : badge['courses']
            });
        });

        _.each(response.points, function(point, category){
            vm.points.push({
                points   : point,
                category : category
            });
        });

        console.log(vm.profile);
        console.log(vm.badges);
        console.log(vm.membershipDates = getMembershipDates(vm.badges));
        console.log(vm.points);
        vm.loaded = true;
    }, function(error){
        console.log(error);
    });

    vm.random = function(){
        console.log(Math.floor(Math.random() * vm.points.length-1));
        return Math.floor(Math.random() * vm.points.length-1);
    };

    function getMembershipDates(badgesArray){
        var joinDate = new Date(badgesArray[0].date),
        lastClass    = _.last(badgesArray),
        today        = new Date(),
        diffDays     = Math.round(Math.abs(joinDate - today)),
        oneDay       = 86400000;

        return {
            joinDate     : joinDate,
            lastClass    : new Date(lastClass.date),
            memberLength : diffDays/oneDay,
            today        : today
        }
    }

});
    
