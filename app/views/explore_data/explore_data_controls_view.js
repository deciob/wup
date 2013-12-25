define([
  'backbone',
  'app/lib/mediator',
  'text!app/templates/explore_data_controls_template.html'
], function(Backbone, mediator, template) {
  'use strict';

  return Backbone.View.extend({

    id: 'controls',

    tpl: _.template( template ),

    mediator: mediator,

    events: {
      'click .icon-step_backward': 'step_backward',
      'click .icon-play': 'play',
      'click .icon-stop': 'stop',
      'click .icon-step_forward': 'step_forward',
      'click .icon-reload': 'reload',
    },

    initialize: function(config) {
      this.application_state = config.application_state;
      this.mediator.on('state_machine_change', this.render, this);
      this.render();
    },

    render: function () {
      var state = {
        'play_state': this.application_state.get('play'),
        'stop_state': this.application_state.get('stop'),
        'step_backward_state': this.application_state.get('step_backward'),
        'step_forward_state': this.application_state.get('step_forward'),
        'reload_state': this.application_state.get('reload'),
      };
      this.$el.html( this.tpl(state) );
    },

    step_backward: function () {
      if ( this.application_state.get('step_backward') === 'active' ) {
        this.application_state.set({
          'play': 'inactive',
          'stop': 'inactive',
          'step_backward': 'selected',
          'step_forward': 'inactive',
          'reload': 'inactive',
        });
        this.mediator.trigger('step_backward');
        this.render();
      }
    },
    play: function () {
      if ( this.application_state.get('play') === 'active' ) {
        this.application_state.set({
          'play': 'selected',
          'stop': 'active',
          'step_backward': 'inactive',
          'step_forward': 'inactive',
          'reload': 'inactive',
        });
        this.mediator.trigger('play');
        this.render();
      }
    },
    stop: function () {
      if ( this.application_state.get('stop') === 'active' ) {
        this.application_state.set({
          'play': 'active',
          'stop': 'selected',
          'step_backward': 'active',
          'step_forward': 'active',
          'reload': 'active',
        });
        this.mediator.trigger('stop');
        this.render();
      }
    },
    step_forward: function () {
      if ( this.application_state.get('step_forward') === 'active' ) {
        this.application_state.set({
          'play': 'inactive',
          'stop': 'inactive',
          'step_backward': 'inactive',
          'step_forward': 'selected',
          'reload': 'inactive',
        });      
        this.mediator.trigger('step_forward');
        this.render();
      }
    },
    reload: function () {
      if ( this.application_state.get('reload') === 'active' ) {
        this.application_state.set({
          'play': 'active',
          'stop': 'inactive',
          'step_backward': 'inactive',
          'step_forward': 'active',
          'reload': 'selected',
        });
        this.mediator.trigger('reload');
        this.render();
      }
    }

  });

});