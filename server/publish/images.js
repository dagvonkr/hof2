Meteor.publish('images', function (party) {
  if (!party) {
    return Images.find({});
  } else {
    return Images.find({
      _id: {
        $in: party.images
      }}
      , { sort: { uploadedAt: -1 } });
  }
});


Meteor.publish('mainImages', function () {
  let mainImagesIds = _(Parties.find().fetch()).map(function (each){
    if(!_(each.images).isEmpty()) {
      return each.images[0].id
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