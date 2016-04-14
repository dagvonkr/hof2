'use strict';
angular.module('hof2').controller('adminPartyCtrl', ['$scope', '$meteor', '$rootScope', '$state', '$stateParams', '$filter', '$modal', function ($scope, $meteor, $rootScope, $state, $stateParams, $filter, $modal) {
  $scope.initialize = function () {
    // $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.$meteorSubscribe('allParties', { sort: {createdAt: -1}});
    // $meteor.$meteorSubscribe('images');
    $scope.$meteorSubscribe('mainImages');
    $scope.parties = [];
    $scope.page = 1;
    $scope.isLoadingItems = false;
    $scope.resetNewParty();
    $scope.addMoreItems();
  };

  $scope.hasImagesOn = function (party) {
    // Answers true if the given party has any images.
    return !_.isEmpty(party.images);
  };

  $scope.resetNewParty = function () {
    $scope.newPartyImages = [];

    $scope.newParty = {
      createdAt: new Date ()
    };
  }

  $scope.helpers({
    parties: function () {
      return $scope.parties;
    }
  });

  $scope.addNewParty = function () {
    if ($scope.newParty.name && ($scope.newPartyImages && $scope.newPartyImages.length > 0)) {
      $scope.newParty.owner = $rootScope.currentUser._id;

      // Link the images and the order to the new party
        $scope.newParty.images = [];
        _.forEach($scope.newPartyImages, ({image: {_id}, dimensions, articleDescription}) => {
          $scope.newParty.images.push({
            id: _id,
            dimensions,
            articleDescription
          });
        });

      // Saving the party to parties
      $scope.newParty.createdAt = new Date;
      Parties.insert($scope.newParty);
      $scope.resetNewParty();
    }

    else {
      alert('Du må vente på at jeg har lastet opp bilde. Eller så har du ikke skrevet noe overskrift')
    }

  };

  $scope.updateDescription = function ($data, image) {
    Images.update(image.image._id, {$set: {'metadata.description': $data}});
  };

  $scope.remove = function (party) {
    Parties.remove(party._id);
  };

  // sas: This is dangerous, would permanently remove all posts without undo. Commenting it out
  // $scope.removeAll = function () {
  //   $scope.parties.remove();
  // };

  // Settings modal
  $scope.openSettingsModal = function (party) {
    $scope.currentParty = party;
    $modal.open({
      templateUrl: 'client/parties/views/admin-party-modal.ng.html',
      controller: 'adminPartyDetailsCtrl',
      resolve: {
        'currentUser': function ($meteor) {
          return $meteor.requireUser();
        }
      },
      scope: $scope
    });
  };

  // getting the main image
  $scope.getMainImageUrlOf = function (party) {
    // Answers the url of he first image of the given party, null otherwise.
    if (!_.isEmpty(party.images)) {
      var filtered = Images.find({_id: party.images[0].id}).fetch();
      var answer = null;
      // console.log('party.images about to filter and get the first URL', party);

      try {
        answer = filtered[0].url();
      } catch (anError) {
        // console.warn('Could not get url of the first image after filtering: ',filtered);
        return null;
      }

      return answer;
    } else {
      return null;
    }
  };

  $scope.addMoreItems = function () {
    // console.log('addMoreItems');
    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    const bunch = Parties.find({}, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
    }).fetch();
    // console.log('for page '+$scope.page.toString()+' now is adding', bunch);
    bunch.forEach( function (each) {
      $scope.parties.push(each);
     });
    // console.log('resulted in', $scope.parties);
    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
