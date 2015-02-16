angular.module('patronRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('landing', {
    url           : "/",
    templateUrl   : "patron_auth/landingPage.html",
    controller    : 'authCtrl'
  })

  .state('patronLogin', {
    url           : "/patron_login",
    templateUrl   : "patron_auth/loginPage.html",
    controller    : 'authCtrl'
  })

  .state('patronSignup', {
    url           : "/patron_signup",
    templateUrl   : "patron_auth/signupPage.html",
    controller    : 'authCtrl'
  })
});