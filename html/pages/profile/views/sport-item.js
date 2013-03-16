// sport-item.js  
// -------  
// Requires `define`
// Return {ProfileSportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/sport-item.html',
        'user/collections/teams',
        'profile/views/team-list'
        ], 
function (
        vendor,
        views,
        utils,
        profileSportItemTemplate
        ) {

    var ProfileSportItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      ProfileTeamListView = require('profile/views/team-list'),
      ProfileTeamList = require('user/collections/teams');

      ProfileSportItemView = BaseView.extend({

        tagName: "li",

        className: "profile-sport",
        
        rendered: false,
        
        initialize: function (options) {
            this.template = profileSportItemTemplate;
            var self = this;
            function callback() {
                if (self.rendered)
                    return;
                self.rendered = true;
                self.initTeamList();
            }
            Channel('profilesports:select' + this.model.get('payload')['sport_id']).subscribe(callback);
        },
        
        initTeamList: function() {
            var self = this;
            this.teams = new ProfileTeamList();
            this.teams.id = this.model.get('id');
            this.teams.sport_id = this.model.get('payload')['sport_id'];
            this.teams.fetch();
            $.when(this.teams.request).done(function() {
                self.setupTeamListView();
                Channel('profileteams:fetch').publish();
            });
        },
        
        setupTeamListView: function() {
            var self = this,
                teamListView = new ProfileTeamListView({
                    collection: this.teams
                });
            
            function callback () {
                teamListView.render();
                self.$el.find('.teams-info').html(teamListView.el);                
            }
            Channel('profileteams:fetch').subscribe(callback);
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileSportItemView;
});