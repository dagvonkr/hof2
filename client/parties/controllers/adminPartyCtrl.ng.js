angular.module("hof2").controller("adminPartyCtrl", function ($scope, $meteor, $rootScope, $state, $stateParams, $filter, $modal) {

  // Dette er for å prø veå få til modal med data inni seg. 
  var partyId = $meteor.object(Parties, $stateParams.partyId);

  console.log('partyId', partyId);

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties');


  // add/remove new post (or party...) and add image

  $scope.newParty = {};  
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  $scope.newPartyImages = [];

  $scope.addNewParty = function () {
    if($scope.newParty.name) {

    $scope.newParty.owner = $rootScope.currentUser._id;

    // Link the images and the order to the new party
      if($scope.newPartyImages && $scope.newPartyImages.length > 0) {
        $scope.newParty.images = [];

        angular.forEach($scope.newPartyImages, function(image){
          $scope.newParty.images.push({id: image._id});
        });
      }
  
    // Saving the party to parties 
    $scope.parties.push($scope.newParty);

    // Reset the form
    $scope.newPartyImages = [];
    $scope.newParty = {};

    }
  }

  $scope.updateDescription = function($data, image) {
    image.update({$set: {'metadata.description': $data}});
  };

  $scope.remove = function (party) {
    $scope.parties.splice($scope.parties.indexOf(party), 1);
  };

  $scope.removeAll = function(){
    $scope.parties.remove();
  };

  console.log('$scope.parties', $scope.parties);

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users'); // hææ? skal denne være med?!?!?!?!?


  // Settings modal 

  $scope.openSettingsModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'client/parties/views/admin-party-modal.ng.html',
      controller: 'adminPartyDetailsCtrl',
      resolve: {
        'currentUser': function($meteor) {
          return $meteor.requireUser();
        }
      }
    })

    console.log('modalInstnce', modalInstance)

     modalInstance.result.then(function () {
      }, function () {
      });
  }




  // getting the main image
  $scope.getMainImage = function(images) {
     if (images && images.length && images[0] && images[0].id) {
      var urlMainImage = $filter('filter')($scope.images, {_id: images[0].id})[0].url();
      // console.log('url main img', url);
      return  urlMainImage 
    }
  };



  // Pagination

  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name: 1};
  $scope.orderProperty = '1';


  $scope.parties = $meteor.collection(function() {
    return Parties.find({}, {
      sort : $scope.getReactively('sort')
    });
  });


  $meteor.autorun($scope, function() {
    $meteor.subscribe('parties', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function(){
      $scope.partiesCount = $meteor.object(Counts ,'numberOfParties', false);
    });
  });


  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.$watch('orderProperty', function(){
    if ($scope.orderProperty)
      $scope.sort = {name: parseInt($scope.orderProperty)};
  });
});