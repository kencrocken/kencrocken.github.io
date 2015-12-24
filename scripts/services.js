mySite.factory('TreehouseProfileService', function($http, $q, $resource) {

    var factory = {

        badges: $resource('https://teamtreehouse.com/kennethcrocken.json')
        
    };

    return factory;

});