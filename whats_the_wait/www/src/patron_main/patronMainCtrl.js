angular.module('restaurantApp')

.controller('patronMainCtrl', ['patronFactory', '$scope', '$http', '$timeout', '$location', function(patronAuthFactory, $scope, $http, $timeout, $location) {

console.log("patronMainCtrl")
 var vm = this


$http.get('http://localhost:3000/patrons/2')
    .success(function(data) {
      console.log(data)
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 0
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
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
        $location.path("/tableReady")
      }
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

    setInterval(function() {
      $http.get('http://localhost:3000/restaurants/' + $scope.waitInfo.restaurant_id + '/reservations/' + $scope.waitInfo.id + '/send_alert')
        .success(function(response)  {
          $location.path("/tableReady")
        })
        .error(function(response)  {
          console.log(response)
        })
    }, 3000)

    setInterval(function() {
      $http.get('http://localhost:3000/patrons/2')
      .success(function(data){
      $scope.waitInfo = data.waitInfo
      $scope.waitInfo.seconds = 0
      $scope.restaurant = data.restaurant
      $scope.parties_ahead = data.parties_ahead
      })
    }, 60000)


}])
