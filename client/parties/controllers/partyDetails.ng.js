'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', function ($scope, $stateParams, $meteor) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('party',$stateParams.partyId).then(function (){
      $scope.$meteorSubscribe('images',$stateParams.partyId).then(function () {
        $scope.addMoreItems();
      });
    });

    $scope.reset();
  };

  $scope.reset = function () {
    $scope.images = [];
    $scope.page = 0;
    $scope.isLoadingItems = false;
  };

  function hasVideo () {
    // Answers true if this post has a youtube link.
    var party = Parties.findOne($stateParams.partyId);
    return !!party && !!party.youtubeLink;
  };

  $scope.helpers({
    party() {
      return Parties.findOne($stateParams.partyId);
    }
    , images () {
        return $scope.images;
    }
  });

  $scope.getImageUrlOf = function (anImage) {
    return Meteor.absoluteUrl()+'images/'+anImage._id;
  };

  $scope.addMoreItems = function () {
    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    var party = Parties.findOne();
    if(!party) {
      $scope.isLoadingItems = false;
      return [];
    }

    var theseImageIds = _.map(party.images, function (image) { return image._id });
    var query = { _id: { $in: theseImageIds } };
    var bunch = Images.find(query, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
      , sort: {uploadedAt: 1 }
    }).fetch();

    bunch.forEach( function (each) {
      if( !_($scope.images).find(function (maybeAdded){ return each._id === maybeAdded._id})) {
        $scope.images.push(each);
      }
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;

  };

  $scope.initialize();
}]);
