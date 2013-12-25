define([
  'backbone',
  'd3',
  'chart',
  'app/lib/mediator'
], function(Backbone, d3, chart, mediator) {
  'use strict';

  return Backbone.View.extend({

    mediator: mediator,

    id: 'viz',

    initialize: function(config) {
      var self = this;
      this.application_state = config.application_state;
      config.promised_data.then(function (data) {
        self.render(data);
      });
    },
  
    render: function (data) {
      var self=this, data_by_year, selection, barchart, transition_config, 
        transition;

      data_by_year = _.groupBy( data, function (obj) {
        return obj.year;
      });
      selection = d3.select('#viz');
      barchart = chart.bar()
        .margin({top: 10, right: 20, bottom: 20, left: 240})
        .width(700)
        .height(700)
        .duration(600)
        .step(200)
        .max(40)
        .xValue( function(d) { return d['agglomeration']; } )
        .yValue( function(d) { return d['population']; } )
        .orient( 'horizontal' );
      transition_config = {
        selection: selection,
        data: data_by_year,
        chart: barchart,
        position: this.application_state.get('year'),
        step: 5
      };
      transition = new chart.TransitionTrain(transition_config);

      this.mediator.on('step_backward', function () {
        transition.dispatch.prev.call(transition);
      });
      this.mediator.on('play', function () {
        transition.dispatch.start.call(transition);
      });
      this.mediator.on('stop', function () {
        transition.dispatch.stop.call(transition);
      });
      this.mediator.on('step_forward', function () {
        transition.dispatch.next.call(transition);
      });
      this.mediator.on('reload', function () {
        transition.dispatch.reset.call(transition);
      });      

      
      // FIXME!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      transition.dispatch.on('end', function() {
        self.application_state.set('year', transition.position);
        if (transition.state_machine.getStatus() === 'in_pause') {
          self.application_state.set({
            'play': 'active',
            'stop': 'selected',
            'step_backward': 'active',
            'step_forward': 'active',
            'reload': 'active',
          });
        } else if (transition.state_machine.getStatus() === 'in_transition_start') {
          self.application_state.set({
            'play': 'selected',
            'stop': 'active',
            'step_backward': 'inactive',
            'step_forward': 'inactive',
            'reload': 'inactive',
          });
        } else if (transition.state_machine.getStatus() === 'in_transition_next') {
          self.application_state.set({
            'play': 'inactive',
            'stop': 'inactive',
            'step_backward': 'inactive',
            'step_forward': 'active',
            'reload': 'inactive',
          });
        } else if (transition.state_machine.getStatus() === 'in_transition_prev') {
          self.application_state.set({
            'play': 'inactive',
            'stop': 'inactive',
            'step_backward': 'active',
            'step_forward': 'inactive',
            'reload': 'inactive',
          });
        }
        self.mediator.trigger('state_machine_change');
      });
      
    },

    onClose: function () {
      console.log('removing explore_data_bar_view !!!!!');
    }
  
  });

});