'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('images');
    $scope.$meteorSubscribe('allParties').then(function (){
      if(!!$scope.currentParty) {
        $scope.enteredYoutubeLink = $scope.currentParty.youtubeLink;
      } else {
        $scope.enteredYoutubeLink = Parties.findOne($stateParams.partyId).youtubeLink;
      }
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
        var party = Parties.findOne($stateParams.partyId);
        if(!party) {
          return [];
        }
        var theseImageIds = _.map(party.images, function (image) { image.id });
        return Images.find({
                _id: {
                  $in: theseImageIds
                }
              },{sort: {uploadedAt: 1 }}).fetch();
    }
  });

  $scope.saveYoutubeLink = function () {
    // Saves the proper youtube link for an embed assuming it comes from a raw copy paste from the browser's URL.
    if($scope.enteredYoutubeLink.match('/embed/')) {
      return $scope.save();
    }

    if(_($scope.enteredYoutubeLink).isEmpty()) {
      return
    }

    if($scope.enteredYoutubeLink.match('/watch')) {
      try {
        var parts = $scope.enteredYoutubeLink.split('/');
        var watchPart = _(parts).find( function (each) {
          return each.match('watch');
        });
        var videoId = _(watchPart.split('v=')).last();
        $scope.party.youtubeLink = 'https://www.youtube.com/embed/'+videoId;
        return $scope.save();
      } catch (e) {
        return;
      }
    }

  };

  $scope.removeYoutubeLink = function () {
    $scope.party.youtubeLink = null;
    $scope.enteredYoutubeLink = null;
    $scope.save();
  };

  $scope.save = function () {
    Parties.update($scope.party._id, {
      '$set': {
        name: $scope.party.name
        , description: $scope.party.description
        , editorcontent: $scope.party.editorcontent
        , public: $scope.party.public
        , youtubeLink: $scope.party.youtubeLink
      }
    });
  };

  $scope.addMoreItems = function () {

    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    var party = Parties.findOne($stateParams.partyId);
    if(!party) {
      $scope.isLoadingItems = false;
      return [];
    }

    var theseImageIds = _.map(party.images, function (image) { image.id });
    var query = { _id: { $in: theseImageIds } };
    var bunch = Images.find(query, {
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
