// competitorteam-item.js  
// -------  
// Requires `define`
// Return {CompetitorTeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/competitorteam-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        competitorTeamItemTemplate
        ) {

    var CompetitorTeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      CompetitorTeamItemView = BaseView.extend({

        tagName: "li",

        className: "team",
          
        initialize: function (options) {
            this.template = competitorTeamItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return CompetitorTeamItemView;
});