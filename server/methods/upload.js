function onFinish(files) {
  console.log('------------->  We have some files!', files);
};

Meteor.method('upload', function (aRequest) {
  console.log('------------->  Hitting received stuff!');

  let files = []; // Store files in an array and then pass them to request.
  let image = {};

  let busboy = new Busboy({ headers: aRequest.headers });
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
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
      onFinish(files);
  });
  // Pass request to busboy
  aRequest.pipe(busboy);

}, {
  url: 'upload'
  , getArgsFromRequest: function (request) {
    console.log('------------->  getArgsFromRequest Hitting upload!', request);
    return [request];
  }
  , httpMethod: 'POST'
});