form.directive('metadataField', function() {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      if (scope.field.multiple === true) {
        scope.tpl = 'field/field-multiple.tpl.html';
      } else if (scope.field.nested) {
        scope.tpl = 'field/field-nested.tpl.html';
      } else {
        scope.tpl = 'field/field.tpl.html';
      }

      scope.add = function($index) {
        console.log('add multiple for field', scope.field.name, 'at index', $index);
        if (!scope.model[scope.field.url]) {
          scope.model[scope.field.url] = [];
        }
        scope.model[scope.field.url].splice($index + 1, 0, '');//push('');
      };
      scope.remove = function($index) {
        console.log('remove multiple for field', scope.field.name, 'from index', $index);
        scope.model[scope.field.url].splice($index, 1);
      };
    },
    template: '<ng-include src="tpl"></ng-include><br/>'
  };
});