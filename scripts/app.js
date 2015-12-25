var mySite = angular.module('mySite', ['ui.router', 'ngResource','headroom','duScroll','angular-timeline']);

mySite.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('treehouseData', {
            url: '/data',
            templateUrl: '_includes/treehouse-data.html',
            controller: 'treehouseCtrl as treehouse',
            onEnter: function(){
                console.log("Entered Treehouse Data.");
            }
        })
        .state('treehouseData.badges', {
            url: '/badges',
            templateUrl: '_includes/badges.html',
            onEnter: function(){
                console.log("Entered Treehouse Data Badges.");
            }
        });

    $urlRouterProvider.otherwise('/');
  })
;