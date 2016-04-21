angular.module('hof2',['angular-meteor', 'ui.router', 'ui.bootstrap', 'ngImgCrop', 'angular-sortable-view', 'xeditable', 'textAngular', 'infinite-scroll', 'ngFileUpload']);

Meteor.GARecordPage = function (pageLocation) {
  ga('create', Meteor.settings.public.ga.account, 'auto');
  ga('send', 'pageview', {
    page: pageLocation || window.location.pathname
  });
};

function onReady() {
  Meteor.GARecordPage();
  angular.bootstrap(document, ['hof2'], {
    strictDi: false
  });

}

if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady);
else
  angular.element(document).ready(onReady);