// team-item.js  
// -------  
// Requires `define`
// Return {TeamTeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!team/templates/team-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        teamTeamItemTemplate
        ) {

    var TeamTeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      TeamTeamItemView = BaseView.extend({

        tagName: "li",

        className: "team-team",
          
        initialize: function (options) {
            this.template = teamTeamItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamTeamItemView;
});