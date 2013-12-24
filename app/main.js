(function(define) {
  return define([
    "jquery", 
    "backbone",
    "app/router", 
  ], function($, Backbone, Router) {

    return $(document).ready(function() {

      // http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
      Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose){
          this.onClose();
        }
      };

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