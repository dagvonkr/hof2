angular.module("hof2").controller("adminPartyDetailsCtrl", function ($scope, $stateParams, $meteor, $filter, $rootScope, $state) {

	$scope.party = $meteor.object(Parties, $stateParams.partyId);

	$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
	$scope.$meteorSubscribe('parties');

	$scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

	$scope.openSettingsModal = function() {
		$scope.newParty.owner = $rootScope.currentUser._id;
		$modalInstance.close();
	}	



	// console.log('$scope.images', $scope.images);

	// var displayImg = $scope.party.images.url();
	// console.log('displayImg', displayImg);


	// $scope.getAllImages = function(images) {
	// 	// console.log('images', images)
	// 	for (var i = 0; i < images.length; i++) {
	// 	  console.log('for --> images', images[i])
	// 	}  
	// };

});