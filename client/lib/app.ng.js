angular.module('hof2',['angular-meteor', 'ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ngFileUpload', 'ngImgCrop', 'xeditable', 'angular-sortable-view', 'textAngular']);

function onReady() {
  angular.bootstrap(document, ['hof2'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

// elastic textarea
// $(document).ready(function(){			
// 	$('textarea').elastic();
// 	$('textarea').trigger('update');
// });	


$(document).ready(function() {
	$("#settings-button").draggable({
	    handle: ".settings-modal"
	}); 
});