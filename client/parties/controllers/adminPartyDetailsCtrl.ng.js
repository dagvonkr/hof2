'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties').then(() => {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
  });

  $reactive(this).attach($scope);

  this.subscribe('images', () => [this.getReactively('party')], () => {
    const partyImages = $scope.getReactively('partyImages');

    const partyImageIds = _.map(partyImages, ({id}) => id);
    const images = _.filter(Images.find().fetch(), ({_id}) => _.contains(partyImageIds, _id));

    $scope.images = _.map(images, image => image.url());
    $scope.mainImageUrl = $scope.images[0]; // FIXME: the first image is the main one, right?
  });

}]);
