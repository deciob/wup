define([
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