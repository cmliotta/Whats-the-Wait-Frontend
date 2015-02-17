angular.module('restaurantApp')

  .controller('restaurantMainCtrl', ['restaurantFactory', '$scope', '$http', '$timeout', function(restaurantFactory, $scope, $http, $timeout) {

  console.log("restaurantMainCtrl")

  var vm = this
  $scope.uiState = {party_size: "2"}

  $http.get('http://localhost:3000/restaurants/1/reservations')
    .success(function(data) {
      $scope.reservations = [];
      $scope.restaurant = data.restaurant;

      for (var x in data.reservations) {
        $scope.reservations.push(data.reservations[x]);
      }

      for (var i = 0; i < $scope.reservations.length; i++) {
        $scope.reservations[i].seconds = 59;
      }
    });

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

  $scope.showAddForm = function() {
    $scope.addForm = true;
  };

  $scope.cancelAddReservation = function(){
    $scope.addForm = false;
    angular.element(document.querySelector('#error'))[0].innerHTML = ""
  }

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

    $scope.addTime = function() {
      console.log(typeof($scope.uiState.party_size))
      $http({
        method: 'POST',
        url: 'http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/add_time',
        data: {party_size: $scope.uiState.party_size}
      })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.uiState.party_size == 2) {
            if($scope.reservations[r].party_size <= 2) {
              $scope.reservations[r].minutes += 5;
            }
          }
          else if($scope.uiState.party_size == 4) {
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
        data: {party_size: $scope.uiState.party_size}
      })
      .success(function()  {
        for(var r in $scope.reservations) {
          if($scope.uiState.party_size == 2) {
            if($scope.reservations[r].party_size <= 2 && $scope.reservations[r].minutes > 4) {
              $scope.reservations[r].minutes -= 5;
            }
          }
          else if($scope.uiState.party_size == 4) {
            if($scope.reservations[r].party_size >= 3 && $scope.reservations[r].minutes > 4) {
              $scope.reservations[r].minutes -= 5;
            }
          }
        }
      })
    }

   $scope.remove = function(reservation) {
      $http.delete('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id)
        .success(function()  {
          console.log(reservation);
          var index = $scope.reservations.indexOf(reservation)
          $scope.reservations.splice(index, 1)
      })
    }

  $scope.seated = function(reservation) {
    $http.post('http://localhost:3000/restaurants/' + reservation.restaurant_id + '/reservations/' + reservation.id + '/send_alert')
      .success(function(response)  {
        console.log(response)
    })
  }
}])
