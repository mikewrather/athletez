// fitnessbasic-item.js  
// -------  
// Requires `define`
// Return {ProfileFitnessBasicItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/profile/templates/fitnessbasic-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileFitnessBasicItemTemplate
        ) {

    var ProfileFitnessBasicItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileFitnessBasicItemView = BaseView.extend({

        tagName: "li",

        className: "profile-fitnessbasic",
          
        initialize: function (options) {
            this.template = profileFitnessBasicItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileFitnessBasicItemView;
});