'use strict';
angular.module('hof2').controller('adminPartyCtrl', ['$scope', '$meteor', '$rootScope', '$state', '$stateParams', '$filter', '$modal', function ($scope, $meteor, $rootScope, $state, $stateParams, $filter, $modal) {
  // Dette er for å prø veå få til modal med data inni seg.
  let partyId = $meteor.object(Parties, $stateParams.partyId);
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties');

  // add/remove new post (or party...) and add image
  $scope.newParty = {
    'createdAt': new Date()
  };
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
  console.log('$scope.images', $scope.images);

  $scope.hasImagesOn = function (party) {
    // Answers true if the given party has any images.
    return !_.isEmpty(party.images);
  };

  $scope.newPartyImages = [];

  $scope.addNewParty = function () {
    if ($scope.newParty.name) {
      $scope.newParty.owner = $rootScope.currentUser._id;
      console.log('$scope.newPartyImages', $scope.newPartyImages);

      // Link the images and the order to the new party
      if ($scope.newPartyImages && $scope.newPartyImages.length > 0) {
        $scope.newParty.images = [];
        _.forEach($scope.newPartyImages, ({image: {_id}, dimensions, articleDescription}) => {
          $scope.newParty.images.push({
            id: _id,
            dimensions,
            articleDescription
          });
        });
      }

      // Saving the party to parties
      $scope.parties.push($scope.newParty);
      // Reset the form
      $scope.newPartyImages = [];
      $scope.newParty = {};
    }
  };

  $scope.updateDescription = function ($data, image) {
    Images.update(image.image._id, {$set: {'metadata.description': $data}});
  };

  $scope.remove = function (party) {
    $scope.parties.splice($scope.parties.indexOf(party), 1);
  };

  $scope.removeAll = function () {
    $scope.parties.remove();
  };

  console.log('$scope.parties', $scope.parties);

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users'); // hææ? skal denne være med?!?!?!?!?

  // Settings modal
  $scope.openSettingsModal = function (party) {
    $scope.currentParty = party;
    let modalInstance = $modal.open({
      templateUrl: 'client/parties/views/admin-party-modal.ng.html',
      controller: 'adminPartyDetailsCtrl',
      resolve: {
        'currentUser': function ($meteor) {
          return $meteor.requireUser();
        }
      },
      scope: $scope
    });
    let resolve = (result) => console.log(result);
    let reject = (result) => console.log(result);

    modalInstance.result.then(resolve, reject);
  };

  // getting the main image
  $scope.getMainImageOf = function (party) {
    // Answers the url of he first image of the given party, null otherwise.
    if (!_.isEmpty(party.images)) {
      return $filter('filter')($scope.images, {_id: party.images[0].id})[0].url();
    } else {
      return null;
    }
  };

  // Pagination
  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name: 1};
  $scope.orderProperty = '1';

  $scope.parties = $meteor.collection(function () {
    return Parties.find({}, {
      sort: $scope.getReactively('sort')
    });
  });

  $meteor.autorun($scope, function () {
    $meteor.subscribe('parties', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function () {
      $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
    });
  });

  $scope.pageChanged = function (newPage) {
    $scope.page = newPage;
  };

  $scope.$watch('orderProperty', function () {
    if ($scope.orderProperty) {
      $scope.sort = {name: parseInt($scope.orderProperty)};
    }
  });
}]);
