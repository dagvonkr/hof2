angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name: 1};
  $scope.orderProperty = '1';


  $scope.parties = $meteor.collection(function() {

    var partiesLen = $scope.parties;

    console.log('partiesLen', partiesLen);

    // for (var i = 0; i < partiesLen.length; i++ ) {
    //   if (i > 0) {
    //     alert('nøørd')
    //   }
    // }

    return Parties.find({}, {
      sort: $scope.getReactively('sort')
    });
  });


  $scope.getMainImage = function (images) {
    try {
      return $filter('filter')($scope.images, {_id: images[0].id})[0].url();
    } catch (error) {
      //console.log(error);
    }
  };

  $scope.updateDescription = function ($data, image) {
    console.warn('PartiesListCtrl --> updateDescription');
    image.update({$set: {'metadata.description': $data}});
  };

  $meteor.autorun($scope, function () {
    $meteor.subscribe('parties', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function(){
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
