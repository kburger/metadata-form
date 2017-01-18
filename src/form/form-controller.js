form.controller('FormController', function($scope, $window) {
  $scope.model = {};

  $scope.$watch('model', function(n, o) {
    $window.metadata.notify(n);
  }, true);

  $scope.components = {
    title: {
      name: 'Title',
      url: 'http://example.com/title',
      type: 'text',
      description: 'The title of this resource',
      required: true
    },
    homepage: {
      name: 'Homepage',
      url: 'http://example.com/homepage',
      type: 'url',
      description: 'The landing page of this resource',
      required: false,
      multiple: true
    },
    language: {
      name: 'Language',
      url: 'http://example.com/language',
      type: 'url',
      description: 'The primary language of this resources',
      required: true,
      autocomplete: {
        source: 'language.json'
      }
    },
    keyword: {
      name: 'Keyword',
      url: 'http://example.com/keyword',
      type: 'text',
      description: 'Keywords describing the resource',
      required: false,
      multiple: true
    }
  };

  $scope.model[$scope.components.homepage.url] = ['']
  $scope.model[$scope.components.keyword.url] = [''];
});