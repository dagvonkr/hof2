'use strict';
angular.module('hof2').controller('AddPhotoCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.initialize = function () {
    // Disableing button when uploading an image
    $scope.isDisabled = false;
    $scope.disableButton = function() {
      $scope.isDisabled = true;
    };

    $rootScope.$on('squareUpload', function (event, fileItem) {
      $scope.addImagesSquare(fileItem);
    });

    $rootScope.$on('portraitUpload', function (event, fileItem) {
      $scope.addImagesTallRectangle(fileItem);
    });

    $rootScope.$on('landscapeUpload', function (event, fileItem) {
      $scope.addImagesRectangle(fileItem);
    });

  };

  $scope.addImagesTallRectangle = function (fileItem) {
    if (!!fileItem) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(fileItem._file);
      // $scope.images.save(files[0]);
      $scope.isDisabled = false;
    }
    else {
      $scope.imgSrc = undefined;
    }
  };

  $scope.addImagesRectangle = function (fileItem) {
    if (!!fileItem) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc2 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(fileItem._file);

      // $scope.images.save(files[0]).then(function (result) {
      // });
      $scope.isDisabled = false;

    }
    else {
      $scope.imgSrc2 = undefined;
    }
  };

  $scope.addImagesSquare = function (fileItem) {
    if (!!fileItem) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc3 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };
      reader.readAsDataURL(fileItem._file);
      // $scope.images.save(files[0]);
      $scope.isDisabled = false;
    }
    else {
      $scope.imgSrc3 = undefined;
    }
  };

  $scope.saveTallRectangleImage = function () {
    if ($scope.myCroppedImage !== '') {
      console.log('portrait wanna crop');

      // $scope.images.save($scope.myCroppedImage).then(function (result) {
      //   $scope.newPartyImages.push({
      //     image: result[0]._id,
      //     dimensions: {
      //       height: 432,
      //       width: 508
      //     },
      //     articleDescription: ''
      //   });
      //   $scope.imgSrc = undefined;
      //   $scope.myCroppedImage = '';
      // });
    }
  };

  $scope.saveRectangleImage = function () {
    if ($scope.myCroppedImage !== '') {
      console.log('landscape wanna crop');

      // $scope.images.save($scope.myCroppedImage).then(function (result) {
      //   $scope.newPartyImages.push({
      //     image: result[0]._id,
      //     dimensions: {
      //       height: 432,
      //       width: 247
      //     },
      //     articleDescription: ''
      //   });
      //   $scope.imgSrc2 = undefined;
      //   $scope.myCroppedImage = '';
      // });
    }
  };

  $scope.saveSquareImage = function () {
    if ($scope.myCroppedImage !== '') {
      console.log('square wanna crop');
      // $scope.images.save($scope.myCroppedImage).then(function (result) {
      //   $scope.newPartyImages.push({
      //     image: result[0]._id,
      //     dimensions: {
      //       height: 432,
      //       width: 432
      //     },
      //     articleDescription: ''
      //   });
      //   $scope.imgSrc3 = undefined;
      //   $scope.myCroppedImage = '';
      // });
    }
  };

  // $scope.deletePreviewImage = function (image) {
  //   $scope.images.remove($scope.myCroppedImage).then(function (result) {
  //     $scope.newPartyImages.splice(image, 1);
  //   });
  // };

  $scope.initialize();
}]);

