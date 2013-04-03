// teamroster-item.js  
// -------  
// Requires `define`
// Return {TeamRosterItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/teamroster-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        teamRosterItemTemplate
        ) {

    var TeamRosterItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      TeamRosterItemView = BaseView.extend({

        tagName: "li",

        className: "teamroster",
          
        initialize: function (options) {
            this.template = teamRosterItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamRosterItemView;
});