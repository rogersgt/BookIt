(function() {
  'use strict';
  angular
    .module('band')
    .controller('BandController', function($scope, BandService) {
        // var vm = this;

      $scope.addband = function (newBand) {
                BandService.createband(newBand);
                // setTimeout(clearForm,25);
                alert('band added to profile');

              };
    });


}());
