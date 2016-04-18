Meteor.startup(function () {
  // var fs = Npm.require('fs');
  // var path = Npm.require('path');
  // WebApp.connectHandlers.use(function(req, res, next) {
  //     var re = /^\/images\/(.*)$/.exec(req.url);
  //     if (re !== null) {   // Only handle URLs that start with /uploads_url_prefix/*
  //         var filePath = path.resolve(process.cwd(), ('processed/'+ re[1]));
  //         var data = fs.readFileSync(filePath);
  //         res.writeHead(200, {
  //               'Content-Type': 'image'
  //             });
  //         res.write(data);
  //         res.end();
  //     } else {  // Other urls will have default behaviors
  //         next();
  //     }
  // });
});
