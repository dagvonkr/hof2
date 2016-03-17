'use strict';
angular.module('hof2').controller('adminPartyCtrl', ['$scope', '$meteor', '$rootScope', '$state', '$stateParams', '$filter', '$modal', '$window', function ($scope, $meteor, $rootScope, $state, $stateParams, $filter, $modal, $window) {
  // Dette er for å prø veå få til modal med data inni seg.
  let partyId = $meteor.object(Parties, $stateParams.partyId);
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties');

  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
  console.log('$scope.images', $scope.images);

  $scope.hasImagesOn = function (party) {
    // Answers true if the given party has any images.
    return !!party && !_.isEmpty(party.images);
  };

  $scope.newPartyImages = [];


  $scope.newParty = {
    'createdAt' : new Date ()
  };
  // if (!$scope.newParty.createdAt) {
  //     $scope.newParty = {
  //       'createdAt' : new Date()
  //     }
  //   }


  $scope.addNewParty = function () {
    if ($scope.newParty.name && ($scope.newPartyImages && $scope.newPartyImages.length > 0)) {
      $scope.newParty.owner = $rootScope.currentUser._id;

      console.log('$scope.newPartyImages', $scope.newPartyImages);

      // Link the images and the order to the new party
      $scope.newParty.images = [];

      // {image: {_id}, dimensions, articleDescription}

      $scope.newPartyImages.forEach( (each) => {
          console.log(each);
          $scope.newParty.images.push({
            id: each._id
            , dimensions: each.dimensions
            , articleDescription: each.articleDescription
          });
      });

      // Saving the party to parties
      $scope.parties.push($scope.newParty);
      // Reset the form
      $scope.newPartyImages = [];
      $scope.newParty = {};
      $window.location.reload();

    } else {
      alert('Du må vente på at jeg har lastet opp bilde. Eller så har du ikke skrevet noe overskrift')
    }
  };

  $scope.updateDescription = function ($data, imageOrNull) {
    if(!!imageOrNull) {
      Images.update(imageOrNull.image._id, {$set: {'metadata.description': $data}});
    }
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
  $scope.getMainImageUrlOf = function (party) {
    // Answers the url of he first image of the given party, null otherwise.
    if (!_.isEmpty(party.images)) {
      var filtered = $filter('filter')($scope.images, {_id: party.images[0].id});
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
