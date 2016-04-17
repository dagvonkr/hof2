var path = Npm.require('path');
var fs = Npm.require('fs');
var Fiber = Npm.require('fibers');

function onReceived(files, shape) {
  console.log('------------->  We have some files!', files);
  const tempDir = path.resolve(process.cwd(), 'temp');
  console.log('temp dir is: ', tempDir);

  const fileName = Random.id();
  const filenameWithPath = path.join(tempDir, fileName);
  fs.writeFileSync( filenameWithPath, files[0].data );
  const imageRecord = {
    _id: fileName
    , mimeType: files[0].mimeType
    , filename: files[0].filename
    , encoding: files[0].encoding
    , size: files[0].data.length
    , shape: shape
    , uploadedAt: new Date
  };
  Fiber(function () {
    const answer = Images.insert(imageRecord);
    console.log('after insert: ', answer);
  }).run();
};

function onUploadReceived (aRequest, shape) {
  let files = []; // Store files in an array and then pass them to request.
  let image = {};

  let busboy = new Busboy({ headers: aRequest.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      image.mimeType = mimetype;
      image.encoding = encoding;
      image.filename = filename;

      // buffer the read chunks
      let buffers = [];

      file.on('data', function(data) {
          buffers.push(data);
      });
      file.on('end', function() {
          // concat the chunks
          image.data = Buffer.concat(buffers);
          // push the image object to the file array
          files.push(image);
      });
  });

  busboy.on('field', function(fieldname, value) {
      aRequest.body[fieldname] = value;
  });

  busboy.on('finish', function () {
      // Pass the file array together with the request
      aRequest.files = files;
      onReceived(files, shape);
  });
  // Pass request to busboy
  aRequest.pipe(busboy);
};

Meteor.method('squareUpload', function (aRequest) {
  console.log('------------->  squareUpload Hitting received stuff!');
  onUploadReceived(aRequest, 'square');
}, {
  url: 'squareUpload'
  , getArgsFromRequest: function (request) {
    console.log('------------->  getArgsFromRequest Hitting upload!');
    return [request];
  }
  , httpMethod: 'POST'
});

Meteor.method('portraitUpload', function (aRequest) {
  console.log('------------->  portraitUpload Hitting received stuff!');
  onUploadReceived(aRequest, 'portrait');
}, {
  url: 'portraitUpload'
  , getArgsFromRequest: function (request) {
    console.log('------------->  getArgsFromRequest Hitting upload!');
    return [request];
  }
  , httpMethod: 'POST'
});

Meteor.method('landscapeUpload', function (aRequest) {
  console.log('------------->  landscapeUpload Hitting received stuff!');
  onUploadReceived(aRequest, 'landscape');
}, {
  url: 'landscapeUpload'
  , getArgsFromRequest: function (request) {
    console.log('------------->  getArgsFromRequest Hitting upload!');
    return [request];
  }
  , httpMethod: 'POST'
});


