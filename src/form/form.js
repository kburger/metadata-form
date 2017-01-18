var form = angular.module('metadata.form', []);

form.service('CommService', function() {
  return {
    ping: function() {
      return 'Hello World';
    }
  };
});

(function(w) {
  w.metadata = w.metadata || {
    callbacks: [],
    addListener: function(callback) {
      this.callbacks.push(callback);
    },
    notify: function(model) {
      angular.forEach(this.callbacks, function(callback) {
        callback(model);
      });
    }
  };
})(window);