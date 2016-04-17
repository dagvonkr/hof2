var path = Npm.require('path');
var fs = Npm.require('fs');

function processImage (aFilename) {
  // Processes and saves filenameWithPath image file into a web friendly format/quality.
  console.log('About to process: ', aFilename);
  const tempDir = path.resolve(process.cwd(), 'temp');
  const sourcePath = path.resolve(tempDir, 'uploads');
  const processedPath = path.resolve(tempDir, 'processed');
  gm(path.resolve(sourcePath, aFilename))
    .interlace('Line')
    .quality(100)
    .setFormat('jpg')
    .write(path.resolve(processedPath, aFilename), function (error) {
      if(!error) {
        return console.log('Processed: ', aFilename);
      } else {
        return console.log('Problem processing: ', path.resolve(sourcePath, aFilename), error);
      }
    });
};

Meteor.startup(function () {
  const tempDir = process.cwd()+'/temp';
  UploadServer.init({
    tmpDir: tempDir,
    uploadDir: tempDir + '/uploads/',
    checkCreateDirectories: true,
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