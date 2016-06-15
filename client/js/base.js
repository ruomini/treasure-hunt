function MyController($scope, $http) {
    
    $scope.grid = [];
    $scope.color = '';
    $scope.message = '';
    $scope.done = false;
    
    $scope.postData = function() {
        $http.post('/api/v1/postData', {color: $scope.color}).then(function(response) {
            $scope.message = response.data.message;
        });
        $scope.color = '';
    };
    
    $scope.getData = function() {
        $http.get('/api/v1/getData').then(function(response) {
            $scope.grid = response.data;
            console.log($scope.grid);
            $scope.done = false;
        })
    };
    
    var treasures = 0;
    var orangutans = 0;

    $scope.clickTree = function(cell) {
        if($scope.done == false){
            $scope.grid[cell.row][cell.col].clicked=true;
        if(cell.hasTreasure){
            treasures++;
        }
        if(cell.hasOrangutan){
            orangutans++;
        }
        console.log("Treasures found: " + treasures + "/10");
            if(treasures == 10){
                $scope.done = true;
                alert("game over");
                treasures = 0;
                alert("orangutans destroyed: " + orangutans);
                orangutans = 0;
            }
        }
        
    };
    
    $scope.imageDisplay = function(cell) {
        var className = 'tree';
        if ($scope.grid[cell.row][cell.col].clicked) {
            if (cell.hasOrangutan) {
                className = 'orangutan';
            } else if (cell.hasTreasure) {
                className = 'treasure';
            } else {
                className = '';
            }
            
        }
                
        return className;
    }
}
