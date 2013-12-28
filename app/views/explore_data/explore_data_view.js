define([
  'backbone',
  'app/views/explore_data/explore_data_header_view',
  'app/views/explore_data/explore_data_bar_view',
  'app/views/explore_data/explore_data_info_panel_view'
], function(Backbone, ExploreDataHeaderView, ExploreDataBarView, ExploreDataInfoPanelView) {

  return Backbone.View.extend({

    id: 'explore_data',

    initialize: function(config) {
      this.config = config;
      this.header = new ExploreDataHeaderView(config);
      this.bar = new ExploreDataBarView(config);
      this.info_panel = new ExploreDataInfoPanelView(config);
    },
    
    render: function () {
      this.$el.empty();
      this.$el.append( this.header.$el );
      this.$el.append( this.bar.$el );
      this.$el.append( this.info_panel.$el );
    },

    onClose: function () {
      this.header.close();
      this.bar.close();
      this.info_panel.close();
    }
  
  });

});