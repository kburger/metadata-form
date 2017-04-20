form.controller('FormController', function($scope, $injector, CommService) {
  if ($scope.model === undefined) {
    $scope.model = {};
  }
  
  if ($scope.showSaveButton === undefined) {
    $scope.showSaveButton = true;
  }
  
  if ($scope.hideFields === undefined) {
    $scope.hideFields = [];
  }

  var schema = $injector.get($scope.view);
  $scope.components = schema.components;

  angular.forEach($scope.components, function(component) {
    if (component.multiple === true) {
      $scope.model[component.url] = [''];
    }
    if (component.nested) {
      $scope.model[component.url] = {};
    }
  });

  $scope.isUserHidden = function(id) {
    return $scope.hideFields.indexOf(id) !== -1;
  };

  $scope.submit = function() {
    CommService.update($scope.model);
  };
});