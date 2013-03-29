// videothumb-item.js  
// -------  
// Requires `define`
// Return {GameVideoThumbItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!game/templates/videothumb-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        gameVideoThumbItemTemplate
        ) {

    var GameVideoThumbItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      GameVideoThumbItemView = BaseView.extend({

        tagName: "li",

        className: "game-videothumb",
          
        initialize: function (options) {
            this.template = gameVideoThumbItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return GameVideoThumbItemView;
});