function MyController($scope, $http) {
    
    $scope.grid = [];
    $scope.color = '';
    $scope.message = '';
    
    $scope.postData = function() {
        $http.post('/api/v1/postData', {color: $scope.color}).then(function(response) {
            $scope.message = response.data.message;
        });
        $scope.color = '';
    };
    
    $scope.getData = function() {
        $http.get('/api/v1/getData').then(function(response) {
            $scope.grid = response.data;
        })
    };
    
    $scope.clickTree = function(cell) {
        $scope.grid[cell.row][cell.col].clicked=true;
    };
    
    
}
