// commenton-item.js  
// -------  
// Requires `define`
// Return {ProfileCommentOnItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/commenton-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileCommentOnItemTemplate
        ) {

    var ProfileCommentOnItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileCommentOnItemView = BaseView.extend({

        tagName: "li",

        className: "profile-commenton",
          
        initialize: function (options) {
            this.template = profileCommentOnItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileCommentOnItemView;
});