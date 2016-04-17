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

    }

  });
});