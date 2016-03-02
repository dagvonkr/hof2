'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$reactive', '$stateParams', function ($scope, $reactive, $stateParams) {
  $reactive(this).attach($scope);

  this.subscribe('users');
  this.subscribe('parties', () => [], () => {
    $scope.party = Parties.findOne({
      _id: $stateParams.partyId
    });
    $scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
    $scope.name = $scope.party.name;
    $scope.description = $scope.party.description;
  });
  this.subscribe('images', () => [this.getReactively('party')], () => {
    const partyImages = $scope.getReactively('partyImages');
    const partyImageIds = _.map(partyImages, ({id}) => id);
    const images = Images.find().fetch();//_.filter(Images.find().fetch(), ({_id}) => _.contains(partyImageIds, _id));
    $scope.images = images;//_.map(images, image => image.url());
    $scope.mainImageUrl = $scope.images[0]; // FIXME: the first image is the main one, right?
  });
}]);
