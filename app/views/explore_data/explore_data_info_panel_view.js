define([
  "backbone",
  'app/views/explore_data/explore_data_help_view',
  'app/views/explore_data/explore_data_controls_view',
], function(Backbone, ExploreDataHelpView, ExploreDataControlsView) {

  return Backbone.View.extend({

    id: 'info_panel',

    initialize: function(config) {
      this.help = new ExploreDataHelpView(config);
      this.controls = new ExploreDataControlsView(config);
      this.render();
    },
  
    render: function () {
      this.$el.empty();
      this.$el.append( this.controls.$el );
      this.$el.append( this.help.$el );
    },

    onClose: function () {
      this.help.close();
      this.controls.close();
    }
  
  });

});