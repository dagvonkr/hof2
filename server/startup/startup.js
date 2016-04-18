Meteor.startup(function () {
  var mkdirp =  Npm.require('mkdirp');
  var path =  Npm.require('path');
  var Fiber =  Npm.require('fibers');

  console.log('getTempDir resolved to: ', getTempDir());
  console.log('getUploadedDir resolved to: ', getUploadedDir());
  console.log('getPublishedDir resolved to: ', getPublishedDir());

  mkdirp(getTempDir());
  mkdirp(getUploadedDir());
  mkdirp(getPublishedDir(), function (err) {
    if(err) {
      console.log('mkdirp', err);
    }
    StaticServer.add('/images', getPublishedDir());
  });

  Meteor.constants = {
    tempDir: getTempDir()
    , uploadedDir: getUploadedDir()
    , publishedDir: getPublishedDir()
  };

  function isDeployed () {
    // Answers true if this is running on staging or production.
    return Meteor.absoluteUrl().match('/*houseoffam.com/');
  };

  function getTempDir () {
    if( isDeployed() ) {
      return path.resolve(process.cwd()+'/temp/');
    } else {
      return path.resolve(process.cwd()+'/../../../../../assets/dev/temp/');
    }
  };

  function getUploadedDir () {
    if( isDeployed() ) {
      return path.resolve(process.cwd()+'/uploaded/');
    } else {
      return path.resolve(process.cwd()+'/../../../../../assets/dev/uploaded/');
    }
  };

  function getPublishedDir () {
    if( isDeployed() ) {
      return path.resolve(process.cwd()+'/published/');
    } else {
      return path.resolve(process.cwd()+'/../../../../../assets/dev/published/');
    }
  };

  function onImageProcessed (anImageId) {
    Fiber(function () {
      Images.update(anImageId, { $set: { processedAt: new Date } });
    }).run();
  };

  function processImage (aFilename) {
    // Processes and saves filenameWithPath image file into a web friendly format/quality.
    console.log('About to process: ', aFilename);
    const sourcePath = getUploadedDir();
    const processedPath = getPublishedDir();
    gm(sourcePath+'/'+aFilename)
      .interlace('Line')
      .quality(100)
      .setFormat('jpg')
      .write(path.resolve(processedPath+'/'+aFilename), function (error) {
        if(!error) {
          onImageProcessed(aFilename);
          return console.log('Processed: ', aFilename);
        } else {
          return console.log('Problem processing: ', sourcePath+'/'+aFilename, error);
        }
      });
  };

  UploadServer.init({
    tmpDir: getTempDir(),
    uploadDir: getUploadedDir(),
    checkCreateDirectories: false,
    getDirectory: function(fileInfo, formData) {
      // console.log('getDirectory', formData);
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return '';
    },
    getFileName: function(fileInfo, formData) {
      return formData._id;
    },
    finished: function(fileInfo, formData) {
      // console.log('a finished upload with formData:', formData);
      Images.update(fileInfo.name, { $set: { size: fileInfo.size } });
      processImage(fileInfo.name);
    }
  });
});