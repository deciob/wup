define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  'use strict';

  return Backbone.Model.extend({

    defaults: {
      'play': 'active',
      'stop': 'selected',
      'step_backward': 'inactive',
      'step_forward': 'active',
      'reload': 'inactive',
    },

    initialize: function(options) {

    },

    reset: function(initial_year) {
      var values = _.assign(this.defaults, {year: initial_year});
      this.set(values);
    }

  });

});