'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.initialize = function () {
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.$meteorSubscribe('parties').then(function () {
      $scope.enteredYoutubeLink = Parties.findOne($stateParams.partyId).youtubeLink;
    });
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
                }).fetch();
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
        const parts = $scope.enteredYoutubeLink.split('/');
        const watchPart = _(parts).find( function (each) {
          return each.match('watch');
        });
        const videoId = _(watchPart.split('v=')).last();
        $scope.party.youtubeLink = 'https://www.youtube.com/embed/'+videoId;
        return $scope.save();
      } catch (e) {
        return;
      }
    }

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

  $scope.initialize();
}]);
