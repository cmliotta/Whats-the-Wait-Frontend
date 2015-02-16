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
  // .otherwise({redirectTo: '/home'});
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

restaurantApp.controller('RestaurantMainController', function($scope, $http, $timeout) {
  $scope.restaurant;
  $scope.reservations = [];
  $http.get('http://localhost:3000/restaurants/1/reservations')
    .success(function(data) {
      console.log(data)
      $scope.restaurant = data.restaurant;
      for (var x in data.reservations) {
        $scope.reservations.push(data.reservations[x]);
      }
      for (var i = 0; i < $scope.reservations.length; i++) {
        $scope.reservations[i].seconds = 59;
        // console.log($scope.reservations[i].seconds)
      }
      // $scope.onTimeout = function(){
      //   for (var i = 0; i < $scope.reservations.length; i++) {
      //     if ($scope.reservations[i].seconds > 0) {
      //       $scope.reservations[i].seconds --;
      //       if ($scope.reservations[i].seconds < 10) {
      //         $scope.reservations[i].seconds = '0' + $scope.reservations[i].seconds;
      //       }
      //       // mytimeout = $timeout($scope.onTimeout,1000);
      //     } else if($scope.reservations[i].seconds == 0 && $scope.reservations[i].minutes - 1 > 0) {
      //       $scope.reservations[i].seconds = 59
      //       $scope.reservations[i].minutes--
      //     } else{
      //       // alert("Table Ready")
      //     }
      //   }
      //   mytimeout = $timeout($scope.onTimeout,1000);
      // }
      // var mytimeout = $timeout($scope.onTimeout,1000);
  })


  $scope.showAddForm = function() {
    $scope.addForm = true;
  };

  $scope.addReservation = function(cellPhone, numberOfPeople, minutes) {
    var newReservation = {cell_phone: cellPhone, party_size: numberOfPeople, minutes: minutes};

    $http.post('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations', newReservation)
      .success(function(data) {
        $scope.reservations.push(data);
        $scope.addForm = false;
        angular.element(document.querySelector('#error'))[0].innerHTML = ""
      })
      .error(function(data){
        angular.element(document.querySelector('#error'))[0].innerHTML = "The phone number does not match any user"
      })
  }

  $scope.onTimeout = function(){
    for (var i = 0; i < $scope.reservations.length; i++) {
      if ($scope.reservations[i].minutes > 0) {
        $scope.reservations[i].minutes --
        $http.post('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/countdown/' + $scope.reservations[i].id)
      }
    }
    mytimeout = $timeout($scope.onTimeout,60000);
  }
  var mytimeout = $timeout($scope.onTimeout,60000);

  $scope.cancelReservation = function(){
    $scope.addForm = false;
  }

  $scope.addTime = function() {
    console.log($scope.party_size)
    $http({
      method: 'POST',
      url: 'http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/add_time',
      data: {party_size: $scope.party_size}
    })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.party_size == 2) {
            if($scope.reservations[r].party_size <= 2) {
              $scope.reservations[r].minutes += 5;
            }
          }
          else if($scope.party_size == 4) {
            if($scope.reservations[r].party_size >= 3) {
              $scope.reservations[r].minutes += 5;
            }
          }
        }
      })
  }

  $scope.subtractTime = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/subtract_time',
      data: {party_size: $scope.party_size}
    })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.party_size == 2) {
            if($scope.reservations[r].party_size <= 2 && $scope.reservations[r].minutes > 4) {
              $scope.reservations[r].minutes -= 5;
            }
          }
          else if($scope.party_size == 4) {
            if($scope.reservations[r].party_size >= 3 && $scope.reservations[r].minutes > 4) {
              $scope.reservations[r].minutes -= 5;
            }
          }
        }
      })
  }

  $scope.seated = function(reservation) {
    $http.get('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id)
      .success(function()  {
        console.log(reservation)
        var index = $scope.reservations.indexOf(reservation)
      })
  }

  $scope.canceled = function(reservation) {
    $http.delete('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id)
      .success(function()  {
        console.log(reservation);
        var index = $scope.reservations.indexOf(reservation)
        $scope.reservations.splice(index, 1)
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


restaurantApp.controller('PatronMainController', function($scope, $interval, $http, $timeout) {
    $http.get('http://localhost:3000/patrons/1')
    .success(function(data) {
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 00
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
      // console.log($scope.parties_ahead)
    })
    .error(function(data){
      console.log(data)
    })
    $scope.onTimeout = function(){
      if ($scope.waitInfo.seconds > 0) {
        $scope.waitInfo.seconds--;
        if ($scope.waitInfo.seconds < 10) {
          $scope.waitInfo.seconds = '0' + $scope.waitInfo.seconds;
        }
      } else if($scope.waitInfo.seconds == 0 && $scope.waitInfo.minutes > 0) {
        $scope.waitInfo.seconds = 59
        $scope.waitInfo.minutes--
      } else {
        angular.element(document.querySelector('#container'))[0].innerHTML = "You're Table is ready!"
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
})

