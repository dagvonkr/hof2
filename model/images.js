if (Meteor.isServer) {

  var imageStore = new FS.Store.S3('original', {
    "accessKeyId" : "AKIAIYQP7KLRMJZZTKUQ",
    "secretAccessKey" : "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",
    "bucket" : "houseoffam2"
  });


  Images = new FS.Collection("images", {
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
  var imageStore = new FS.Store.S3("images", {
    beforeWrite: function (file) {
      console.log('Writing it!', file);
    }
  });
  Images = new FS.Collection("Images", {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        toastr.error(message);
      }
    }
  });
}
