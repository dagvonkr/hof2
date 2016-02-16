'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$reactive', '$stateParams', '$meteor', '$filter', function ($scope, $reactive, $stateParams, $meteor, $filter) {
  $reactive(this).attach($scope);

  this.subscribe('users');
  this.subscribe('parties');
  this.subscribe('images');

  const party = Parties.findOne({
    _id: $stateParams.partyId
  });
  const images = Images.find({
    _id: {
      $in: _.map(party.images, image => image.id)
    }
  });
  const imageDescriptionList = images.fetch().map(image => ({
    url: image.url(),
    ..._.find(party.images, ({id}) => id === image._id).dimensions
  }));

  $scope.name = party.name;
  $scope.description = party.description;
  $scope.images = imageDescriptionList;
  $scope.mainImageUrl = imageDescriptionList[0]; // FIXME: the first image is the main one, right?
}]);
