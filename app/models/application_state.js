define([
  'backbone'
], function(Backbone) {
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



  });

});