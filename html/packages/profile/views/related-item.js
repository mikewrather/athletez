// related-item.js  
// -------  
// Requires `define`
// Return {ProfileRelatedItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/related-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileRelatedItemTemplate
        ) {

    var ProfileRelatedItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileRelatedItemView = BaseView.extend({

        tagName: "li",

        className: "profile-related",
          
        initialize: function (options) {
            this.template = profileRelatedItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },        
        
      });

    return ProfileRelatedItemView;
});