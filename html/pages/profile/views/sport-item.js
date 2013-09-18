// sport-item.js  
// -------  
// Requires `define`
// Return {SportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!profile/templates/sport-team.html',
        'profile/collections/teams',
        'sportorg/views/team-list'
        ], 
function (
        vendor,
        views,
        utils,
        sportItemTemplate
        ) {

    var ProfileSportItemView
      , $ = vendor.$
      , SectionView = views.SectionView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      TeamListView = require('sportorg/views/team-list'),
      TeamList = require('profile/collections/teams');

      ProfileSportItemView = SectionView.extend({

        tagName: "li",

        className: "sport",
        
        initialize: function (options) {
            this.template = sportItemTemplate;
            var self = this;
            this.id = options.model.collection.id;            
            var sport_id = this.model.get('payload')['sport_id'];
            
            function callback(sport_id) {
                self.initTeamList();
                Channel('refresh-profilepage').publish(sport_id);
            }
            
            routing.off("showTwmList");
            routing.on("showTwmList", function(sport_id) {
            	callback(sport_id);
            });
            
			//Channel('gamesports:select' + sport_id).subscribe(callback);
        },
        
        initTeamList: function() {
            var self = this, sport_id = $(".sports-h a.selected-sport-h").data("id");
            
            this.teams = new TeamList();
            this.teams.id = this.id;
            this.teams.sport_id = sport_id;
            this.teams.fetch();
            $.when(this.teams.request).done(function() {
                self.setupTeamListView();
            });
        },
        
        setupTeamListView: function() {
        	console.error(this.teams.toJSON());
        	var data = {};
        	data.records = this.teams.toJSON();
        	 var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
           // var self = this,
            //    teamListView = new TeamListView({
             //       collection: this.teams
              //  });
            
            //self.$el.find('.teams-info').html(teamListView.el);
            //teamListView.render();                        
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileSportItemView;
});