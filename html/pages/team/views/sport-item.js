// sport-item.js  
// -------  
// Requires `define`
// Return {TeamSportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!team/templates/sport-item.html',
        'team/collections/teams',
        'team/views/team-list'
        ], 
function (
        vendor,
        views,
        utils,
        teamSportItemTemplate
        ) {

    var TeamSportItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      TeamTeamListView = require('team/views/team-list'),
      TeamTeamList = require('team/collections/teams');

      TeamSportItemView = BaseView.extend({

        tagName: "li",

        className: "team-sport",
        
        rendered: false,
        
        initialize: function (options) {
            this.template = teamSportItemTemplate;
            var self = this;
            function callback() {
                if (self.rendered)
                    return;
                self.rendered = true;
                self.initTeamList();
            }
            this.id = options.model.collection.id;
            Channel('teamsports:select' + this.model.get('payload')['sport_id']).subscribe(callback);
        },
        
        initTeamList: function() {
            var self = this;
            this.teams = new TeamTeamList();
            this.teams.id = this.id;
            this.teams.sport_id = this.model.get('payload')['sport_id'];
            this.teams.fetch();
            $.when(this.teams.request).done(function() {
                self.setupTeamListView();
                Channel('teamteams:fetch').publish();
            });
        },
        
        setupTeamListView: function() {
            var self = this,
                teamListView = new TeamTeamListView({
                    collection: this.teams
                });
            
            function callback () {
                teamListView.render();
                self.$el.find('.teams-info').html(teamListView.el);                
            }
            Channel('teamteams:fetch').subscribe(callback);
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamSportItemView;
});