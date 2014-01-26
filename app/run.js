requirejs.config({
  baseUrl: '/app/',
  paths: {
    d3: '../lib/d3/d3',
    jquery: '../lib/jquery/jquery',
    chart: 'lib/nightcharts',
    backbone: '../lib/backbone/index',
    underscore: '../lib/lodash/dist/lodash',
    text : "../lib/requirejs-text/text"
  },
  shim: {
    d3: {
      exports: 'd3'
    }
  }
});

requirejs(['main']);