Meteor.publish('parties', function (options, searchString = '') {

  const query = {
    name: {
          $regex: `.*${searchString || ''}.*`,
          $options: 'i'
        }

    , $or: [
      { public: true }
      , { owner: this.userId }
    ]
  };

  Counts.publish(this, 'numberOfParties', Parties.find(query), {
    noReady: true
  });

  // return Parties.find(); // for debug purposes only

  // console.log('About to publish parties with query:', query, options);

  const parties = Parties.find(query, options);

  // const parties = Parties.find();
  // console.log('parties count:', parties.count());
  return parties;
});
