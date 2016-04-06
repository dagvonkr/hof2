'use strict';
angular.module('hof2').controller('adminPartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', '$filter', '$rootScope', '$state', '$reactive', function ($scope, $stateParams, $meteor, $filter, $rootScope, $state, $reactive) {
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  $scope.$meteorSubscribe('parties');

    $scope.helpers({
      party() {
        return Parties.findOne($stateParams.partyId);
      }
      , images () {
          const party = Parties.findOne($stateParams.partyId);
          if(!party) {
            return [];
          }
          const theseImageIds = _.map(party.images, image => image.id);
          return Images.find({
                  _id: {
                    $in: theseImageIds
                  }
                }).fetch();
      }
    });

  $scope.save = function () {
    Parties.update($scope.party._id, {
      '$set': {
        name: $scope.party.name
        , description: $scope.party.description
        , editorcontent: $scope.party.editorcontent
        , public: $scope.party.public
      }
    });
  };

}]);
