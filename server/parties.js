Meteor.publish('parties', function (options, searchString = '') {
  Counts.publish(this, 'numberOfParties', Parties.find({
    $or: [
    {
      name: {
            $regex: `.*${searchString || ''}.*`,
            $options: 'i'
          }
    },
    {
      public: true
    }, {
      owner: this.userId
    }]
  }), {
    noReady: true
  });

  // return Parties.find(); // for debug purposes only
  const query = {
    $or: [
      { name: {
          $regex: `.*${searchString || ''}.*`,
          $options: 'i'
        }
      }
      , { public: true }
      , { owner: this.userId }
    ]
  };

  console.log('About to publish parties with query:', query, options);

  const parties = Parties.find(query, options);

  // const parties = Parties.find();
  console.log('parties count:', parties.count());
  return parties;
});
