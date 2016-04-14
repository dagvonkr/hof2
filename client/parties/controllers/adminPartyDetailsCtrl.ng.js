'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('images');
    $scope.$meteorSubscribe('allParties').then(function (){
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
        const party = Parties.findOne($stateParams.partyId);
        if(!party) {
          return [];
        }
        const theseImageIds = _.map(party.images, image => image.id);
        return Images.find({
                _id: {
                  $in: theseImageIds
                }
              },{sort: {uploadedAt: 1 }}).fetch();
    }
  });

  $scope.save = function () {
    Parties.update($scope.party._id, {
      '$set': {
        name: $scope.party.name
        , description: $scope.party.description
        , editorcontent: $scope.party.editorcontent
        , public: $scope.party.public
      }
    });
  };

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
      if( !_($scope.images).find(function (maybeAdded){ return each.url() === maybeAdded.url()})) {
        $scope.images.push(each);
      }
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
