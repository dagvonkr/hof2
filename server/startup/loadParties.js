Meteor.startup(function () {
  if (Parties.find().count() === 0) {
    var parties = [
      { 
        'name': 'Test',
        'description': 'test'
      }
    ];
    for (var i = 0; i < parties.length; i++)
      Parties.insert({
        name: parties[i].name, 
        description: parties[i].description
      });

   
  }
});
