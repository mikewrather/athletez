// image-item.js  
// -------  
// Requires `define`
// Return {GameImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!game/templates/image-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        gameImageItemTemplate
        ) {

    var GameImageItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      GameImageItemView = BaseView.extend({

        tagName: "li",

        className: "game-image",
        
        initialize: function (options) {
            this.template = gameImageItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return GameImageItemView;
});