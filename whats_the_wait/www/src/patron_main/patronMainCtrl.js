angular.module('restaurantApp')

.controller('patronMainCtrl', ['patronFactory', '$scope', '$http', '$timeout', function(patronAuthFactory, $scope, $http, $timeout) {

console.log("patronMainCtrl")
 var vm = this

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
}])
