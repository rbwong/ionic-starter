angular.module('starter.services', ['http-auth-interceptor'])
.factory('AuthenticationService', function($rootScope, $http, authService, localStorageService) {
  var service = {
    register: function(user) {
      var headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      };

      return $http({
          method: "POST",
          headers: headers,
          url: 'http://localhost:8000/rest-auth/registration/',
          data: user
      })
      .success(function (data, status, headers, config) {
      //$http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
      localStorageService.set('authorizationToken', data.key);

      // Need to inform the http-auth-interceptor that
        // the user has logged in successfully.  To do this, we pass in a function that
        // will configure the request headers with the authorization token so
        // previously failed requests(aka with status == 401) will be resent with the
        // authorization token placed in the header
        authService.loginConfirmed(data, function(config) {  // Step 2 & 3
          config.headers.Authorization = data;
          return config;
        });
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('event:auth-register-failed', status);
      });
    },
    login: function(user) {
      var headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      };

      return $http({
          method: "POST",
          headers: headers,
          url: 'http://localhost:8000/rest-auth/login/',
          data: user
      })
      .success(function (data, status, headers, config) {

    	//$http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
      localStorageService.set('authorizationToken', data.key);

    	// Need to inform the http-auth-interceptor that
        // the user has logged in successfully.  To do this, we pass in a function that
        // will configure the request headers with the authorization token so
        // previously failed requests(aka with status == 401) will be resent with the
        // authorization token placed in the header
        authService.loginConfirmed(data, function(config) {  // Step 2 & 3
          config.headers.Authorization = data;
          return config;
        });
      })
      .error(function (data, status, headers, config) {
        $rootScope.$broadcast('event:auth-login-failed', status);
      });
    },
    logout: function(user) {
      $http.post('http://localhost:8000/rest-auth/logout/', {}, { ignoreAuthModule: true })
      .finally(function(data) {
        localStorageService.remove('authorizationToken');
        delete $http.defaults.headers.common.Authorization;
        $rootScope.$broadcast('event:auth-logout-complete');
      });
    },
    loginCancelled: function() {
      authService.loginCancelled();
    },
    isLoggedin: function() {
      if(localStorageService.get('authorizationToken')) return true;
      else return false;
    }
  };
  return service;
})
