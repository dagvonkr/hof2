if (Meteor.isServer) {

  var compressImage = function(fileObj, readStream, writeStream) {
    console.log('fileObj --->', fileObj, 'readStream --->',  readStream, 'writeStream --->', writeStream);
    gm(readStream, fileObj.name()).compress("BZip").quality(1).stream().pipe(writeStream);
  };

  console.log('compressImage -------> ', compressImage);


  const imageStore = new FS.Store.S3('original', {
    transformWrite : compressImage,
    accessKeyId: 'AKIAIYQP7KLRMJZZTKUQ',
    secretAccessKey: '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',
    bucket: 'houseoffam2'
  });


  // console.log( 'FS.TempStore --------->', FS.TempStore);
  FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore', { internal: true });

  Images = new FS.Collection('images', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
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
  const imageStore = new FS.Store.S3('original');
  Images = new FS.Collection('images', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function (message) {
        toastr.error(message);
      }
    }
  });
}
