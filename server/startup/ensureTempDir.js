Meteor.startup(function () {
  // Ensures the existence of the temp/ directory.
  const fs = Npm.require( 'fs' );

  const tempDir = process.cwd()+'/temp';
  if (!fs.existsSync(tempDir)){
    console.log('creating temp path: ', tempDir);
    fs.mkdirSync(tempDir);
  }
});
