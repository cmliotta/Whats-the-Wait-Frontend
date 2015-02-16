restaurantApp.factory('authInterceptor', ['$rootScope', '$q', '$window',
  function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.restaurant_token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.restaurant_token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
}]);

restaurantApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
