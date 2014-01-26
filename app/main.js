define([
  "jquery", 
  "backbone",
  "router", 
], function($, Backbone, Router) {

  return $(document).ready(function() {

    var mainRoute, applicatin_config;

    // http://goo.gl/J4pDrz
    Backbone.View.prototype.close = function () {
      this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

    applicatin_config = {
      data_path: "app/data/WUP2011-F11a-30_Largest_Cities.csv",
      initial_year: 1950
    };

    mainRoute = new Router(applicatin_config);
    return Backbone.history.start();

  });

});