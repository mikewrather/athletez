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
	            console.log("CALLED REFRESH PROFILE CHANNEL");
                Channel('refresh-profilepage').publish(sport_id);
            }
            
            routing.off("showTwmList");
            routing.on("showTwmList", function(sport_id) {
            	callback(sport_id);
            });
        },
        
        initTeamList: function() {
            var self = this, sports_id = $(".sports-h img.selected-sport-h").data("id");
            this.teams = new TeamList();
            this.teams.id = this.id;
            this.teams.sports_id = sports_id;
            this.teams.fetch();
            $.when(this.teams.request).done(function() {
	            console.log("TEAMS:",self.teams);
                self.setupTeamListView();
            });
        },
        
        setupTeamListView: function() {
        	var _self = this;
        	// if records are more then 2 then implement pagination
        	try {
	        	var firstRecord = this.teams.at(0);
	        	if(firstRecord.get("payload").sports[0])
	        		$(".teams h4").removeClass("hide");
	        	else
	        	    $(".teams h4").addClass("hide");
        	} catch(e) {
        	    $(".teams h4").addClass("hide");
        	}
        	
			if(this.teams.length > 2) {
				$(".see-more-teams-h").html("Show All "+this.teams.length);
				$(".see-more-teams-h").removeClass("hide");
				this.allSportsRecords = this.teams.toArray();	
				var record = this.allSportsRecords.slice(0, 2);
				this.teams.reset(record);
				$(".see-more-teams-h").click(function() {
					$(this).addClass("hide");
					_self.teams.reset(_self.allSportsRecords);
					_self.showTeamView();
				});
			} else {
				$(".see-more-teams-h").addClass("hide");
			}
			this.showTeamView();
        },
        
        showTeamView : function() {
        	var data = {};        	
        	data.records = this.teams.toJSON();
        	var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
        },

        render: function () {
            var _self = this, markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ProfileSportItemView;
});