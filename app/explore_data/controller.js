(function(define) {
  return define([], function() {

    var Controller = function() {
      return this;
    };

    return Controller;

  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});