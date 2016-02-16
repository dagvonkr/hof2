Images = new FS.Collection('images', {
  stores: [
    new FS.Store.GridFS('original')
  ],
  filters: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

if (Meteor.isServer) {
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

  Meteor.publish('images', function (ids) {
    return Images.find({});
  });
}
