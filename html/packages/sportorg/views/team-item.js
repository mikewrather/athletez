// team-item.js  
// -------  
// Requires `define`
// Return {TeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/team-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        teamItemTemplate
        ) {

    var TeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      TeamItemView = BaseView.extend({

        tagName: "li",

        className: "team",
          
        initialize: function (options) {
            this.template = teamItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamItemView;
});