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
        .otherwise({redirectTo: '/game'})

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

    var treasures = 0;
    var orangutans = 0;
    var highScore = 100;

    $scope.clickTree = function(cell) {
        if ($scope.done == false && !$scope.grid[cell.row][cell.col].clicked) {
            $scope.grid[cell.row][cell.col].clicked = true;
            if (cell.hasTreasure) {
                treasures++;
                console.log("Treasures found: " + treasures + "/10");
            }
            if (cell.hasOrangutan) {
                orangutans++;
            }

            if (treasures == 10) {
                $scope.done = true;
                alert("game over");
                treasures = 0;
                alert("orangutans destroyed: " + orangutans);
                console.log("orangutans destroyed: " + orangutans);
                var newScore = orangutans;
                if(newScore < highScore){
                    highScore = newScore;
                }
                alert("high score: " + highScore);
                console.log("high score: " + highScore);
                orangutans = 0;
            }
        }

    };

    $scope.imageDisplay = function(cell) {
        var className = 'tree';
        if ($scope.grid[cell.row][cell.col].clicked) {
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
