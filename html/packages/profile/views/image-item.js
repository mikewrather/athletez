// image-item.js  
// -------  
// Requires `define`
// Return {ProfileImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/image-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileImageItemTemplate
        ) {

    var ProfileImageItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileImageItemView = BaseView.extend({

        tagName: "li",

        className: "profile-image",
        
        initialize: function (options) {
            this.template = profileImageItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },        
        
      });

    return ProfileImageItemView;
});