'use strict';
angular.module('hof2').controller('AddPhotoCtrl', ['$scope', function ($scope) {
  $scope.addImagesTallRectangle = function (files) {
    if (files.length > 0) {
      let reader = new FileReader();

      reader.onload = function (e) {
        $scope.$apply(function () {
          $scope.imgSrc = e.target.result;
          $scope.myCroppedImageTallRectangle = '';
        });
      };

      reader.readAsDataURL(files[0]);
      $scope.images.save(files[0]);
    }
    else{
      $scope.imgSrc = undefined;
    }
  };

  $scope.addImagesRectangle = function (files) {
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
    else{
      $scope.imgSrc2 = undefined;
    }
  };

  $scope.addImagesSquare = function (files) {
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
    else{
      $scope.imgSrc3 = undefined;
    }
  };

  $scope.saveTallRectangleImage = function () {
    if($scope.myCroppedImageTallRectangle !== '') {
      $scope.images.save($scope.myCroppedImageTallRectangle).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 450,
            width: 375
          }
        });
        $scope.imgSrc = undefined;
        $scope.myCroppedImageTallRectangle = '';
      });
    }
  };

  $scope.saveRectangleImage = function () {
    if($scope.myCroppedImage !== '') {
      $scope.images.save($scope.myCroppedImage).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 300,
            width: 750
          }
        });
        $scope.imgSrc2 = undefined;
        $scope.myCroppedImage = '';
      });
    }
  };

  $scope.saveSquareImage = function () {
    if($scope.myCroppedImage !== '') {
      $scope.images.save($scope.myCroppedImage).then(function (result) {
        $scope.newPartyImages.push({
          image: result[0]._id,
          dimensions: {
            height: 375,
            width: 375
          }
        });
        $scope.imgSrc3 = undefined;
        $scope.myCroppedImage = '';
      });
    }
  };
}]);
