// videothumb-item.js  
// -------  
// Requires `define`
// Return {VideoThumbItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!media/templates/videothumb-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        videoThumbItemTemplate
        ) {

    var VideoThumbItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      VideoThumbItemView = BaseView.extend({

        tagName: "li",

        className: "videothumb",
          
        initialize: function (options) {
            this.template = videoThumbItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return VideoThumbItemView;
});