(function(define) {
  return define([
    "backbone",
    "app/views/explore_data_bar_view",
    "text!app/templates/explore_data_template.html"
  ], function(Backbone, ExploreDataBarView, template) {

    return Backbone.View.extend({

      todoTpl: _.template( template ),

      initialize: function(promised_data) {
        this.bar = new ExploreDataBarView(promised_data);
      },
    
      render: function (inner_view) {
        this.$el.html( this.todoTpl() );
        this.$el.append( this.bar.$el );
      },

      onClose: function () {
        this.bar.close();
        console.log("removing explore_data_view !!!!!");
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