starter.controller('LoginCtrl', function($scope, $http, $state, AuthenticationService) {
  $scope.message = "";

  $scope.user = {
    username: null,
    password: null
  };

  $scope.login = function() {
    AuthenticationService.login($scope.user);
  };

  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    console.log('handling login required');
    $scope.loginModal.show();
  });

  $scope.$on('event:auth-loginConfirmed', function() {
     $scope.username = null;
     $scope.password = null;
     $scope.loginModal.hide();
  });

  $scope.$on('event:auth-login-failed', function(e, status) {
    var error = "Login failed.";
    if (status == 401) {
      error = "Invalid Username or Password.";
    }
    $scope.message = error;
  });

  $scope.$on('event:auth-logout-complete', function() {
    console.log("logout complete");
    $state.go('app.home', {}, {reload: true, inherit: false});
  });
})
