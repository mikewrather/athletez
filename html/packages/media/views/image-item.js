// image-item.js  
// -------  
// Requires `define`
// Return {ImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!media/templates/image-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        imageItemTemplate
        ) {

    var ImageItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ImageItemView = BaseView.extend({

        tagName: "li",

        className: "image",
        
        initialize: function (options) {
            this.template = imageItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ImageItemView;
});