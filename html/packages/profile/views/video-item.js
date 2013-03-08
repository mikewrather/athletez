// video-item.js  
// -------  
// Requires `define`
// Return {ProfileVideoItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/video-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileVideoItemTemplate
        ) {

    var ProfileVideoItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileVideoItemView = BaseView.extend({

        tagName: "li",

        className: "profile-video",
          
        initialize: function (options) {
            this.template = profileVideoItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },        
        
      });

    return ProfileVideoItemView;
});