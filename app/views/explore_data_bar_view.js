(function(define) {
  return define([
    "backbone",
    "d3",
    "chart",
    "app/lib/mediator"
  ], function(Backbone, d3, chart, mediator) {

    return Backbone.View.extend({

      mediator: mediator,

      id: 'viz',

      initialize: function(promised_data) {
        var self = this;
        promised_data.then(function (data) {
          self.render(data);
        });
      },
    
      render: function (data) {
        var current_year, current_timeout, data_by_year, selection, barchart,
          info = d3.select("#info"), stop_transition = false,
          initial_year = 1950, current_year = initial_year, transition_conf;
        data_by_year = _.groupBy( data, function (obj) {
          return obj.year;
        });
        selection = d3.select("#viz");
        info.text(current_year);

        barchart = chart.bar()
          .margin({top: 10, right: 20, bottom: 20, left: 400})
          .width(1100)
          .height(700)
          .duration(600)
          .step(200)
          .max(40)
          .xValue( function(d) { return d['agglomeration']; } )
          .yValue( function(d) { return d['population']; } )
          //.handleTransitionEnd( handleTransitionEnd )
          .orient( 'horizontal' );

        //selection.datum(data_by_year[current_year]).call(barchart);

        var transition_config = {
          selection: selection,
          data: data_by_year,
          chart: barchart,
          position: initial_year,
          step: 5
        }

        var transition = new chart.TransitionTrain(transition_config),
          start = d3.select("#start"), stop = d3.select("#stop"),
          next = d3.select("#next"), prev = d3.select("#prev"),
          reset = d3.select("#reset");

        transition.dispatch.on('end', function() {
          d3.select('#info').html(transition.position);
        })
        start.on('click', function () {
          transition.dispatch.start.call(transition);
        });
        stop.on('click', function () {
          transition.dispatch.stop.call(transition);
        });
        next.on('click', function () {
          transition.dispatch.next.call(transition);
        });
        prev.on('click', function () {
          transition.dispatch.prev.call(transition);
        });
        reset.on('click', function () {
          transition.dispatch.reset.call(transition);
        });
      },

      onClose: function () {
        console.log("removing explore_data_bar_view !!!!!");
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