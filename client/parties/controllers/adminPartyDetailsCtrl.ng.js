'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {

	$reactive(this).attach($scope);

	this.subscribe('users');
	this.subscribe('parties', () => [], () => {
		$scope.party = Parties.findOne({
		  _id: $stateParams.partyId
		});
		$scope.partyImages = _.isObject($scope.party) ? $scope.party.images : [];
		$scope.name = $scope.party.name;
		$scope.description = $scope.party.description;

		console.log('$scope.party', $scope.party);
	});



	this.subscribe('images', () => [this.getReactively('party')], () => {
    const partyImages = $scope.getReactively('partyImages');

    const partyImageIds = _.map(partyImages, ({id}) => id);
    const images = _.filter(Images.find().fetch(), ({_id}) => _.contains(partyImageIds, _id));

    $scope.images = _.map(images, image => image.url());
    $scope.mainImageUrl = $scope.images[0]; // FIXME: the first image is the main one, right?
  });

}]);