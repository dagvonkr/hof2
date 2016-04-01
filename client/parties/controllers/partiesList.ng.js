angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $meteor.subscribe('parties').then( function () {
    $scope.getNextPage()
  });
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name: 1};
  $scope.orderProperty = '1';
  $scope.parties = [];
  $scope.busy = false;

  $scope.getNextPage = function () {
    // Loads the next page of posts and adds them to the parties array.
    console.log('-----> getNextPage');
    if ($scope.busy) return;

    $scope.busy = true;
    const bunch = Parties.find({}, {
      limit: Meteor.settings.public.perPage
      , skip: parseInt(Meteor.settings.public.perPage) * parseInt(($scope.getReactively('page')))
      , sort: {'createdAt': 1}
    }).fetch();
    console.log(bunch);
    bunch.forEach( function (each) {
      $scope.parties.push(each);
    });
    $scope.busy = false;
    $scope.page += 1;
  };

  $scope.getMainImage = function (images) {
    try {
      return $filter('filter')($scope.images, {_id: images[0].id})[0].url();
    } catch (error) {
      //console.log(error);
    }
  };

  window.este = $scope;
  // $scope.updateDescription = function ($data, image) {   probalbly best to remove
  //   console.warn('PartiesListCtrl --> updateDescription');
  //   Image.update({$set: {'metadata.description': $data}});
  // };

}]);
