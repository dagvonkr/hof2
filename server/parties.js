Meteor.publish('parties', function (options, searchString = '') {
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
  const parties = Parties.find({
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
  console.log('parties count:', parties.count());
  return parties;
});
