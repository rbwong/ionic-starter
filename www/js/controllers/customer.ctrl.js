starter.controller('CustomerCtrl', function($scope, $state, $http) {
    $scope.customers = [];

    $http.get('https://customers')
        .success(function (data, status, headers, config) {
            $scope.customers = data;
        })
        .error(function (data, status, headers, config) {
            console.log("Error occurred.  Status:" + status);
        });
})
