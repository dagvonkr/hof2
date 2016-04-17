'use strict';
angular.module('hof2').controller('AddPhotoCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.initialize = function () {
    // Disableing button when uploading an image
    $scope.isDisabled = false;
    $scope.disableButton = function() {
      $scope.isDisabled = true;
    };

    $rootScope.$on('renderedUploader', function (e, templateContext) {
      $scope.uploader = templateContext;
    });

    // $rootScope.$on('squareUpload', function (event, fileItem) {
    //   $scope.addImagesSquare(fileItem);
    // });

    // $rootScope.$on('portraitUpload', function (event, fileItem) {
    //   $scope.addImagesTallRectangle(fileItem);
    // });

    // $rootScope.$on('landscapeUpload', function (event, fileItem) {
    //   $scope.addImagesRectangle(fileItem);
    // });

  };

  function getBinaryBlobFromBase64 (base64String) {
    // Answers a new block fibinary data corresponding to based64String

    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (base64String.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64String.split(',')[1]);
    else
      byteString = unescape(base64String.split(',')[1]);

    // separate out the mime component
    var mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  function getMetadataOn (file) {
    return {
      _id: Random.id()
      , filename: file.name
      , size: file.x
      , mimeType: file.type
      , uploadedAt: new Date
      , uploadedBy: Meteor.userId()
    };
  }

  $scope.addImagesTallRectangle = function (files) {
    if (!_(files).isEmpty()) {
      $scope.portraitFile = files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(files[0]);
      // $scope.images.save(files[0]);
      $scope.isDisabled = false;
    }
    else {
      $scope.imgSrc = undefined;
    }
  };

  $scope.addImagesRectangle = function (files) {
    if (!_(files).isEmpty()) {
      $scope.landscapeFile = files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc2 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(files[0]);

      // $scope.images.save(files[0]).then(function (result) {
      // });
      $scope.isDisabled = false;

    }
    else {
      $scope.imgSrc2 = undefined;
    }
  };

  $scope.addImagesSquare = function (files) {
    if (!_(files).isEmpty()) {
      $scope.squareFile = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc3 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };
      reader.readAsDataURL(files[0]);
      // $scope.images.save(files[0]);
      $scope.isDisabled = false;
    }
    else {
      $scope.imgSrc3 = undefined;
    }
  };

  $scope.saveTallRectangleImage = function () {
    var imageDoc = getMetadataOn($scope.portraitFile);
    if ($scope.myCroppedImage !== '') {
      var blob = getBinaryBlobFromBase64($scope.myCroppedImage);
      var uploader = $('input[type=file].jqUploadclass');
      var onUploadSubmit = function (e, data) {
        data.formData = imageDoc;
        console.log('onUploadSubmit', data.formData);
      };
      var onUploadStart = function (e, data) {
        console.log('saveTallRectangleImage',data);
        data.formData = imageDoc;
      };
      var onDone = function (e, data) {
        $scope.imgSrc = undefined;
        $scope.myCroppedImage = '';
        var addedImageId = Images.insert(imageDoc);
        $scope.newPartyImages.push(addedImageId);
        uploader
          .unbind('fileuploadsubmit', onUploadSubmit)
          .unbind('fileuploadsend', onUploadStart)
          .unbind('fileuploaddone', onDone);
      };

      uploader
        .bind('fileuploadsubmit', onUploadSubmit)
        .bind('fileuploadsend', onUploadStart)
        .bind('fileuploaddone', onDone);
      // uploader.fileupload({formData: {example: 'test'}});
      console.log('using imageDoc instead of example test', imageDoc);
      uploader.fileupload({formData: imageDoc});
      // uploader.fileupload({formData: imageDoc});
      uploader.fileupload('send', {files: [blob]});
    }
  };

  $scope.saveRectangleImage = function () {
    if ($scope.myCroppedImage !== '') {
      var blob = getBinaryBlobFromBase64($scope.myCroppedImage);
      var uploader = $('input[type=file].jqUploadclass');
      var onUploadStart = function (e, data) {
        data.formData = getMetadataOn($scope.landscapeFile);
        var addedImageId = Images.insert(data.formData);
        $scope.newPartyImages.push(addedImageId);
      };
      var onDone = function (e, data) {
        $scope.imgSrc2 = undefined;
        $scope.myCroppedImage = '';
        uploader
          .unbind('fileuploadsend', onUploadStart)
          .unbind('fileuploaddone', onDone);
      };
      uploader
        .bind('fileuploadsend', onUploadStart)
        .bind('fileuploaddone', onDone);
      uploader.fileupload('send', {files: [blob]});
    }
  };

  $scope.saveSquareImage = function () {
    if ($scope.myCroppedImage !== '') {
      var blob = getBinaryBlobFromBase64($scope.myCroppedImage);
      var uploader = $('input[type=file].jqUploadclass');
      var onUploadStart = function (e, data) {
        data.formData = getMetadataOn($scope.squareFile);
        var addedImageId = Images.insert(data.formData);
        $scope.newPartyImages.push(addedImageId);
      };
      var onDone = function (e, data) {
        $scope.imgSrc3 = undefined;
        $scope.myCroppedImage = '';
        uploader
          .unbind('fileuploadsend', onUploadStart)
          .unbind('fileuploaddone', onDone);
      };

      uploader
        .bind('fileuploadsend', onUploadStart)
        .bind('fileuploaddone', onDone);
      uploader.fileupload('send', {files: [blob]});
    }
  };

  // $scope.deletePreviewImage = function (image) {
  //   $scope.images.remove($scope.myCroppedImage).then(function (result) {
  //     $scope.newPartyImages.splice(image, 1);
  //   });
  // };

  $scope.initialize();
}]);

