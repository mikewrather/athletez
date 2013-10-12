// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
	"require",
	"text!game/templates/layout.html",
	 'votes/views/vote',
	"facade",
	"controller",
	"models",
	"views",
	"utils",

	"game/models/basics",
	"game/models/addmedia",
	"game/collections/teamrosters",
	"game/collections/videos",
	"game/collections/images",
	"game/collections/comments",
	"game/collections/commentson",
	"game/views/header",
	"game/views/add-media",
	"game/views/commenton-list",
	"sportorg/views/teamroster-list",
	"game/views/video-list",
	"profile/views/image-video-list",
	"game/views/comment-list",
	"game/views/commenton-list",
	"roster/views/roster"

], function (require, pageLayoutTemplate, voteView)
{
	var GameController,
		facade = require("facade"),
		Controller = require("controller"),
		models = require("models"),
		views = require("views"),
		utils = require("utils"),

		GameBasicsModel = require("game/models/basics"),
		GameAddMediaModel = require("game/models/addmedia"),
		GameTeamRosterList = require("game/collections/teamrosters"),
		GameVideoList = require("game/collections/videos"),
		GameImageList = require("game/collections/images"),
		GameCommentList = require("game/collections/comments"),
		GameCommentOnList = require("game/collections/commentson"),
		
		GameHeaderView = require("game/views/header"),
		GameAddMediaView = require("game/views/add-media"),
		GameTeamRosterListView = require("sportorg/views/teamroster-list"),
		GameVideoListView = require("game/views/video-list"),
		ProfileImageListView = require("profile/views/image-video-list"),
		GameCommentListView = require("game/views/comment-list"),
		GameCommentOnListView = require("game/views/commenton-list"),
		MediaImageModel = require("media/models/image"),
		RosterView = require("roster/views/roster"),

		LayoutView = views.LayoutView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		Channel = utils.lib.Channel,
		cssArr = [
			"/pages/game/game.css"
		];

	GameController = Controller.extend({
		rosterViewsCount: 0,
		initialize: function (options) {
			Channel('load:css').publish(cssArr);
			_.bindAll(this);
			 this.scheme = [];
			this.handleOptions(options);
			this.init();
			return this;
		},

		handleOptions: function (options) {
			this.id = options.gameId;
			this.userId = options.userId;
		},

		init: function () {
			this.setupLayout().render();
			this.createData();
			this.handleDeferreds();
		},

		createData: function () {
			this.basics = new GameBasicsModel({id: this.id});
			//this.basics.id = '425983';
			this.basics.fetch();
			//this.id = this.basics.id;

			this.addmedia = new GameAddMediaModel();
			this.addmedia.id = this.id;

			//this.teamrosters = new GameTeamRosterList();
			//this.teamrosters.id = this.id;
			//this.teamrosters.fetch();

			//this.videos = new GameVideoList();
			//this.videos.id = this.id;
			//this.videos.fetch();

			//this.comments = new GameCommentList();
			//this.comments.id = this.id;
			//this.comments.fetch();
			
			//this.commentson = new GameCommentOnList();
			//this.commentson.id = this.id;
			//this.commentson.fetch();
		},

		handleDeferreds: function () {
			var controller = this;

			$.when(this.basics.request).done(function () {
				controller.setupHeaderView();
				//controller.initVoteView();
				controller.setupAddMediaView();
				
				var data = controller.basics.get("payload"), subject_type_id = data.enttypes_id;
				controller.images = new GameImageList();
				controller.images.id = controller.id;
				controller.images.fetch();
				
				var teams = data.teams, teamLength = (teams)?teams.length:0;
				for(var i = 0; i < teamLength; i++) {
					controller.setupRosterView(teams[i].id, teams[i].org_sport_link_obj.org.name);
				}
				
				controller.commentson = new GameCommentOnList();
				controller.commentson.subject_entity_type = subject_type_id;
				controller.commentson.id = controller.id;
				controller.commentson.fetch();
				
				$.when(controller.commentson.request).done(function () {
					controller.setupCommentsOnListView();
				});
				
				$.when(controller.images.request).done(function () {
					controller.setupImageListView();
				});
			});

			//$.when(this.teamrosters.request).done(function () {
			//	controller.setupTeamRosterListView();
			//});

			//$.when(this.videos.request).done(function () {
			//	controller.setupVideoListView();
			//});

			//$.when(this.images.request).done(function () {
			//	controller.setupImageListView();
			//});

			//$.when(this.comments.request).done(function () {
			//	controller.setupCommentListView();
			//})
			
			//$.when(this.commentson.request).done(function () {
			//	controller.setupCommentsOnListView();
			//});
		},
		
		// intialize vote view
        initVoteView: function() {
    	  var voteButtonsView = new voteView({
                name: "vote View",
                destination: '#votes-area-h',
                model: this.basics,
                userId: this.id
           });
           this.scheme.push(voteButtonsView);
           this.layout.render();
        },
        
        setupRosterView: function(id, name) {
			if(!$("#roster_wrap_"+this.rosterViewsCount).length) {
				$("#roster-wrap").append('<div id="roster_wrap_'+this.rosterViewsCount+'" class="clear"></div>');
			}
        	var rosterView, model = facade.Backbone.Collection.extend({});
			rosterView = new RosterView({
				model: new model(),
				team_id: id,
				team_name: name,
				name: "roster images" + Math.random() * Math.random(),
				destination: "#roster_wrap_"+this.rosterViewsCount
			});

			this.scheme.push(rosterView);
			this.layout.render();
			this.rosterViewsCount++;
        },

		setupHeaderView: function () {
			var headerView;
			headerView = new GameHeaderView({
				model: this.basics,
				name: "Header",
				destination: "#main-header"
			});

			this.scheme.push(headerView);
			this.layout.render();
		},

		setupAddMediaView: function () {
			var addMediaView;

			addMediaView = new GameAddMediaView({
				model: this.addmedia,
				name: "Add Media",
				destination: "#add-media"
			});
			addMediaView.game_model = this.basics;

			this.scheme.push(addMediaView);
			this.layout.render();
		},

		setupTeamRosterListView: function () {
			alert($("#roster_wrap_"+this.rosterViewsCount).length);
			if(!$("#roster_wrap_"+this.rosterViewsCount).length) {
				$("#roster-wrap").append('<div id="#roster_wrap_'+this.rosterViewsCount+'" class="clear"></div>');
			}
			
			var teamRosterListView;
			teamRosterListView = new ProfileImageListView({
				collection: this.teamrosters,
				name: "roster images",
				destination: "#roster_wrap_"+this.rosterViewsCount
			});
			
			this.scheme.push(teamRosterListView);
			this.layout.render();
			this.rosterViewsCount++;
		},
		
		setupTeamRosterSecondListView: function () {
			var teamRosterListView;
			teamRosterListView = new ProfileImageListView({
				collection: this.teamrostersSecond,
				name: "roster roster second images",
				destination: "#roster-second-wrap"
			});
			this.scheme.push(teamRosterListView);
			this.layout.render();
		},

		setupVideoListView: function () {
			var videoListView;

			videoListView = new GameVideoListView({
				collection: this.videos,
				destination: "#video-wrap"
			});

			this.scheme.push(videoListView);
			this.layout.render();
		},

		setupImageListView: function () {
			var self = this, imageListView;
			imageListView = new ProfileImageListView({
				collection: this.images,
				name: "image list",
				target_id : this.id,
				destination: "#image-wrap"
			});
			this.imageListView = imageListView;
			//Channel('image-upload-success').subscribe(this.updateImages);
			routing.on('image-upload-success', function(data) { 
        			self.updateImages(data);
        	});
			this.scheme.push(imageListView);
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

		setupCommentListView: function () {
			/*var commentListView;

			commentListView = new GameCommentListView({
				collection: this.comments,
				destination: "#comment-wrap"
			});

			this.scheme.push(commentListView);
			this.layout.render();*/
		},
		
		setupCommentsOnListView: function() {
			var commentListView;
			commentListView = new GameCommentOnListView({
				collection: this.commentson,
				destination: ".commentson-outer-box-h",
				name: "games comment on view"
			});

			this.scheme.push(commentListView);
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

	return GameController;
});
