var tpl = Template.blazeUploader;

tpl.onCreated(function () {
  // console.log('I am a blaze uploader that had IIIIIInstantiated');

});


tpl.onRendered(function () {
  // console.log('I am a blaze uploader that had RRRRRRendered');
  var self = this;
  $(self.find('input')).on('fileSelected', function (event, fileItem) {
    // console.log('fileSelected on input works when observed from the blaze template', fileItem);
    Blaze.$rootScope.$emit('fileSelected', fileItem);
  });
});

tpl.events({
  // 'fileSelected input': function (e, t) {
  //   console.log('fileSelected on input', t, e);
  // }
});
