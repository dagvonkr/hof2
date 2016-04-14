angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $scope.$meteorSubscribe('parties');
  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('mainImages');

  $scope.helpers({
    parties: function () {
      return Parties.find();
    }
  });

  $scope.getMainImage = function (images) {
    try {
      return $filter('filter')($scope.images, {_id: images[0].id})[0].url();
    } catch (error) {
    }
  };

}]);
