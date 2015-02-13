'use strict';

var restaurantApp = angular.module('restaurantApp', ['ngRoute']);

restaurantApp.config(function($routeProvider) {
  $routeProvider
  .when('/home',
  {
    templateUrl: 'Views/Home/home.html',
    controller: 'HomeController'
  })
  .when('/restaurant/registration',
  {
    templateUrl: 'Views/Restaurant/registration.html',
    controller: 'RestaurantRegistrationController'
  })
  .when('/restaurant/signin',
  {
    templateUrl: 'Views/Restaurant/signin.html',
    controller: 'RestaurantSignInController'
  })
  .when('/restaurant/main',
  {
    templateUrl: 'Views/Restaurant/main.html',
    controller: 'RestaurantMainController'
  })
  .when('/patron/registration',
  {
    templateUrl: 'Views/Patron/registration.html',
    controller: 'PatronRegistrationController'
  })
  .when('/patron/signin',
  {
    templateUrl: 'Views/Patron/signin.html',
    controller: 'PatronSignInController'
  })
  .when('/patron/main',
  {
    templateUrl: 'Views/Patron/main.html',
    controller: 'PatronMainController'
  });
  .otherwise({redirectTo: '/home'});
});

restaurantApp.controller('HomeContoller', function() {});

restaurantApp.controller('RestaurantRegistrationController', function($scope, $http, $location) {
  $scope.addRestaurant = function(firstName, lastName, email, restaurantName, phoneNumber, password, city, state, zip) {

    var newRestaurant = { first_name: firstName, last_name: lastName, email: email, restaurant_name: restaurantName, phone: phone, password: password, city: city, state: state, zip: zip };

    $http.post('https://localhost:3000/', newRestaurant)
      .success(function() {
        $location.path('/restaurant/main');
      })
  };
});

restaurantApp.controller('RestaurantSignInController', function($scope, $http, $location) {
  $scope.validateRestaurant = function(email, password) {
    var restaurant = {email: email, password: password};

    $http.post('https://', restaurant)
      .success(function() {
        $location.path('/restaurant/main');
      })
  };
});
restaurantApp.controller('RestaurantMainController', function($scope, $http) {
  $scope.customers = [];
  $http.get('https://')
    .success(function(data) {
      for (var x in data) {
        customers.push(data[x]);
      }
    })
});
restaurantApp.controller('PatronRegistrationController', function($scope, $http, $location) {
  $scope.addUser = function(firstName, lastName, email, phoneNumber, password) {

    var newUser = {first_name: firstName, last_name: lastName, email: email, cell_phone: phoneNumber, password: password};

    $http.post('https://', newUser)
      .success(function() {
        $location.path('/Patron/main');
      })
  };
});
restaurantApp.controller('PatronSignInController', function($scope, $http, $location) {
  $scope.validateUser = function(email, password) {
    var user = {email: email, password: password};

    $http.post('https://', user)
      .success(function() {
        $location.path('/restaurant/main');
      })
  };
});
restaurantApp.controller('PatronMainController', function($scope, $http) {
  $scope.waitInfo = [];
  $http.get('https://')
    .success(function(data) {
      waitInfo.push(data[x]);
      }
  })
});
