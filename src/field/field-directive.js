form.directive('metadataField', function($http, $filter, $injector) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      if (scope.field.multiple === true) {
        scope.template = 'field/field-multiple.tpl.html';
      } else if (scope.field.nested) {
        scope.template = 'field/field-nested.tpl.html';
      } else {
        scope.template = 'field/field.tpl.html';
      }

      scope.add = function($index) {
        if (!scope.model[scope.field.url]) {
          scope.model[scope.field.url] = [];
        }
        scope.model[scope.field.url].splice($index + 1, 0, '');
      };
      scope.remove = function($index) {
        scope.model[scope.field.url].splice($index, 1);
      };

      scope.getAutocompleteResults = function(field, $viewValue) {
        if (field.autocomplete.constant) {
          // TODO need proper handling of unknown constant value
          return $filter('filter')($injector.get(field.autocomplete.constant), $viewValue.toLowerCase());
        }

        else if (field.autocomplete.api) {
          var api = field.autocomplete.api;
          var params = api.params || {};

          if (api.inputparam) {
            params[api.inputparam] = $viewValue;
          }

          return $http.get(api.endpoint, {params: params}).then(function(response) {
            var root = response.data[api.response.root] || response.data;
            var props = api.response.props;

            var results = [];

            angular.forEach(root, function(value) {
              var result = {};
              angular.forEach(value, function(v, k) {
                if (props[k]) {
                  result[props[k]] = v;
                }
              });

              results.push(result);
            });
            return results;
          }, function(response) {
            console.log('autocomplete error', response);
          });
        }
      };

      scope.selectAutocompleteResult = function($item, field, $index) {
        if (field.multiple === true) {
          scope.model[field.url][$index] = $item.url;
        } else {
          scope.model[field.url] = $item.url;
        }
      };
    },
    template: '<ng-include src="template"></ng-include><br/><br/>'
  };
});