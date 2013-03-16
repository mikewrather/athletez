// team-item.js  
// -------  
// Requires `define`
// Return {ProfileTeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/team-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileTeamItemTemplate
        ) {

    var ProfileTeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileTeamItemView = BaseView.extend({

        tagName: "li",

        className: "profile-team",
          
        initialize: function (options) {
            this.template = profileTeamItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileTeamItemView;
});