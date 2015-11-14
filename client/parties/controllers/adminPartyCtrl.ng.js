angular.module("hof2").controller("adminPartyCtrl", function ($scope, $meteor, $rootScope, $state, $filter) {

  // add/remove new post (or party...) and add image

  $scope.newParty = {};  
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
  $scope.newPartyImages = [];
  console.log('newPartyImages', $scope.newPartyImages)

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

  $scope.getMainImage = function(images) {
    if (images && images.length && images[0] && images[0].id) {
      var url = $filter('filter')($scope.images, {_id: images[0].id})[0].url();
 
      return {
        'background-image': 'url("' + url + '")'
      }
    }
  };

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