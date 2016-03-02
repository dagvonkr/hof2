'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', function ($scope, $stateParams, $meteor) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties').then(() => {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
  });
  $scope.$meteorSubscribe('images').then(() => {
    $scope.images = $meteor.collection(() => {
      return Images.find({
        _id: {
          $in: _.map($scope.party.images, image => image.id)
        }
      });
    }).subscribe('images');
  });
}]);
