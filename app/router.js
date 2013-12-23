(function(define) {
  return define([
    "backbone",
    "app/views/welcome_view"
  ], function(Backbone, WelcomeView) {

    return Backbone.Router.extend({
      routes: {
        "": "welcome",
        "explore_data": "exploreData",
        "tell_story": "tellStory",
      },
      options: {
        
      },
      initialize: function() {
        console.log("initialize");
      },
      welcome: function () {
        var welcome_view = new WelcomeView();
        welcome_view.render();
      },
      exploreData: function () {
        console.log("explore_data");
      },
      tellStory: function () {
        console.log("tell_story");
      },
  });

  });

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});