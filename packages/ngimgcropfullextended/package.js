Package.describe({
  name: 'dag:ngimgcropfullextended',
  version: '0.0.1',
  summary: 'ngimgcropfullextended package',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  // api.use('ecmascript');
  api.use('fourseven:scss');
  api.use('angular');

  api.addFiles([
    'lib/app.js',

    //Style
    'lib/css/ng-img-crop.scss',

    //Javascript
    'lib/js/canvas-to-blob.js',
    'lib/js/color-thief.min.js',
    'lib/js/exif.js',
    //'lib/js/init.js',
    'lib/js/ios-imagefile-megapixel.js',
    'lib/js/ng-img-crop.js',
    'lib/js/classes/crop-area-circle.js',
    'lib/js/classes/crop-area-rectangle.js',
    'lib/js/classes/crop-area-square.js',
    'lib/js/classes/crop-area.js',
    'lib/js/classes/crop-canvas.js',
    'lib/js/classes/crop-exif.js',
    'lib/js/classes/crop-host.js',
    'lib/js/classes/crop-pubsub.js'
  ], 'client');

  api.export('ngImgCrop');
  api.export('crop');
});
