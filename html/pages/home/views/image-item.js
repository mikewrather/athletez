// image-item.js  
// -------  
// Requires `define`
// Return {ImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!pages/home/templates/image-item.html'
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
        
        // Event handlers...
        events: {
            "click": "changeImage"
        },
        
        initialize: function (options) {
            this.template = imageItemTemplate;
        },

        render: function () {
	        console.log("Called Image Render",this.model);
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            
            this.$el.find('.image-outer-h').mouseover(function() {
            	$(this).find('.image-detail-view').css({'bottom': '0px'});
            });
            
            this.$el.find('.image-outer-h').mouseout(function() {
            	$(this).find('.image-detail-view').css({'bottom': '-92px'});
            });
            
            
            return this;
        },
        
        changeImage: function() {

            Channel('changeimage' + this.model.collection.id).publish(this.model);
        }        
        
      });

    return ImageItemView;
});