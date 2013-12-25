define([
  'backbone',
  'd3',
  'app/lib/mediator',
  'text!app/templates/explore_data_year_template.html'
], function(Backbone, d3, mediator, template) {
  'use strict';

  return Backbone.View.extend({

    id: 'year',

    tpl: _.template( template ),

    initialize: function(config) {
      this.application_state = config.application_state;
      this.listenTo(this.application_state, 'change:year', this.render, this);
      this.render();
    },

    render: function () {
      this.$el.html( this.tpl({year: this.application_state.get('year')}) );
    }

  });

});