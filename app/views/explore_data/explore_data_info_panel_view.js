define([
  "backbone",
  'app/views/explore_data/explore_data_year_view',
  'app/views/explore_data/explore_data_controls_view',
], function(Backbone, ExploreDataYearView, ExploreDataControlsView) {

  return Backbone.View.extend({

    id: 'info_panel',

    initialize: function(config) {
      this.year = new ExploreDataYearView(config);
      this.controls = new ExploreDataControlsView(config);
      this.render();
    },
  
    render: function () {
      this.$el.empty();
      this.$el.append( this.year.$el );
      this.$el.append( this.controls.$el );
    },

    onClose: function () {
      this.year.close();
      this.controls.close();
    }
  
  });

});