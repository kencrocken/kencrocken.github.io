var mySite = angular.module('mySite', ['ui.router', 'ngResource','headroom','duScroll','angular-timeline']);

mySite.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('treehouse', {
            url: '/treehouse',
            templateUrl: '/index.html',
            controller: 'treehouseCtrl as treehouse',
            onEnter: function(){
                console.log("Entered Treehouse.");
            }
        })
        .state('treehouse.badges', {
            url: '/treehouse/badges',
            templateUrl: '_includes/treehouse.html',
            onEnter: function(){
                console.log("Entered Treehouse.");
            }
        });

    $urlRouterProvider.otherwise('/');
  })
;