// starter was made from the ionic-starter-app sideMenu
// to create a new app, at a command prompt type this: ionic start appname sideMenu

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// 'starter.services is' found in services.js

var starter = {
  controllers: angular.module('starter.controllers', []),
  services: angular.module('starter.services', [])
};


starter = angular.module('starter', ['ionic', 'ngMockE2E', 'LocalStorageModule', 'starter.controllers', 'starter.services'])

.run(function($rootScope, $ionicPlatform, $httpBackend, localStorageService) {

	$ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Mocking code used for simulation purposes (using ngMockE2E module)
  var customers = [{name: 'John Smith'}, {name: 'Tim Johnson'}];

  // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://customers').respond(function (method, url, data, headers) {
    var authToken = localStorageService.get('authorizationToken');
	  return authToken ? [200, customers] : [401];
  });

  $httpBackend.expectPOST('http://localhost:8000/rest-auth/login/').respond(function(method, url, data) {
    return  [200];
  });

  $httpBackend.expectPOST('http://localhost:8000/rest-auth/logout/').respond(function(method, url, data) {
    return [200];
  });

  // All other http requests will pass through
  $httpBackend.whenGET(/.*/).passThrough();
  $httpBackend.whenPOST(/.*/).passThrough();

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: "/home",
	    views: {
	      'menuContent' :{
	          controller:  "HomeCtrl",
	          templateUrl: "templates/home.html"
	      }
	  }
    })
    .state('app.customers', {
      url: "/customers",
      cache: false,
	    views: {
	      'menuContent' :{
	          controller:  "CustomerCtrl",
	          templateUrl: "templates/customers.html"
	      }
	  }
    })
    .state('app.register', {
      url: "/register",
      views: {
         'menuContent' :{
           controller: "RegisterCtrl",
           templateUrl: "templates/register.html"
         }
      }
    })
    .state('app.logout', {
      url: "/logout",
      views: {
    	   'menuContent' :{
    		   controller: "LogoutCtrl",
           templateUrl: "templates/home.html"
         }
      }
    });
  $urlRouterProvider.otherwise("/app/home");
});
