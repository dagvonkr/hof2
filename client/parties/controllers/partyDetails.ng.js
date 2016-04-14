'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', function ($scope, $stateParams, $meteor) {
  $scope.initialize = function () {
    // $scope.$meteorSubscribe('postImages', partyId);  to-do
    $scope.$meteorSubscribe('images');
    $scope.$meteorSubscribe('parties').then(function (){
      $scope.addMoreItems();
    });
    $scope.reset();
  };

  $scope.reset = function () {
    $scope.images = [];
    $scope.page = 0;
    $scope.isLoadingItems = false;
  };

  $scope.helpers({
    party() {
      return Parties.findOne($stateParams.partyId);
    }
    , images () {
        return $scope.images;
    }
  });

  $scope.addMoreItems = function () {

    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    const party = Parties.findOne($stateParams.partyId);
    if(!party) {
      $scope.isLoadingItems = false;
      return [];
    }

    const theseImageIds = _.map(party.images, image => image.id);
    const query = { _id: { $in: theseImageIds } };
    const bunch = Images.find(query, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
      , sort: {uploadedAt: 1 }
    }).fetch();

    bunch.forEach( function (each) {
      $scope.images.push(each);
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
