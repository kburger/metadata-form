form.controller('FormController', function($scope, $injector, CommService) {
  if ($scope.model === undefined) {
    $scope.model = {};
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

  $scope.submit = function() {
    console.log('submitted', $scope.model);
    CommService.update($scope.model);
  };
});