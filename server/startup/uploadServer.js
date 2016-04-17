Meteor.startup(function () {
  const tempDir = process.cwd()+'/temp';
  UploadServer.init({
    tmpDir: tempDir,
    uploadDir: tempDir + '/uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return '';
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      console.log('just finished, fileInfo:', fileInfo);
      if (formData && formData._id != null) {
        console.log('We can haz big uploadz with formData');
        // Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }

  });
});