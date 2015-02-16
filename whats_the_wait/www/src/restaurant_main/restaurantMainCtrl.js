angular.module('restaurantApp')

  .controller('restaurantMainCtrl', ['restaurantFactory', '$scope', '$http', '$timeout', function(restaurantFactory, $scope, $http, $timeout) {

  console.log("restaurantMainCtrl")

  var vm = this

  $scope.showAddForm = function() {
    $scope.addForm = true;
  };

}])
