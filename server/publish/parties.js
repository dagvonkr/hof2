Meteor.publish('allParties', function (options, searchString = '') {
  // Publishes all the parties posts.
  const query = { owner: this.userId };
  return Parties.find({ owner: this.userId }, {sort: { createdAt: -1 }});
});

Meteor.publish('parties', function (options, searchString = '') {
  // Publishes only the parties posts that are set as public and uses the sent options or searchString if any.
  const someOptions = options || { sort: {createdAt: -1}};
  const query = {
    $or: [
      { public: true }
      , { $and: [
          { name: {
                  $regex: `.*${searchString || ''}.*`
                  , $options: 'i'
                } }
        , { public: true }
      ] }
    ]
  };

  Counts.publish(this, 'numberOfParties', Parties.find(query), {
    noReady: true
  });

  // return Parties.find(); // for debug purposes only

  // console.log('About to publish parties with query:', query, options);

  const parties = Parties.find(query, someOptions);

  // const parties = Parties.find();
  // console.log('parties count:', parties.count());
  return parties;
});
