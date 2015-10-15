starter.controller('LogoutCtrl', function($scope, AuthenticationService) {
    $scope.$on('$ionicView.enter', function() {
      AuthenticationService.logout();
    });
});
