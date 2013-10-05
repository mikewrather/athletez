// Team Controller
// ---------------
// module as controller for 'team' package
// Returns {TeamController} constructor

define([
    "require",
    "text!team/templates/layout.html",
    'votes/views/vote',
     
     
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    
    "team/models/basics",
    "team/models/addmedia",
    "team/collections/upcoming_schedules",
    "team/collections/recent_schedules",
    "team/collections/competitor_teams",
    "team/collections/rosters",
    "team/collections/videos",
    "team/collections/images",
    "team/collections/comments",
    "profile/collections/commentsof",
	"team/collections/commentson",
	"team/collections/orgs",
	"team/collections/fans",
    
    "team/views/header",
    "team/views/add-media",
    "sportorg/views/schedule-list",
    "sportorg/views/competitorteam-list",
    "team/views/commentof-list",
	"team/views/commenton-list",
    "sportorg/views/roster-list",
    "team/views/video-list",
    "team/views/image-list",
    "team/views/comment-list",
    "team/views/menu",
    "media/models/image",
    "sportorg/views/team-list",
    "roster/views/roster",
    "profile/views/fans-image-list"
    
    ], function (require, pageLayoutTemplate, voteView) {

    var TeamController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        TeamBasicsModel = require("team/models/basics"),
        TeamAddMediaModel = require("team/models/addmedia"),
        TeamUpcomingScheduleList = require("team/collections/upcoming_schedules"),
        TeamRecentScheduleList = require("team/collections/recent_schedules"),
        TeamCompetitorTeamList = require("team/collections/competitor_teams"),
        TeamOrgList = require("team/collections/orgs"),
        TeamVideoList = require("team/collections/videos"),
        TeamImageList = require("team/collections/images"),
        FansImageList = require("team/collections/fans"),
        TeamCommentList = require("team/collections/comments"),
        TeamCommentOfList = require("profile/collections/commentsof"),
		TeamCommentOnList = require("team/collections/commentson"),
        TeamHeaderView = require("team/views/header"),
        TeamAddMediaView = require("team/views/add-media"),
        TeamOrgListView = require("sportorg/views/team-list"),
        TeamScheduleListView = require("sportorg/views/schedule-list"),
        TeamCompetitorTeamListView = require("sportorg/views/competitorteam-list"),
        TeamVideoListView = require("team/views/video-list"),
        TeamImageListView = require("team/views/image-list"),
        TeamRosterListView = require("sportorg/views/teamroster-list"),
        TeamCommentListView = require("team/views/comment-list"),
        TeamCommentOfListView = require("team/views/commentof-list"),
		TeamCommentOnListView = require("team/views/commenton-list"),
		FansImageListView = require("profile/views/fans-image-list"),
		MenuPageView = require("team/views/menu"),
		RosterView = require("roster/views/roster"),
        MediaImageModel = require("media/models/image");
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/pages/team/team.css"
        ];

    TeamController = Controller.extend({

        initialize: function (options) {
            Channel('load:css').publish(cssArr);
            _.bindAll(this);
            this.scheme = [];
            this.handleOptions(options);
            
            this.init();
            return this;
        },
        
        handleOptions: function(options) {
        	this.id = options.teamId;
        	this.userId = options.userId;
        },
        
        init: function() {
            this.setupLayout().render();
            this.createData();
            this.handleDeferreds();            
        },
        
        createData: function () {
            this.basics = new TeamBasicsModel({id:this.id});
            this.basics.fetch();
            this.addmedia = new TeamAddMediaModel();
            this.addmedia.id = this.id;
            
            var controller = this;
            
            function callback(sport_id, team_id, season_id) {
                controller.refreshPage();
                controller.games = new TeamOrgList();
				controller.games.id = team_id;
				controller.games.sport_id = sport_id;
				controller.games.fetch();
                
                
                controller.images = new TeamImageList();
                controller.images.team_id = team_id;
                controller.images.sport_id = sport_id;
                controller.images.fetch();
               
                controller.fans = new FansImageList();
				controller.fans.id = team_id;
				controller.fans.sport_id = sport_id;
				controller.fans.fetch();
               
                var subject_type_id = controller.basics.get("payload").enttypes_id;
	        	controller.commentson = new TeamCommentOnList();
	        	controller.commentson.subject_entity_type = subject_type_id;
	        	controller.commentson.savePath = "/team/addcomment/"+team_id;
				controller.commentson.id = team_id;
				controller.commentson.fetch();
                controller.handleDeferredsDynamic();
            }
            
            routing.on('refresh-teampage', function(sport_id, team_id,season_id) {
            	callback(sport_id, team_id, season_id);
            });
            
        },
        
        handleDeferreds: function() {
            var controller = this;
            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();  
				controller.setupRosterView();
                controller.setupAddMediaView();
            });
        },
        
        setupCommentOfListView: function () {
			var commentOfListView;
			commentOfListView = new TeamCommentOfListView({
				collection: this.commentsof,
				destination: ".commentsoff-outer-box-h",
				name: "team comments off view"
			});
		},
		
		deleteOldView: function(oldView) {
			var l = this.scheme.length;
			for(var i = 0; i < l; i++) {
				if(this.scheme[i].name == oldView)
					this.scheme[i].remove();
			}
		},
		
		 setupRosterView: function(id, name) {
		 	
		 	if(!id && !name) {
		 		var payload = this.basics.get("payload"), id = payload.id,
		 		name = payload.org_sport_link_obj.org.name;
		 	}
		 	
		 	if(this.oldRosterViewName)
		 		this.deleteOldView(this.oldRosterViewName);
		 	
		 	this.oldRosterViewName = "roster images" + Math.random();
		 	
        	var rosterView, model = facade.Backbone.Collection.extend({});
			rosterView = new RosterView({
				model: new model(),
				team_id: id,
				team_name: name,
				name: this.oldRosterViewName,
				destination: "#roster-wrap"
			});

			this.scheme.push(rosterView);
			this.layout.render();
        },

		setupCommentOnListView: function () {
				this.commentOnListView = new TeamCommentOnListView({
					collection: this.commentson,
					destination: ".commentson-outer-box-h",
					name: "team comments on view "			
				});
				this.scheme.push(this.commentOnListView);
				this.layout.render();
			
		},
        
        refreshPage: function() {
            var position;
            
            if (this.commentOnListView) {
            	this.commentOnListView.unbind().remove();
                $(this.commentOnListView.destination).unbind().html('');
                position = $.inArray(this.commentOnListView, this.scheme);
                
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.gamesView) {
                $(this.gamesView.destination).html('');
                position = $.inArray(this.gamesView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.fansListView) {
                $(this.fansListView.destination).html('');
                position = $.inArray(this.fansListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.imageListView) {
                $(this.imageListView.destination).html('');
                position = $.inArray(this.imageListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            
        },
        
        handleDeferredsDynamic: function() {
            var controller = this;
            
             $.when(controller.commentson.request).done(function () {
					controller.setupCommentOnListView();
			});
			
			 $.when(controller.games.request).done(function () {
					controller.setupGameView();
			});
			$.when(controller.fans.request).done(function (x) {
					controller.setupFansListView();
			});
			
            $.when(this.images.request).done(function () {
                controller.setupImages();
            });
            
        },
        
        setupFansListView: function () {
				this.fansListView = new FansImageListView({
					collection: this.fans,
					destination: "#fans-div",
					//model: Backbone.Model.extend(),
					name: "fans View"
				});

				this.scheme.push(this.fansListView);
				this.layout.render();
			},
        
        setupHeaderView: function() {
            var headerView, _self = this;
            headerView = new TeamHeaderView({
                model: this.basics,
                name: "Header",
                controllerObject:  _self,
                destination: "#main-header" 
            });
            
           var  menuView = new MenuPageView({
                model: this.basics,
                name: "Menu View",
                headerView: headerView,
                controllerObject:  _self,
                destination: "#menu-container" 
            });
            
            this.scheme.push(menuView);            

            this.scheme.push(headerView);            
            this.layout.render();
        },
        
        setupAddMediaView: function() {
            var addMediaView;
            console.error("add media model");
            console.error(this.addmedia.toJSON());
            addMediaView = new TeamAddMediaView({
                model: this.addmedia,
                team_id: this.basics.id,
                name: "Add_Media",
                destination: "#add-media"
            });
            
            this.scheme.push(addMediaView);
            this.layout.render();
        },
        
        setupUpcomingSchedules: function() {
            var UpcomingScheduleListView;
            UpcomingScheduleListView = TeamScheduleListView.extend({
                name: "Upcoming_Schedule_List" 
            });
            this.upcomingScheduleListView = new UpcomingScheduleListView({
                collection: this.upcoming_schedules,
                destination: "#upcoming-schedule",
                name: "upcoming_schedule"
            });
            
            this.scheme.push(this.upcomingScheduleListView);
            this.layout.render();
        },
        
        setupRecentSchedules: function() {
            var RecentScheduleListView;
            RecentScheduleListView = TeamScheduleListView.extend({
                name: "Recent_Schedule_List" 
            });
            this.recentScheduleListView = new RecentScheduleListView({
                collection: this.recent_schedules,
                destination: "#recent-schedule",
                name: "recent_schedule"
            });
            
            this.scheme.push(this.recentScheduleListView);
            this.layout.render();
        },
        
        setupGameView: function () {
	        console.log("Setting up game view",this.games, this.id);
			this.gamesView = new TeamOrgListView({
				teams_id: this.id,
				collection: this.games,
				destination: "#games_div",
				name: "games view"
			});

			this.scheme.push(this.gamesView);
			this.layout.render();
		},
        
        setupCompetitorTeams: function() {
            this.competitorTeamListView = new TeamCompetitorTeamListView({
                collection: this.competitor_teams,
                destination: "#competitor-teams",
                name: "competitor_teams"
            });
            
            this.scheme.push(this.competitorTeamListView);
            this.layout.render();
        },
        
        setupRosters: function() {
            this.rosterListView = new TeamRosterListView({
                collection: this.rosters,
                destination: "#roster-wrap",
                name: "roster_wrap"
            });
            
            this.scheme.push(this.rosterListView);
            this.layout.render();
        },
        
        setupVideos: function() {
            this.videoListView = new TeamVideoListView({
                collection: this.videos,
                destination: "#video-wrap",
                name: "video_wrap"
            });
            
            this.scheme.push(this.videoListView);
            this.layout.render();
        },
        
        // intialize vote view
        initVoteView: function() {
        	alert("init");
    	  var voteButtonsView = new voteView({
                name: "vote View",
                destination: '#votes-area-h',
                model: this.basics,
                userId: this.id
           });
           this.scheme.push(voteButtonsView);
           this.layout.render();
        },
        
        setupImages: function(data) {
        	var self = this;
        	routing.on('image-upload-success', function(data) { 
        		self.updateImages(data);
        	});
        	
            this.imageListView = new TeamImageListView({
                collection: this.images,
                destination: "#image-wrap",
                name: "image_wrap "
            });
            
            this.scheme.push(this.imageListView);
            this.layout.render();
        },
        
        
        updateImages: function (data) {
				//create new image model to hold newly uploaded image
				var newImageModel = new MediaImageModel();

				//set the model to use the data from the new image
				newImageModel.processItemFromPayload(data);

				//select the image list view's display type and
				//by setting the url to the correct one of its types
				newImageModel.selectImageType(this.imageListView.imagetype);

				//add the model to the view's collection
				this.imageListView.collection.add(newImageModel);
			},
        
        setupComments: function() {
            this.commentListView = new TeamCommentListView({
                collection: this.comments,
                destination: "#comment-wrap",
                name: "comment_wrap" 
            });
            this.scheme.push(this.commentListView);
            this.layout.render();
        },
                        
        setupLayout: function () {
            var pageLayout;
            pageLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
                template: pageLayoutTemplate,
                displayWhen: "ready"
            });
            
            this.layout = pageLayout;

            return this.layout;
        }
        
       

    });

    return TeamController;
});
