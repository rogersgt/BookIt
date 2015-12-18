(function() {
  'use strict';
  angular
    .module('bookit')
    .controller('MainController', function(MainService, $state, $scope, $location, $stateParams) {
      var vm = this;

      // checks to see if the user is logged in. redirects to logout if false
      var checkUser = function() {
        MainService.check().success(function(user) {
          vm.currentUser = user;
        }).error(function() {
          $state.go('login');
        });
      };

      // automcatically check for login
         checkUser();
      vm.logout = function() {
        MainService.check().success(function(user) {
          MainService.endSession(user).success(function() {
            $state.go('login');
          });
        });
      };


      $scope.paywall = 1;                   //paywall
      $scope.setPaywall = function(item){
        console.log(item);
        $scope.paywall = item;
      };
      $scope.isPaywall = function(item){
        if(item === $scope.paywall){
          console.log('true');
          return true;
        }else{
          return false;
        }
      };

      // vm.gotoband = function(band) {
      //   var id = band.id;
      //   $state.go('main.show', {bandId:id});
      // };


      // populates the home page with user's bands
      var bands = function() {
        MainService.check().success(function(user) {
          var id = user.id;
          MainService.getBands(id).success(function(bands) {
            vm.bands = bands;
          });
        });
      };

      // automatically checks for bands on page load
      bands();


      vm.goBookShow = function(band) {        //redirect to book show page from sidepanel dropdown
        var id = band.id;
        $state.go('^.show',{bandId: id});
      };

      vm.goSettings = function() {
        MainService.check().success(function(user) {
          var id = id;
          $state.go('^.editaccount', {bandId: id});
        });
      };

      vm.dropdown = false;
     vm.showBands = function () {       //dropdown controller
      //  vm.isShowing = !vm.isShowing;
          bands();

          if(vm.dropdown === false) {
            vm.dropdown = true;
          } else if (vm.dropdown === true) {
            vm.dropdown = false;
          }



     };

    }); //end of main controller


}());
