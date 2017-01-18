form.directive('metadataFieldDecorator', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (scope.field.autocomplete) {
        // append attributes
        element.attr('uib-typeahead', 'testing');

        // append resource loading indicator element
        var indicator = angular.element('<span ng-show="fubar">loading</span>');
        element.after(indicator);
        $compile(indicator)(scope);
      }

      if (scope.field.multiple === true) {
        // append attributes
        element.attr('ng-model', 'model[field.url][$index]');
        element.removeAttr('metadata-field-decorator');
        $compile(element)(scope);
        
        // append plus and minus buttons to the element
        var plus = angular.element('<a href="#" ng-click="add($index)">[+]</a>');
        element.after(plus);
        $compile(plus)(scope);

        var minus = angular.element('<a href="#" ng-click="remove($index)">[-]</a>');
        element.after(minus);
        $compile(minus)(scope);
      }

      if (!scope.field.multiple) {
        element.attr('ng-model', 'model[field.url]');
        element.removeAttr('metadata-field-decorator');
        $compile(element)(scope);
      }
    }
  };
});