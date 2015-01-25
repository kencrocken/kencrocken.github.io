mySite.service('TreehouseProfileService', function($http, $q) {
    this.badges = function(name) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: 'http://teamtreehouse.com/kennethcrocken.json'
        }).
            then(function(response){
                var badges = _.map(response.data.badges, function(badge) {    
                        return {
                            name: badge['name'],
                            icon: badge['icon_url'],
                            date: badge['earned_date']
                        };
                    })
                d.resolve(badges);
                }, function(error) {
                        d.reject(error);
                    }
            );
        return d.promise;
    }
});