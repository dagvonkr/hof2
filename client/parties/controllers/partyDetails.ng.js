'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', function ($scope, $stateParams, $meteor, $filter) {
  $scope.party = $meteor.object(Parties, $stateParams.partyId);
  console.log('$scope.party', $scope.party);
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties');
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  console.log('scopeeee', $scope);

  // getting the main image
  $scope.getMainImage = function(images) {
    if (images && images.length && images[0] && images[0].id) {
      let urlMainImage = $filter('filter')($scope.images, {_id: images[0].id})[0].url();
      console.log('url main img', url);
      return urlMainImage;
    }
  };

  // trying to get the rest of the images in the array
  $scope.getAllImages = function(images) {
    for (let i = 0; i < images.length; i++) {
      let urlAllImages = $filter('filter')($scope.images, {_id: images[i].id})[i].url();
      return urlAllImages;
    }
  };

}]);
