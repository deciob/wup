(function(define) {
  return define([
    "backbone",
    "app/views/base_view",
    "app/views/welcome_view"
  ], function(Backbone, BaseView, WelcomeView) {

    return Backbone.Router.extend({
      routes: {
        "": "welcome",
        "explore_data": "exploreData",
        "tell_story": "tellStory",
      },
      options: {
        
      },
      initialize: function() {
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
        //this.current_view = new WelcomeView();
        //_renderCurrentView();
      },
      tellStory: function () {
        console.log("tell_story");
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