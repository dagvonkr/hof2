Meteor.publish('parties', function (options, search = '') {
  Counts.publish(this, 'numberOfParties', Parties.find({
    name: {
      $regex: `.*${searchString || ''}.*`,
      $options: 'i'
    },
    $or: [{
      public: true
    }, {
      owner: this.userId
    }]
  }), {
    noReady: true
  });

  // return Parties.find(); // for debug purposes only
  return Parties.find({
    name: {
      $regex: `.*${searchString || ''}.*`,
      $options: 'i'
    },
    $or: [{
      public: true
    }, {
      owner: this.userId
    }]
  }, options);
});
