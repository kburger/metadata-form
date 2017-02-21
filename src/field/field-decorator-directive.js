form.directive('metadataFieldDecorator', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      // set defaults
      var ngModelAttrValue = 'model[field.url]';

      if (scope.field.type === 'url') {
        attrs.$set('ng-attr-placeholder', 'http://');
      }

      if (scope.field.autocomplete) {
        // append attributes
        attrs.$set('uib-typeahead', 'result.label for result in getAutocompleteResults(field, $viewValue)');
        attrs.$set('typeahead-loading', 'autocompleteLoading');
        attrs.$set('typeahead-wait-ms', 200);
        attrs.$set('typeahead-min-length', 2);
        attrs.$set('typeahead-on-select', 'selectAutocompleteResult($item, field, $index)');

        // append resource loading indicator element
        var indicator = angular.element('<span ng-show="autocompleteLoading" class="form-control-feedback spinner"></span>');
        element.after(indicator);
        $compile(indicator)(scope);
      }

      if (scope.field.multiple === true) {
        // set attributes
        ngModelAttrValue = 'model[field.url][$index]';
        
        // append plus and minus buttons to the element
        var minus = angular.element('<a href="#" ng-click="remove($index)" ng-show="model[field.url].length > 1"><span class="glyphicon glyphicon-minus-sign"></span></a>');
        element.after(minus);
        $compile(minus)(scope);

        var plus = angular.element('<a href="#" ng-click="add($index)"><span class="glyphicon glyphicon-plus-sign"></span></a>');
        element.after(plus);
        $compile(plus)(scope);
      }

      if (scope.field.nested) {
        ngModelAttrValue = 'model[field.url].url';

        var expandCollapse = angular.element(
          '<a href="#" ng-click="showThing=!showThing">' +
          '<span ng-class="{glyphicon:true, \'glyphicon-collapse-down\':!showThing, \'glyphicon-collapse-up\':showThing}"></span>' +
          '</a>');
        element.after(expandCollapse);
        $compile(expandCollapse)(scope);
      }

      // !! this won't work with nested fields within nested fields !!
      if (scope.parent && !scope.field.nested) {
        // console.log(scope.parent.name, 'is the parent of', scope.field.name, '?');
        ngModelAttrValue = 'model[parent.url][field.url]';
      }

      element.attr('ng-model', ngModelAttrValue);
      element.removeAttr('metadata-field-decorator');
      $compile(element)(scope);
    }
  };
});