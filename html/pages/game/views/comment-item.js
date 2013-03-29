// commenton-item.js  
// -------  
// Requires `define`
// Return {GameCommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!game/templates/comment-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        gameCommentItemTemplate
        ) {

    var GameCommentItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      GameCommentItemView = BaseView.extend({

        tagName: "li",

        className: "game-comment",
          
        initialize: function (options) {
            this.template = gameCommentItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return GameCommentItemView;
});