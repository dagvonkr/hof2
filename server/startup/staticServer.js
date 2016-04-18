Meteor.startup(function () {
  var published = process.cwd() + '/processed/';
  console.log('Published dir:', published);
  StaticServer.add('/images', published);
});