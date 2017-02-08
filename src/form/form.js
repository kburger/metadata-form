var form = angular.module('metadata.form', ['metadata.constants', 'ui.bootstrap']);

form.service('CommService', function() {
  var _callback;

  return {
    ping: function() {
      return 'Hello World';
    },
    setCallback: function(callback) {
      _callback = callback;
    },
    update: function(model) {
      _callback(model);
    }
  };
});