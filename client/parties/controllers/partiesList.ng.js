angular.module('hof2').controller('PartiesListCtrl', ['$scope', '$meteor', '$filter', function ($scope, $meteor, $filter) {
  $scope.initialize = function () {
    $scope.$meteorSubscribe('parties', { sort: {createdAt: -1}}).then(function (){
      $scope.$meteorSubscribe('mainImages').then(function () {
        $scope.addMoreItems();
        $scope.doneInitializing = true;
      });
    });
    $scope.reset();

    Parties.find().observeChanges({
      removed: function (id) {
        removePartyWithId(id);
      },
      changed: function (id, fields) {
        let found = Parties.findOne(id);
        if(found) {
          removePartyWithId(found._id);
          addParty(found);
        }
      },
      addedBefore: function (id, fields) {
        let found = Parties.findOne(id);
        if(found) {
          addParty(found);
        }
      }
    });
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

  $scope.getMainImage = function (party) {
    try {
      return  Meteor.absoluteUrl()+'images/'+party.images[0]._id;
    } catch (error) { }
  };

  function refresh () {
    if(!$scope.$$phase) {
      $scope.$digest();
    }
  };

  function addParty (aParty) {
    // Adds aParty to the infinite scroll model ignoring repetitions.
    if( !_($scope.parties).find(function (maybeAdded){ return aParty._id === maybeAdded._id})) {
      $scope.parties.push(aParty);
      refresh();
      }
  };

  function removePartyWithId (id) {
    // Removes athe party found with id from the infinite scroll model ignoring absences.
    let found = _($scope.parties).find(function (maybeRemoved){ return id === maybeRemoved._id});
    if (found) {
      $scope.parties.splice($scope.parties.indexOf(found), 1);
      refresh();
      }
  };

  $scope.addMoreItems = function () {

    if ($scope.isLoadingItems) return;

    $scope.isLoadingItems = true;

    const bunch = Parties.find({}, {
      limit: Meteor.settings.public.perPage
      , skip: (($scope.page - 1) * Meteor.settings.public.perPage)
    }).fetch();

    bunch.forEach( function (each) {
      addParty(each);
     });

    $scope.isLoadingItems = false;
    $scope.page += 1;
  };

  $scope.initialize();
}]);
