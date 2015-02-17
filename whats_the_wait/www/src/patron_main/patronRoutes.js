angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('patronMain', {
    url           : "/patronMain",
    templateUrl   : "src/patron_main/patronMain.html",
    controller    : 'patronMainCtrl'
  })

  .state('tableReady', {
    url           : "/tableReady",
    templateUrl   : "src/patron_main/tableReady.html",
    controller    : 'patronMainCtrl'
  })

  .state('noWaitList', {
    url           : "/noWaitList",
    templateUrl   : "src/patron_main/noWaitList.html",
    controller    : 'patronMainCtrl'
  })

  $urlRouterProvider.otherwise('/')
});
