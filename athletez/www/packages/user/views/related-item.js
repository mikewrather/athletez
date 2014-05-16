// related-item.js  
// -------  
// Requires `define`
// Return {ProfileRelatedItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!user/templates/related-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        relatedItemTemplate
        ) {

    var RelatedItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      RelatedItemView = BaseView.extend({

        tagName: "li",

        className: "related",
          
        initialize: function (options) {
            this.template = relatedItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return RelatedItemView;
});