if( !!Meteor.absoluteUrl().match('//houseoffam.com') ) {
  // Connects to Kadira only if on production.
  Kadira.connect(process.env.kadiraId, process.env.kadiraSecret);
}
