angular.module('hof2',['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination', 'ngFileUpload', 'ngImgCrop', 'xeditable', 'angular-sortable-view']);

function onReady() {
  angular.bootstrap(document, ['hof2'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

