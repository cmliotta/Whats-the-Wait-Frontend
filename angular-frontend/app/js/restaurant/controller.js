restaurantApp.controller('restaurantMainController', function($scope, $http, $timeout) {
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
    });

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
        $scope.reservations.splice(index, 1)
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
