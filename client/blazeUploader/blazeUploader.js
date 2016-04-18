var tpl = Template.blazeUploader;

tpl.onCreated(function () {
});


tpl.onRendered(function () {
  var self = this;
  $(self.find('input')).on('fileSelected', function (event, fileItem) {
    // console.log('fileSelected on input works when observed from the blaze template', fileItem);
    Blaze.$rootScope.$emit('fileSelected', fileItem);
  });
});

tpl.events({
});
