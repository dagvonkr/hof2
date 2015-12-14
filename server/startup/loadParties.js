Meteor.startup(function () {
  if (Parties.find().count() === 0) {
    var parties = [
      {'name': 'Dubstep-Free Zone',
        'description': 'Fast just got faster with Nexus S.',
        'style' : {
          'header' : {
            top: 0,
            left: 0,
            width: 0
          }
        }
      }
    ];
    for (var i = 0; i < parties.length; i++)
      Parties.insert({name: parties[i].name, description: parties[i].description});
  }
});
