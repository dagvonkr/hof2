if (Meteor.isServer) {

  var compressImage = function (fileObj, readStream, writeStream) {
    // console.log('fileObj --->', fileObj, 'readStream --->',  readStream, 'writeStream --->', writeStream);
    // gm(readStream, fileObj.name()).compress('JPEG').quality(0.3).stream().pipe(writeStream);
    // gm(readStream, fileObj.name()).compress('JPEG').stream().pipe(writeStream);
    gm(readStream, fileObj.name()).interlace('Line').quality(100).setFormat('jpg').stream().pipe(writeStream);

    // console.log('compressImage ----->', fileObj);

    // gm(readStream, fileObj.name()).compress('JPEG').stream().pipe(writeStream);
  };

  // console.log('compressImage -------> ', compressImage);

  const serverImageStore = new FS.Store.S3('original', {
    beforeWrite: function (fileObj) {
      // console.log('FS.Collection images beforeWrite -------> ', fileObj);
      return {
        extension: 'jpg',
        type: 'image/jpg'
      };
    },
    transformWrite: compressImage,
    accessKeyId: 'AKIAIYQP7KLRMJZZTKUQ',
    secretAccessKey: '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',
    bucket: 'houseoffam2'
  });

  const localStore = new FS.Store.FileSystem('localImages', {
    path: '~/uploads',
    // beforeWrite: beforeWrite,
    transformWrite: compressImage
  });

  // console.log( 'FS.TempStore --------->', FS.TempStore);
  FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore', { internal: true });

  Images = new FS.Collection('images', {
    stores: [serverImageStore, localStore]
    , filter: {
      allow: {
        maxSize: 6 * 1024 * 1024,  // 6MB in [Bytes]
        allow: {
          contentTypes: ['image/*']
        }
      }
    }
  });

  Images.allow({
    insert: function (userId) {
      return userId;
    },
    remove: function (userId) {
      return userId;
    },
    download: function () {
      return true;
    },
    update: function (userId) {
      return userId;
    }
  });

  Meteor.publish('images', function (party) {
    if (!party) {
      return Images.find({});
    } else {
      return Images.find({
        _id: {
          $in: party.images
        }
      });
    }
  });
}

if (Meteor.isClient) {
  const clientImageStore = new FS.Store.S3('original');
  Images = new FS.Collection('images', {
    stores: [clientImageStore],
    filter: {
      allow: {
        maxSize: 786432,  // 6MB in [Bytes]
        allow: {
          contentTypes: ['image/*']
        }
      }
    }
    , onInvalid: function (message) {
      toastr.error(message);
    }
  });
}
