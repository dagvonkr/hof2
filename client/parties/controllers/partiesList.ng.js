angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('parties', { sort: {createdAt: -1}});
    $scope.$meteorSubscribe('mainImages');
    $scope.reset();
    $scope.addMoreItems();
  };

  $scope.reset = function () {
    $scope.parties = new Set;
    $scope.page = 0;
    $scope.isLoadingItems = false;
  };

  $scope.helpers({
    parties: function () {
      return $scope.parties;
    }
  });

  $scope.getMainImage = function (images) {
    try {
      return Images.find({_id: images[0].id}).fetch()[0].url();
    } catch (error) { }
  };

  $scope.addMoreItems = function () {

    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    const bunch = Parties.find({}, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
    }).fetch();

    bunch.forEach( function (each) {
      $scope.parties.push(each);
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
