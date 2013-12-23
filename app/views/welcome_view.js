(function(define) {
  return define([
    "backbone", 
  ], function(Backbone) {

    return Backbone.View.extend({

      el: '#app',
    
      // Cache the template function for a single item.
      todoTpl: _.template( "<div>Welcome!</div>" ),
    
      events: {
        //'dblclick label': 'edit',
        //'keypress .edit': 'updateOnEnter',
        //'blur .edit':   'close'
      },

      initialize: function() {
        console.log("gooooooo!");
      },
    
      // Re-render the title of the todo item.
      render: function() {
        this.$el.html( this.todoTpl() );
        return this;
      },
    
    });

  });

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});