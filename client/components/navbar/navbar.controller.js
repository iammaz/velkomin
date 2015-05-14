'use strict';

angular.module('VelkominApp')
  //.controller('NavbarCtrl', function ($scope, $location, Auth) {
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = false;
    $scope.isAdmin = false;
    //$scope.isLoggedIn = Auth.isLoggedIn;
    //$scope.isAdmin = Auth.isAdmin;
    //$scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      //Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
