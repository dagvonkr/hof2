angular.module('hof2',['angular-meteor', 'ui.router', 'ui.bootstrap', 'ngFileUpload', 'ngImgCrop', 'xeditable', 'angular-sortable-view', 'textAngular']);

function onReady() {
  angular.bootstrap(document, ['hof2'], {
    strictDi: true
  });

  initializeGA();
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);


function initializeGA () {
  GARecordPage = function (pageLocation) {
		ga('create', Meteor.settings.public.ga.account, 'auto');
		ga('send', 'pageview', {
		page: pageLocation
  });
  }
}

// elastic textarea
// $(document).ready(function(){
// 	$('textarea').elastic();
// 	$('textarea').trigger('update');
// });


// $(document).ready(function() {
// 	$("#settings-button").draggable({
// 	    handle: ".settings-modal"
// 	});
// });