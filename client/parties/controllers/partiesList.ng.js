angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('parties', { sort: {createdAt: -1}}).then(function (){
      $scope.$meteorSubscribe('mainImages').then(function () {
        $scope.addMoreItems();
      });
    });
    $scope.reset();
  };

  $scope.reset = function () {
    $scope.parties = [];
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
      if( !_($scope.parties).find(function (maybeAdded){ return each._id === maybeAdded._id })) {
        $scope.parties.push(each);
      }
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
