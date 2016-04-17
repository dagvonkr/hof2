angular.module('hof2',['angular-meteor', 'ui.router', 'ui.bootstrap', 'ngImgCrop', 'angular-sortable-view', 'xeditable', 'textAngular', 'infinite-scroll', 'angularFileUpload', 'ngFileUpload', 'ngDropzone']);

function onReady() {
  angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

  angular.bootstrap(document, ['hof2'], {
    strictDi: true
  });

  initializeGA();

}

if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady);
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
