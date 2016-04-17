'use strict';
angular.module('hof2').controller('adminPartyCtrl', ['$scope', '$meteor', '$rootScope', '$state', '$stateParams', '$filter', '$modal', 'FileUploader', function ($scope, $meteor, $rootScope, $state, $stateParams, $filter, $modal, FileUploader) {
  $scope.initialize = function () {
    $scope.squareUploader = new FileUploader({
      url: 'squareUpload'
    });
    $scope.portraitUploader = new FileUploader({
      url: 'portraitUpload'
    });
    $scope.landscapeUploader = new FileUploader({
      url: 'landscapeUpload'
    });

    $scope.$meteorSubscribe('allParties', { sort: {createdAt: -1}}).then(function () {
      $scope.$meteorSubscribe('mainImages').then(function () {
        // $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
        $scope.addMoreItems();
        });
      });
    $scope.reset();

    $scope.squareUploader.onAfterAddingFile = function (fileItem) {
      console.info('square uploader onAfterAddingFile', fileItem);
      $rootScope.$emit('squareUpload', [fileItem]);
    };

  };

  $scope.reset = function () {
    $scope.parties = [];
    $scope.page = 0;
    $scope.isLoadingItems = false;
    $scope.resetNewParty();
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

  $scope.updateSettings = function (aParty) {
    // Something in the settings modal have chaged and we make that change persistent.
    aParty.style = aParty.style || {};
    aParty.style.header = aParty.style.header || {};
    Parties.update(aParty._id, {
        '$set': {
          public: aParty.public
          , 'style.header.top': aParty.style.header.top
          , 'style.header.left': aParty.style.header.left
          , 'style.header.width': aParty.style.header.width
          , 'style.header.fontSize': aParty.style.header.fontSize
          , 'style.header.color': aParty.style.header.color
          , 'style.header.textShadow': aParty.style.header.textShadow
          , 'style.header.textAlign': aParty.style.header.textAlign
        }
      });
  };

  // getting the main image
  $scope.getMainImageUrlOf = function (party) {
    // Answers the url of he first image of the given party, null otherwise.
    if (!_.isEmpty(party.images)) {
      var filtered = Images.find({_id: party.images[0].id}).fetch();
      var answer = null;

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

    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    const bunch = Parties.find({}, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
    }).fetch();

    bunch.forEach( function (each) {
      if( !_($scope.parties).find(function (maybeAdded){ return each._id === maybeAdded._id})) {
        $scope.parties.push(each);
      }
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
