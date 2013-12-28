define([
  'backbone',
  'text!app/templates/explore_data_help_template.html'
], function(Backbone, template) {
  'use strict';

  return Backbone.View.extend({

    events: {
      'click i': 'toggleInfo'
    },

    className: 'help',

    tpl: _.template( template ),

    initialize: function(config) {
      this.render();
    },

    render: function () {
      this.$el.html( this.tpl() );
    },

    toggleInfo: function () {
      var icon = this.$el.find('i');
      icon.toggleClass('selected');
      icon.siblings().toggle();
    }

  });

});