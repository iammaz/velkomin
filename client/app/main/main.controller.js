'use strict';

angular.module('VelkominApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.happenings = [];

    $http.get('/api/happenings').success(function(data){
      console.log('happenings: ', data)
      $scope.happenings = data;
    });

/*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    */
  });
