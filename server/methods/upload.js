var path = Npm.require('path');
var fs = Npm.require('fs');
var Fiber = Npm.require('fibers');

var multer  = Npm.require('multer');


function processImage (aFilename) {
  // Processes and saves filenameWithPath image file into a web friendly format/quality.
  const tempDir = path.resolve(process.cwd(), 'temp');
  const sourcePath = tempDir;
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

function onReceived(file, shape) {
  console.log('------------->  We have a file!', file);
  const tempDir = path.resolve(process.cwd(), 'temp');
  console.log('temp dir is: ', tempDir);

  const fileName = Random.id();
  const filenameWithPath = path.join(tempDir, fileName);
  fs.writeFileSync( filenameWithPath, file.data );
  processImage(fileName);
  const imageRecord = {
    _id: fileName
    , mimeType: file.mimeType
    , filename: file.filename
    , encoding: file.encoding
    , size: file.data.length
    , shape: shape
    , uploadedAt: new Date
  };
  Fiber(function () {
    const answer = Images.insert(imageRecord);
    console.log('after insert: ', answer);
  }).run();
};

// function onUploadReceived (aRequest, shape) {
//   console.log('onUploadReceived on multiparty', shape);
//   let files = []; // Store files in an array and then pass them to request.
//   let image = {};

//   let form = new multiparty.Form({
//     uploadDir: path.resolve(process.cwd(), 'temp')
//   });
//   let size = '';
//   let fileName = '';

//   try {

//     form.on('part', function (part) {
//       console.log('received part: ', part.filename);
//       fileName = part.filename;
//       size = part.byteCount;
//       // part.resume();
//     });const tempDir = path.resolve(process.cwd(), 'temp');

//     form.on('file', function (name, file) {
//       console.log(file.path);
//       console.log('filename: ' + fileName);
//       console.log('fileSize: '+ (size / 1024));
//       var tmpPath = file.path;
//       //

//     });

//     form.on('close', function () {
//         // Pass the file array together with the request
//         aRequest.files = files;
//         console.log('yay closed!');
//         // onReceived(files[0], shape);
//     });

//     form.parse(aRequest);

//   } catch (err) {
//     console.log('Did not go well: ', err);
//   }
// };


function onUploadReceived (aRequest, shape) {
  console.log('onUploadReceived', shape);

  const tempDir = path.resolve(process.cwd(), 'temp');
  // console.log('multer is:', multer);
  // var storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, tempDir)
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.fieldname + '-' + Date.now())
  //   }
  // });
  // var upload = multer({ storage: storage }).array('images');
  var upload = multer({ dest: tempDir }).any();

  try {
    console.log('onUploadReceived about to multer');
    upload(aRequest, null, function (err) {
      console.log('multer has done something? err:', err);
    });
  } catch (err) {
    console.log('Did not go well: ', err);
  }
};



// function onUploadReceived (aRequest, shape) {
//   console.log('onUploadReceived', shape);
//   let files = []; // Store files in an array and then pass them to request.
//   let image = {};

//   let busboy = new Busboy({ headers: aRequest.headers });
// try {
//   busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//       image.mimeType = mimetype;
//       image.encoding = encoding;
//       image.filename = filename;
//       console.log('onUploadReceived metadata', image);

//       const tempDir = path.resolve(process.cwd(), 'temp');
//       let fstream = fs.createWriteStream( path.resolve(tempDir, filename) );
//       // fstream.pipe(aRequest)
//       file.pipe(fstream);

//       // buffer the read chunks
//       // let buffers = [];

//       // file.on('data', function(data) {
//       //   console.log('onUploadReceived got data');
//       //   console.log('File [' + filename + '] got ' + data.length + ' bytes');
//       //   buffers.push(data);
//       // });

//       // file.resume();

//       file.on('end', function() {
//           console.log('onUploadReceived end');
//           // concat the chunks
//           // image.data = Buffer.concat(buffers);
//           // push the image object to the file array
//           files.push(image);
//           // console.log('onUploadReceived finished concatenating data');
//       });
//   });

//   busboy.on('field', function(fieldname, value) {
//       aRequest.body[fieldname] = value;
//   });

//   busboy.on('finish', function () {
//       // Pass the file array together with the request
//       aRequest.files = files;
//       onReceived(files[0], shape);
//   });
//   // Pass request to busboy
//   aRequest.pipe(busboy);
// } catch (err) {
//   console.log('Did not go well: ', err);
// }
// };

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


