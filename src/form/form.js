var form = angular.module('metadata.form', ['metadata.constants', 'ui.bootstrap']);

form.service('CommService', function($log) {
  var _callback;

  return {
    setCallback: function(callback) {
      _callback = callback;
    },
    update: function(model) {
      if (_callback) {
        _callback(model);
      } else {
        $log.warn('No callback has been set');
      }
    }
  };
});