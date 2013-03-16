// commentof-item.js  
// -------  
// Requires `define`
// Return {ProfileCommentOfItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/commentof-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileCommentOfItemTemplate
        ) {

    var ProfileCommentOfItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileCommentOfItemView = BaseView.extend({

        tagName: "li",

        className: "profile-commentof",
          
        initialize: function (options) {
            this.template = profileCommentOfItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileCommentOfItemView;
});