Meteor.startup(function () {
  const tempDir = process.cwd()+'/temp';
  UploadServer.init({
    tmpDir: tempDir,
    uploadDir: tempDir + '/uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      console.log('getDirectory', formData);
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return '';
    },
    getFileName: function(fileInfo, formData) {
      console.log('getFileName', formData);
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      console.log('a finished upload with formData:', formData);
      if (formData && formData._id != null) {
        console.log('We can haz big uploadz with formData');
        // Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }

  });
});