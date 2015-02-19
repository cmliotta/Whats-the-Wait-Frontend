angular.module('restaurantApp')

  .controller('restaurantMainCtrl', ['restaurantFactory', '$scope', '$http', '$timeout', function(restaurantFactory, $scope, $http, $timeout) {

  $scope.uiState = {party_size: "2"}

  var getReservations = function () {
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
  }
  getReservations()

    $scope.onTimeout = function(){
      for (var i = 0; i < $scope.reservations.length; i++) {
        if ($scope.reservations[i].minutes > 0) {
          $scope.reservations[i].minutes--
          $http.post('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations/countdown/' + $scope.reservations[i].id)
        }
      }
      mytimeout = $timeout($scope.onTimeout,60000);
    }
    var mytimeout = $timeout($scope.onTimeout,60000);

  $scope.initNewReservation = function() {
    $scope.newReservation = {cell_phone: "", party_size: 2, minutes: 10};
  }

  $scope.cancelAddReservation = function(){
    delete $scope.newReservation;
    $scope.error = ""
  }

  $scope.addReservation = function() {
    $http.post('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/reservations', $scope.newReservation)
      .success(function(data) {
        $scope.reservations.push(data);
        delete $scope.newReservation;
        $scope.error = ""
      })
      .error(function(data){
        $scope.error = "The phone number does not match any user"
      })
    }

    $scope.addTime = function() {
      // console.log(typeof($scope.uiState.party_size))
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

   $scope.initRemove = function(reservation) {
    $scope.reservationToRemove = angular.copy(reservation);
    }

    $scope.confirmReservationRemoval = function() {
      $http.delete('http://localhost:3000/restaurants/' + $scope.reservationToRemove.restaurant_id + '/reservations/' + $scope.reservationToRemove.id)
        .success(function()  {
          delete $scope.reservationToRemove
          var index = $scope.reservations.indexOf($scope.reservationToRemove);
          $scope.reservations.splice(index, 1);
          $scope.error = "";
          getReservations()
        })
    }

    $scope.cancelReservationRemoval = function() {
      delete $scope.reservationToRemove;
    }

  $scope.initTableReady = function(reservation) {
    $scope.tableReady = angular.copy(reservation);
  }

  $scope.confirmTableReady = function() {
    $http.post('http://localhost:3000/restaurants/' + $scope.tableReady.restaurant_id + '/reservations/' + $scope.tableReady.id + '/send_alert')
      .success(function(response)  {
        delete $scope.tableReady;

        getReservations()
    })
  }

  $scope.cancelTableReady = function() {
    delete $scope.tableReady
  }

  setInterval(function() {
    $http.get('http://localhost:3000/restaurants/' + $scope.restaurant.id + '/check_cancellations')
    .success(function(data){
      console.log(data.message)
      if (data.message) {
        $scope.error = data.message
      }
    })
  }, 10000)

}])
