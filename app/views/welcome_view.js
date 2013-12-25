(function(define) {
  return define([
    "backbone",
    "text!app/templates/welcome_template.html"
  ], function(Backbone, template) {

    return Backbone.View.extend({

      //el: '#app',
    
      // Cache the template function for a single item.
      todoTpl: _.template( template ),
    
      events: {
        'click #explore_data_selector': 'exploreData'
        //'dblclick label': 'edit',
        //'keypress .edit': 'updateOnEnter',
        //'blur .edit':   'close'
      },

      initialize: function () {
        console.log("gooooooo!");
      },
    
      render: function () {
        console.log("rendering!!!!!!");
        this.$el.html( this.todoTpl() );
      },

      exploreData: function () {
        Backbone.history.navigate("explore_data", {trigger: true});
      },

      onClose: function () {
        console.log("removing!!!!!");
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