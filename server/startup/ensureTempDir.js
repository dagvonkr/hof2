Meteor.startup(function () {
  // Ensures the existence of the temp/ directory.
  const fs = Npm.require( 'fs' );
  const path = Npm.require( 'path' );

  // const tempDir = path.resolve(process.cwd(),'temp');
  // if (!fs.existsSync(tempDir)){
  //   console.log('creating temp path: ', tempDir);
  //   fs.mkdirSync(tempDir);
  // }

  const processedDir = path.resolve(process.cwd(),'processed');
  if (!fs.existsSync(processedDir)){
    console.log('creating processed path: ', processedDir);
    fs.mkdirSync(processedDir);
  }

});
