// image-item.js  
// -------  
// Requires `define`
// Return {ImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!registration/templates/fbimage-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        imageItemTemplate
        ) {

    var FBImageItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      FBImageItemView = BaseView.extend({

        tagName: "li",

        className: "image",
        
        // Event handlers...
        events: {
            "click": "changeImage"
        },
        
        initialize: function (options) {
            this.template = imageItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },
        
        changeImage: function() {
            Channel('changeimage' + this.model.collection.id).publish(this.model);
        }        
        
      });

    return FBImageItemView;
});