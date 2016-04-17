var tpl = Template.blazeUploader;

tpl.onCreated(function () {
  // console.log('I am a blaze uploader that had IIIIIInstantiated');
});


tpl.onRendered(function () {
  // console.log('I am a blaze uploader that had RRRRRRendered');
});

tpl.events({
  'click .progress-label': function (e, t) {
    console.log('changed progress-label in', t, e);
  }
});
