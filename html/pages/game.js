// Game Controller
// ---------------
// module as controller for 'game' package
// Returns {GameController} constructor

define([
	"require",
	"text!game/templates/layout.html",
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
	"profile/collections/commentson",

	"game/views/header",
	"game/views/add-media",
	"game/views/commenton-list",
	"sportorg/views/teamroster-list",
	"game/views/video-list",
	"game/views/image-list",
	"game/views/comment-list",
	"game/views/commenton-list"

], function (require, pageLayoutTemplate)
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
		GameCommentOnList = require("profile/collections/commentson"),
		
		GameHeaderView = require("game/views/header"),
		GameAddMediaView = require("game/views/add-media"),
		GameTeamRosterListView = require("sportorg/views/teamroster-list"),
		GameVideoListView = require("game/views/video-list"),
		GameImageListView = require("game/views/image-list"),
		GameCommentListView = require("game/views/comment-list"),
		GameCommentOnListView = require("game/views/commenton-list"),
		MediaImageModel = require("media/models/image"),

		LayoutView = views.LayoutView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		Channel = utils.lib.Channel,
		cssArr = [
			"/pages/game/game.css"
		];

	GameController = Controller.extend({

		initialize: function (options) {
			Channel('load:css').publish(cssArr);

			_.bindAll(this);

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

			this.teamrosters = new GameTeamRosterList();
			this.teamrosters.id = this.id;
			this.teamrosters.fetch();

			this.videos = new GameVideoList();
			this.videos.id = this.id;
			this.videos.fetch();

			this.images = new GameImageList();
			this.images.id = this.id;
			this.images.fetch();

			//this.comments = new GameCommentList();
			//this.comments.id = this.id;
			//this.comments.fetch();
			
			this.commentson = new GameCommentOnList();
			this.commentson.id = this.userId;
			this.commentson.fetch();
		},

		handleDeferreds: function () {
			var controller = this;

			$.when(this.basics.request).done(function () {
				controller.setupHeaderView();
				controller.setupAddMediaView();
			});

			$.when(this.teamrosters.request).done(function () {
				controller.setupTeamRosterListView();
			});

			$.when(this.videos.request).done(function () {
				controller.setupVideoListView();
			});

			$.when(this.images.request).done(function () {
				controller.setupImageListView();
			});

			//$.when(this.comments.request).done(function () {
			//	controller.setupCommentListView();
			//})
			
			$.when(this.commentson.request).done(function () {
				controller.setupCommentsOnListView();
			})
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
			var teamRosterListView;

			teamRosterListView = new GameTeamRosterListView({
				collection: this.teamrosters,
				destination: "#roster-wrap"
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
			var imageListView;

			imageListView = new GameImageListView({
				collection: this.images,
				destination: "#image-wrap"
			});

			this.imageListView = imageListView;

			Channel('image-upload-success').subscribe(this.updateImages);

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
