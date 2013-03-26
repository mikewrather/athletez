// teamroster-item.js  
// -------  
// Requires `define`
// Return {GameTeamRosterItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!game/templates/teamroster-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        gameTeamRosterItemTemplate
        ) {

    var GameTeamRosterItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      GameTeamRosterItemView = BaseView.extend({

        tagName: "li",

        className: "game-teamroster",
          
        initialize: function (options) {
            this.template = gameTeamRosterItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return GameTeamRosterItemView;
});