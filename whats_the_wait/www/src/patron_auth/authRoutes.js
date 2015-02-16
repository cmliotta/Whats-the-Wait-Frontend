angular.module('restaurantApp')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('patronLogin', {
    url           : "/patronLogin",
    templateUrl   : "src/patron_auth/loginPage.html",
    controller    : 'patronAuthCtrl'
  })

  .state('patronSignup', {
    url           : "/patronSignup",
    templateUrl   : "src/patron_auth/signupPage.html",
    controller    : 'patronAuthCtrl'
  })

  $urlRouterProvider.otherwise('/')

});
