'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$reactive', '$stateParams', '$meteor', function ($scope, $reactive, $stateParams, $meteor) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties').then(() => {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.partyImages = $scope.party.images;
  });
  $scope.$meteorSubscribe('images').then(() => {
    $scope.images = $meteor.collection(() => {
      return Images.find({
        _id: {
          $in: _.map($scope.party.images, image => image.id)
        }
      });
    }).subscribe('images');
    $scope.mainImageUrl = $scope.images[0];
  });
}]);
