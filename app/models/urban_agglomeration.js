(function(define) {
  return define([
    "backbone"
  ], function(Backbone) {




    var City = Backbone.Model.extend({
      defaults: {
        title: '',
        completed: false
      }
    });
    
    var CityCollection = Backbone.Collection.extend({
      model: City,
    });


  });

})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
