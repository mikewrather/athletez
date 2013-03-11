// comment-item.js  
// -------  
// Requires `define`
// Return {ProfileCommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/comment-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileCommentItemTemplate
        ) {

    var ProfileCommentItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileCommentItemView = BaseView.extend({

        tagName: "li",

        className: "profile-comment",
          
        initialize: function (options) {
            this.template = profileCommentItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },        
        
      });

    return ProfileCommentItemView;
});