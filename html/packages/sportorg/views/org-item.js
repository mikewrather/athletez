// org-item.js  
// -------  
// Requires `define`
// Return {OrgListItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/org-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        orgItemTemplate
        ) {

    var OrgItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      OrgItemView = BaseView.extend({

        tagName: "li",

        className: "org",
          
        events: {
            "change #select-team": "selectTeam"
        },

        initialize: function (options) {
            this.template = orgItemTemplate;
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

    return OrgItemView;
});