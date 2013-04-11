// video-item.js  
// -------  
// Requires `define`
// Return {VideoItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!media/templates/video-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        videoItemTemplate
        ) {

    var VideoItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      VideoItemView = BaseView.extend({

        tagName: "li",

        className: "video",
        
        // Event handlers...
        events: {
            "click": "changeVideo"
        },
          
        initialize: function (options) {
            this.template = videoItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }, 
        
        changeVideo: function() {
            Channel('changevideo' + this.model.collection.id).publish(this.model);
        }
        
      });

    return VideoItemView;
});