angular.module("hof2").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
});

angular.module("hof2").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider

    .state('parties', {
      url: '/parties',
      templateUrl: 'client/parties/views/parties-list.ng.html',
      controller: 'PartiesListCtrl'
    })
    .state('partyDetails', {
      url: '/parties/:partyId',
      templateUrl: 'client/parties/views/party-details.ng.html',
      controller: 'PartyDetailsCtrl'
    })

    .state('admin', {
      url: '/admin',
      templateUrl: 'client/parties/views/admin.ng.html',
      controller: 'adminPartyCtrl',
      resolve: {
        'currentUser': function($meteor) {
          return $meteor.requireUser();
        }
      }
    })

    .state('admin-details', {
      url: '/admin/:partyId',
      templateUrl: 'client/parties/views/admin-party-details.ng.html',
      controller: 'adminPartyDetailsCtrl',
      resolve: {
        'currentUser': function($meteor) {
          return $meteor.requireUser();
        }
      }
    })


    // all the auth views:

    .state('login', {
      url: '/login', 
      templateUrl: 'client/users/views/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc' // hva i all verden er rc ????
    })

    .state('register', {
      url: '/register',
      templateUrl: 'client/users/views/register.ng.html',
      controller: 'RegisterCtrl',
      controllerAs: 'rc'
    })

    .state('resetpw', {
      url: '/resetpw',
      templateUrl: 'client/users/views/reset-password.html',
      controller: 'ResetCtrl',
      controllerAs: 'rpc'
    })

    .state('logout', {
      url: '/logout',
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            $state.go('parties');
          }, function(err) {
            console.log('logout error :(', err)
          });
        }
      }
    });



  $urlRouterProvider.otherwise("/parties");
});