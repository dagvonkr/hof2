'use strict';
angular.module('hof2').controller('PartyDetailsCtrl', ['$scope', '$stateParams', '$meteor', function ($scope, $stateParams, $meteor) {
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
                },{sort: {uploadedAt: 1 }}).fetch();
      }

    });

  $scope.$meteorSubscribe('images');
}]);
