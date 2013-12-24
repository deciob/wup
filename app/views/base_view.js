(function(define) {
  return define([
    "backbone"
  ], function(Backbone) {

    return Backbone.View.extend({

      el: '#app',
    
      render: function (inner_view) {
        this.$el.empty();
        this.$el.append(inner_view.$el);
      }
    
    });

  });

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});