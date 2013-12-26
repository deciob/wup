(function(define) {
  return define([
    'd3',
    'underscore',
    'when', 
    'backbone',
    'app/models/application_state',
    'app/views/base_view',
    'app/views/welcome_view',
    'app/views/explore_data/explore_data_view'
  ], function(d3, _, when, Backbone, ApplicationState, BaseView, WelcomeView, ExploreDataView) {

    return Backbone.Router.extend({
      routes: {
        '': 'welcome',
        'explore_data': 'exploreData',
        'tell_story': 'tellStory',
      },
      options: {
        
      },
      initialize: function(application_config) {
        this.defer = when.defer();
        this.promised_data = this.fetchData(application_config.data_path);
        this.application_state = new ApplicationState({
          year: application_config.initial_year});
        this.base_view = new BaseView();
        this.current_view = void 0;
        this.config = _.assign(application_config, {
          application_state: this.application_state,
          promised_data: this.promised_data
        });
      },
      welcome: function () {
        this.removePrevView();
        this.config.application_state.reset(this.config.initial_year);
        this.current_view = new WelcomeView();
        this.renderCurrentView();
      },
      exploreData: function () {
        this.removePrevView();
        this.current_view = new ExploreDataView(this.config);
        this.renderCurrentView();
      },
      tellStory: function () {
        console.log('tell_story');
      },

      fetchData: function (data_path) {
        var self = this;
        function accessor(d) {
          // csv headers:
          // year,rank,country,agglomeration,population
          return {
            year: +d.year,
            rank: d.rank,
            country: d.country,
            agglomeration: d.agglomeration,
            population: +d.population
          };
        }
        d3.csv(data_path, accessor , function(error, data) {
          self.defer.resolve(data);
        });
        return this.defer.promise;
      },

      removePrevView: function () {
        if (this.current_view) {
          this.current_view.close();
        }
      },
      renderCurrentView: function () {
        this.current_view.render();
        this.base_view.render(this.current_view);
      }
  });

  });

})(typeof define === 'function' && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});