Meteor.publish('images', function (partyId) {
  if (!partyId) {
    return Images.find({});
  } else {
    const party = Parties.findOne(partyId);
    if (!party) {
      return [];
    } else {
      return Images.find({
        _id: {
          $in: _(party.images).map(function (each) { return each._id })
        }}
        , { sort: { uploadedAt: -1 } });
      }
    }
});


Meteor.publish('mainImages', function () {
  var mainImagesIds = _(Parties.find().fetch()).map(function (each){
    if(!_(each.images).isEmpty()) {
      return each.images[0]._id
    } else {
      return null
    }
  });

  mainImagesIds = _(mainImagesIds).without(null);

  const answer = Images.find({
    _id: { $in: mainImagesIds }
  });

  return answer;
});