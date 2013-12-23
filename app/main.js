(function(define) {
  return define([
    "jquery", 
    "backbone",
    "app/router", 
  ], function($, Backbone, Router) {

    return $(document).ready(function() {
      var mainRoute;
      mainRoute = new Router();
      return Backbone.history.start();
    });

  });

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});