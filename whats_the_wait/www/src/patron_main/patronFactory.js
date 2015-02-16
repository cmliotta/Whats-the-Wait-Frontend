angular.module('restaurantApp')

.factory("patronFactory", ['$http', '$state', function($http, $state){

  return function hi (){
    console.log("patronFactory")
  }

}])
