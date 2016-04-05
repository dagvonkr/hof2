'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');


  $scope.$meteorSubscribe('parties').then(() => {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
    console.log('$scope.partyImages details-view', $scope.partyImages)

      });

  $scope.$meteorSubscribe('images').then(() => {
    const theseImageIds = _.map($scope.party.images, image => image.id);
    $scope.images = Images.find({
        _id: {
          $in: theseImageIds
        }
      }).fetch();
  });

}]);
