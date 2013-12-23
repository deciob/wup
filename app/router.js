(function(define) {
  return define([
    "backbone"
  ], function(Backbone) {

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
        console.log("welcome");
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