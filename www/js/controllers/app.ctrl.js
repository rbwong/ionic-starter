starter.controller('AppCtrl', function($scope, $state, $ionicModal, AuthenticationService) {
  $scope.isLoggedin = AuthenticationService.isLoggedin();

  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
      $scope.loginModal = modal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );
  //Be sure to cleanup the modal by removing it from the DOM
  $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });

  //If logged in
  $scope.$on('event:auth-loginConfirmed', function(event, data){
    $scope.isLoggedin = true;
  });

  //If logged out
  $scope.$on('event:auth-logout-complete', function() {
    $scope.isLoggedin = false;
  });
})
