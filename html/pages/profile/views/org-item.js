// org-item.js  
// -------  
// Requires `define`
// Return {ProfileOrgListItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/org-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        profileOrgItemTemplate
        ) {

    var ProfileOrgItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ProfileOrgItemView = BaseView.extend({

        tagName: "li",

        className: "profile-org",
          
        events: {
            "change #select-team": "selectTeam"
        },

        initialize: function (options) {
            this.template = profileOrgItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            this.select_team = this.$('#select-team');
            this.selectTeam();
            return this;
        },
        
        selectTeam: function(event) {
            var team_id = this.select_team.val();
            this.$('.team-info').stop().slideUp();
            this.$('.team-info-' + team_id).stop().slideDown();
        }

      });

    return ProfileOrgItemView;
});