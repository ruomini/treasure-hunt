'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
    console.log('test');

    $routeProvider.when('/game', {
            templateUrl: 'templates/game.html',
            controller: 'MyController'
        })
        .otherwise({
            redirectTo: '/game'
        })

}])

.controller('MyController', function($scope, $http) {

    $scope.grid = [];
    $scope.color = '';
    $scope.message = '';
    $scope.done = false;

    $scope.postData = function() {
        $http.post('/api/v1/postData', {
            color: $scope.color
        }).then(function(response) {
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

    // initializes counts
    $scope.treasures = 0;
    $scope.totalTreasures = 0;
    $scope.orangutans = 0;
    $scope.highScore = 100;

    $scope.clickTree = function(cell) {
        // uncovers value underneath when clicked
        if ($scope.done == false && !$scope.grid[cell.row][cell.col].clicked) {
            $scope.grid[cell.row][cell.col].clicked = true;
            if (cell.hasTreasure) {
                $scope.treasures++;
                console.log("Treasures found: " + $scope.treasures + "/10");
            }
            if (cell.hasOrangutan) {
                $scope.orangutans++;
            }
            //displays end game stats
            if ($scope.treasures == 10) {
                $scope.done = true;
                alert("you found ten treasures!");
                alert("game over");
                $scope.treasures = 0;
                $scope.totalTreasures += 10;
                alert("orangutans destroyed: " + $scope.orangutans);
                console.log("orangutans destroyed: " + $scope.orangutans);
                var newScore = $scope.orangutans;
                if (newScore < $scope.highScore) {
                    $scope.highScore = newScore;
                }
                alert("high score: " + $scope.highScore);
                console.log("high score: " + $scope.highScore);
                $scope.orangutans = 0;
                alert("you have collected " + $scope.totalTreasures + " treasures in total");
                console.log("you have collected " + $scope.totalTreasures + " treasures in total");
            }
        }

    };
    //displays tree image
    $scope.imageDisplay = function(cell) {
        var className = 'tree';
        if ($scope.grid[cell.row][cell.col].clicked) {
            //displays orangutan/treasure/blankspace when clicked
            if (cell.hasOrangutan) {
                className = 'orangutan';
            }
            else if (cell.hasTreasure) {
                className = 'treasure';
            }
            else {
                className = '';
            }

        }

        return className;
    };
});
