'use strict';
// <<<<<<< HEAD
// angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$reactive', '$stateParams', function ($scope, $reactive, $stateParams) {
//   $reactive(this).attach($scope);

//   this.subscribe('users');
//   this.subscribe('parties', () => [], () => {
//     $scope.party = Parties.findOne({
//       _id: $stateParams.partyId
//     });
//     $scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
//     $scope.name = $scope.party.name;
//     $scope.description = $scope.party.description;
//     $scope.editorcontent = $scope.party.editorcontent;
//   });

//   this.subscribe('images', () => [this.getReactively('party')], () => {
//     const partyImages = $scope.getReactively('partyImages');

//     const partyImageIds = _.map(partyImages, ({id}) => id);
//     const images = _.filter(Images.find().fetch(), ({_id}) => _.contains(partyImageIds, _id));

//     $scope.images = _.map(images, image => image.url());
//     $scope.mainImageUrl = $scope.images[0]; // FIXME: the first image is the main one, right?
// =======
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$reactive', '$stateParams', '$meteor', function ($scope, $reactive, $stateParams, $meteor) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties').then(() => {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.partyImages = $scope.party.images;
  });
  $scope.$meteorSubscribe('images').then(() => {
    $scope.images = $meteor.collection(() => {
      return Images.find({
        _id: {
          $in: _.map($scope.party.images, image => image.id)
        }
      });
    }).subscribe('images');
    $scope.mainImageUrl = $scope.images[0];
// >>>>>>> 456cdaf85dc73d7ae69ee40d6426949eaccd7509
  });
  // this.subscribe('images', () => [this.getReactively('party')], () => {
  //   const partyImages = $scope.getReactively('partyImages');
  //   const partyImageIds = _.map(partyImages, ({id}) => id);
  //   const images = Images.find().fetch();//_.filter(Images.find().fetch(), ({_id}) => _.contains(partyImageIds, _id));
  //   $scope.images = images;//_.map(images, image => image.url());
  //   $scope.mainImageUrl = $scope.images[0]; // FIXME: the first image is the main one, right?
  // });



}]);
