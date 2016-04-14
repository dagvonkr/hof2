Meteor.publish('users', function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.startup(function () {
  if ((Meteor.users.find().count() === 0) && Meteor.settings.initial) {
    Accounts.createUser({
      ...Meteor.settings.initial.user
    });
  }
});
