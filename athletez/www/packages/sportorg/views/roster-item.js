// roster-item.js  
// -------  
// Requires `define`
// Return {RosterItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/roster-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        rosterItemTemplate
        ) {

    var RosterItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      RosterItemView = BaseView.extend({

        tagName: "li",

        className: "roster",
          
        initialize: function (options) {
            this.template = rosterItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return RosterItemView;
});