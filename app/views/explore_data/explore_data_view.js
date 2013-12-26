define([
  'backbone',
  'app/views/explore_data/explore_data_bar_view',
  'app/views/explore_data/explore_data_info_panel_view',
  'text!app/templates/explore_data_template.html'
], function(Backbone, ExploreDataBarView, ExploreDataInfoPanelView, template) {

  return Backbone.View.extend({

    id: 'explore_data',

    tpl: _.template( template ),

    initialize: function(config) {
      this.config = config;
      this.bar = new ExploreDataBarView(config);
      this.info_panel = new ExploreDataInfoPanelView(config);
    },
    
    render: function () {
      this.$el.html( this.tpl() );
      this.$el.append( this.bar.$el );
      this.$el.append( this.info_panel.$el );
    },

    onClose: function () {
      this.bar.close();
      this.info_panel.close();
    }
  
  });

});