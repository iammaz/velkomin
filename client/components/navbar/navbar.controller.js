'use strict';

angular.module('VelkominApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Sko',
        'link': '/Sko'
    }];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
