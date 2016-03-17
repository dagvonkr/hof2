'use strict';
angular.module('hof2').controller('AddPhotoCtrl', ['$scope', function ($scope) {
  $scope.addImagesTallRectangle = function (files) {
    console.log('AddPhotoCtrl -> files:',files);
    if(!files) { return; }

    if (files.length > 0) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(files[0]);
      $scope.images.save(files[0]);
    }
    else {
      $scope.imgSrc = undefined;
    }
  };

  $scope.addImagesRectangle = function (files) {
    if(!files) { return; }

    if (files.length > 0) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc2 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(files[0]);
      $scope.images.save(files[0]);
    }
    else {
      $scope.imgSrc2 = undefined;
    }
  };

  $scope.addImagesSquare = function (files) {
    if(!files) { return; }

    if (files.length > 0) {

      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc3 = e.target.result;
          $scope.myCroppedImage = '';
        });
      };

      reader.readAsDataURL(files[0]);
      $scope.images.save(files[0]);
    }
    else {
      $scope.imgSrc3 = undefined;
    }
  };

  $scope.saveTallRectangleImage = function () {
    if (isCropping() && !_($scope.images).isEmpty()) {
      $scope.images.save($scope.myCroppedImage).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 432,
            width: 508
          },
          articleDescription: ''
        });
        $scope.imgSrc = undefined;
        $scope.myCroppedImage = '';
      });
    }
  };

  $scope.saveRectangleImage = function () {
    if (isCropping() && !_($scope.images).isEmpty()) {
      $scope.images.save($scope.myCroppedImage).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 432,
            width: 247
          },
          articleDescription: ''
        });
        $scope.imgSrc2 = undefined;
        $scope.myCroppedImage = '';
      });
    }
  };

  $scope.saveSquareImage = function () {
    if (isCropping() && !_($scope.images).isEmpty()) {
      $scope.images.save($scope.myCroppedImage).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 432,
            width: 432
          },
          articleDescription: ''
        });
        $scope.imgSrc3 = undefined;
        $scope.myCroppedImage = '';
      });
    }
  };

  function isCropping() {
    // Answers true if the controller is currently cropping an image.
    return !!$scope.myCroppedImage && $scope.myCroppedImage !== '';
  }

  // $scope.deletePreviewImage = function (image) {
  //   $scope.images.remove($scope.myCroppedImage).then(function (result) {
  //     $scope.newPartyImages.splice(image, 1);
  //   });
  // };

}]);

