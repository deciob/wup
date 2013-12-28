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
        transition, year_step=5;

      // TODO: probably this data and related helpers would be better 
      // positioned inside a collection.
      data_by_year = _.groupBy( data, function (obj) {
        return obj.year;
      });
      function itHasNext (year) {
        return data_by_year[year + year_step];
      }
      function itHasPrev (year) {
        return data_by_year[year - year_step];
      }

      function handleClick (d, i) {
        if ( d3.select(this).classed("active") ) {
          d3.select(this).classed("active", false);
        } else {
          d3.select(this).classed("active", true);
        }
      }

      // TODO: rationalize chart/transition configs (also on nightcharts)
      selection = d3.select('#viz');
      barchart = chart.bar()
        .margin({top: 10, right: 20, bottom: 20, left: 240})
        .width(900)
        .height(700)
        .duration(600)
        .step(600)
        .max(40)
        .handleClick(handleClick)
        .xValue( function(d) { return d['agglomeration']; } )
        .yValue( function(d) { return d['population']; } )
        .orient( 'horizontal' );
      transition_config = {
        selection: selection,
        data: data_by_year,
        chart: barchart,
        position: this.application_state.get('year'),
        step: year_step
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

      transition.dispatch.on('at_beginning_of_transition.explore_data', 
       function() {
        var year = transition.position;
        if ( self.application_state.get('year') !== year ) {
          self.application_state.set('year', year);
        }
      });

      transition.dispatch.on('end.explore_data', function() {
        var year = transition.position,
          status = transition.state_machine.getStatus();

        if (status === 'in_pause') {
          self.application_state.set({
            'play': 'active',
            'stop': 'selected',
            'step_backward': itHasPrev(year) ? 'active' : 'inactive',
            'step_forward': itHasNext(year) ? 'active' : 'inactive',
            'reload': itHasPrev(year) ? 'active' : 'inactive',
          });
        } else if (status === 'in_transition_start') {
          self.application_state.set({
            'play': 'selected',
            'stop': 'active',
            'step_backward': 'inactive',
            'step_forward': 'inactive',
            'reload': 'inactive',
          });
        } else if (status === 'in_transition_next') {
          self.application_state.set({
            'play': 'inactive',
            'stop': 'inactive',
            'step_backward': 'inactive',
            'step_forward': 'selected',
            'reload': 'inactive',
          });
        } else if (status === 'in_transition_prev') {
          self.application_state.set({
            'play': 'inactive',
            'stop': 'inactive',
            'step_backward': 'selected',
            'step_forward': 'inactive',
            'reload': 'inactive',
          });
        }
        self.mediator.trigger('state_machine_change');
      });
      
    },

    onClose: function () {
      this.mediator.off('step_backward');
      this.mediator.off('play');
      this.mediator.off('stop');
      this.mediator.off('step_forward');
      this.mediator.off('reload');
    }
  
  });

});