(function(define) {
  return define([
    "d3",
    "underscore",
    "when", 
    "backbone",
    "app/views/base_view",
    "app/views/welcome_view",
    "app/views/explore_data_view"
  ], function(d3, _, when, Backbone, BaseView, WelcomeView, ExploreDataView) {

    return Backbone.Router.extend({
      routes: {
        "": "welcome",
        "explore_data": "exploreData",
        "tell_story": "tellStory",
      },
      options: {
        
      },
      initialize: function() {
        this.defer = when.defer();
        this.promised_data = this.fetchData();
        this.base_view = new BaseView();
        this.current_view = void 0;
      },
      welcome: function () {
        this.removePrevView();
        this.current_view = new WelcomeView();
        this.renderCurrentView();
      },
      exploreData: function () {
        this.removePrevView();
        this.current_view = new ExploreDataView(this.promised_data);
        this.renderCurrentView();
      },
      tellStory: function () {
        console.log("tell_story");
      },

      fetchData: function () {
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
        d3.csv("app/data/WUP2011-F11a-30_Largest_Cities.csv",
         accessor , function(error, data) {
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

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});