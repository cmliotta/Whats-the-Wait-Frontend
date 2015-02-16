angular.module('restaurantApp')

.factory("patronAuthFactory", ['$http', '$state', function($http, $state){

  return function test (){
    console.log("patronAuthFactory")
  }
}])
