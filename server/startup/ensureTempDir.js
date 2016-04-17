Meteor.startup(function () {
  // Ensures the existence of the temp/ directory.
  const fs = Npm.require( 'fs' );

  const tempDir = process.cwd()+'/temp';
  if (!fs.existsSync(tempDir)){
    console.log('creating temp path: ', tempDir);
    fs.mkdirSync(tempDir);
  }

  const processedDir = process.cwd()+'/temp/processed';
  if (!fs.existsSync(processedDir)){
    console.log('creating processed path: ', processedDir);
    fs.mkdirSync(processedDir);
  }

});
