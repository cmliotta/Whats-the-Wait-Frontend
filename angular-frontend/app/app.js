// 'use strict';

var restaurantApp = angular.module('restaurantApp', ['ngRoute']);

restaurantApp.config(function($routeProvider) {
  $routeProvider
  .when('/',
  {
    templateUrl: 'views/home/home.html',
    controller: 'HomeController'
  })
  .when('/home',
  {
    templateUrl: 'views/home/home.html',
    controller: 'HomeController'
  })
  .when('/restaurant_registration',
  {
    templateUrl: 'views/restaurant/registration.html',
    controller: 'RestaurantRegistrationController'
  })
  .when('/restaurant_signin',
  {
    templateUrl: 'views/restaurant/signin.html',
    controller: 'RestaurantSignInController'
  })
  .when('/restaurant_main',
  {
    templateUrl: 'views/restaurant/main.html',
    controller: 'RestaurantMainController'
  })
  .when('/patron_registration',
  {
    templateUrl: 'views/patron/registration.html',
    controller: 'PatronRegistrationController'
  })
  .when('/patron_signin',
  {
    templateUrl: 'views/patron/signin.html',
    controller: 'PatronSignInController'
  })
  .when('/patron_main',
  {
    templateUrl: 'views/patron/main.html',
    controller: 'PatronMainController'
  })
  .otherwise({redirectTo: '/home'});
});

restaurantApp.controller('HomeController', function() {});

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
        $location.path('/restaurant_main');
      })
  };
});
restaurantApp.controller('RestaurantMainController', function($scope, $http) {
  $scope.reservations = [];
  $http.get('http://localhost:3000/restaurants/1/reservations')
    .success(function(data) {
      for (var x in data) {
        $scope.reservations.push(data[x]);
      }
    })

  $scope.addTime = function() {
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/restaurants/1/reservations/add_time'
    })
      .success(function()  {
        $location.path('/restaurant_main')
      })
  }

  $scope.subtractTime = function() {
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/restaurants/1/reservations/subtract_time'
    })
      .success(function()  {
        $location.path('/restaurant_main')
      })
  }

  $scope.seated = function(reservation) {
    console.log(reservation);
    $http.delete('http://localhost:3000/restaurants/1/reservations/seated', reservation)
      .success(function()  {
        $location.path('/restaurant_main')
      })
  }

  $scope.canceled = function(reservation) {
    console.log(reservation);
    $http.delete('http://localhost:3000/restaurants/1/reservations/cancel', reservation)
      .success(function()  {
        $location.path('/restaurant_main')
      })
  }

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
    })
});


