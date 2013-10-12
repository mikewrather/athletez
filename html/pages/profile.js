// Profile Controller
// ---------------
// module as controller for 'profile' package
// Returns {ProfileController} constructor

define([
	"require",
	"text!profile/templates/layout.html",
	"application",
	'votes/views/vote',
	"facade",
	"controller",
	"models",
	"views",
	"utils",
	//"packages",

	"profile/models/basics",
	"profile/models/addmedia",
	"profile/collections/orgs",
	"profile/collections/relateds",
	"profile/collections/fitnessbasics",
	"profile/collections/videos",
	"profile/collections/image-videos",
	"profile/collections/commentsof",
	"profile/collections/commentson",
	"profile/collections/fans",
	"profile/views/header",
	"profile/views/add-media",
	//"schedules/views/schedule-list",
	"user/views/related-list",
	"user/views/fitnessbasic-list",
	"profile/views/video-list",
	"profile/views/image-video-list",
	"profile/views/commentof-list",
	"profile/views/commenton-list",
	"profile/views/fans-image-list",
	"application"
],
	function (require, pageLayoutTemplate, app, voteView) {
console.log(app);
		var ProfileController,
			facade = require("facade"),
			Controller = require("controller"),
			models = require("models"),
			views = require("views"),
			utils = require("utils"),
			ProfileBasicsModel = require("profile/models/basics"),
			ProfileAddMediaModel = require("profile/models/addmedia"),
			ProfileOrgList = require("profile/collections/orgs"),
			ProfileRelatedList = require("profile/collections/relateds"),
			ProfileFitnessBasicList = require("profile/collections/fitnessbasics"),
			ProfileImageList = require("profile/collections/image-videos"),
			//ProfileImageList = require("profile/collections/images"),
			ProfileCommentOfList = require("profile/collections/commentsof"),
			ProfileCommentOnList = require("profile/collections/commentson"),
			FansImageList = require("profile/collections/fans"),
			
			ProfileHeaderView = require("profile/views/header"),
			ProfileAddMediaView = require("profile/views/add-media"),
			//ProfileOrgListView = require("schedules/views/schedule-list"),
			ProfileRelatedListView = require("user/views/related-list"),
			ProfileFitnessBasicListView = require("user/views/fitnessbasic-list"),
			ProfileImageListView = require("profile/views/image-video-list"),
			//ProfileImageListView = require("profile/views/image-list"),
			ProfileCommentOfListView = require("profile/views/commentof-list"),
			ProfileCommentOnListView = require("profile/views/commenton-list"),
			FansImageListView = require("profile/views/fans-image-list"),
			
			MediaImageModel = require("media/models/image");

		LayoutView = views.LayoutView,
			$ = facade.$,
			_ = facade._,
			debug = utils.debug,
			Channel = utils.lib.Channel,
			cssArr = [
				"/pages/profile/profile.css"
			];

		ProfileController = Controller.extend({
			
			initialize: function (options) {
				
				var self = this;
				debug.log("start initialize");
				Channel('load:css').publish(cssArr);
				_.bindAll(self);
				self.handleOptions(options);
				self.scheme = [];
				if (options.userId) {
					debug.log(options.userId);
					self.id = options.userId;
					self.init();
				}
				else {
					self.init();
				}
				return self;
			},


			init: function () {
				this.setupLayout().render();
				this.createData();
				this.handleDeferreds();
			},

			createData: function () {
				this.basics = new ProfileBasicsModel({id: this.id});
				this.basics.id = this.id;
				this.basics.fetch();

				this.addmedia = new ProfileAddMediaModel();
				this.addmedia.id = this.id;

				//this.commentsof = new ProfileCommentOfList();
				//this.commentsof.id = this.id;
				//this.commentsof.fetch();

				
		
				this.fans = new FansImageList();
				this.fans.id = this.id;
				this.fans.fetch();
				
				//this.images = new ProfileImageList();
				//this.images.id = this.id;
				//this.images.fetch();

				// I added this in here even though it might not be the best place for it.
				// If I take it out it won't render images if no sport is selected

				var controller = this;

				function callback(sport_id) {
					controller.refreshPage();

					controller.orgs = new ProfileOrgList();
					controller.orgs.id = controller.id;
					controller.orgs.sport_id = sport_id;
					controller.orgs.fetch();

					controller.relateds = new ProfileRelatedList();
					controller.relateds.id = controller.id;
					controller.relateds.sport_id = sport_id;
					controller.relateds.fetch();

					controller.fitnessbasics = new ProfileFitnessBasicList();
					controller.fitnessbasics.id = controller.id;
					controller.fitnessbasics.sport_id = sport_id;
					controller.fitnessbasics.fetch();

					//controller.videos = new ProfileVideoList();
					//controller.videos.id = controller.id;
					//controller.videos.sport_id = sport_id;
					//controller.videos.fetch();

					controller.images = new ProfileImageList();
					controller.images.id = controller.id;
					controller.images.sport_id = sport_id;
					controller.images.fetch();
					
					

					controller.handleDeferredsDynamic();
				}

				function refreshFans()
				{
					controller.fans = new FansImageList();
					controller.fans.id = controller.id;
					controller.fans.fetch();
					$.when(controller.fans.request).done(function (x) {
						if (controller.fansListView) {
							$(controller.fansListView.destination).html('');
							position = $.inArray(controller.fansListView, controller.scheme);
							if (~position) controller.scheme.splice(position, 1);
						}
						controller.setupFansListView();
					});
				}
				Channel('new-fan').subscribe(refreshFans);
				Channel('refresh-profilepage').subscribe(callback);
			},

			handleDeferreds: function () {
				var controller = this;

				$.when(this.basics.request).done(function () {
					controller.setupHeaderView();
					controller.initVoteView();
					controller.setupAddMediaView();

					var subject_type_id = controller.basics.get("payload").enttypes_id;
					controller.commentson = new ProfileCommentOnList();
					controller.commentson.subject_entity_type = subject_type_id;
					controller.commentson.id = controller.id;
					controller.commentson.fetch();
					$.when(controller.commentson.request).done(function () {
						controller.setupCommentOnListView();
					});
					
				});

				//$.when(this.commentsof.request).done(function () {
				//	controller.setupCommentOfListView();
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

			handleDeferredsDynamic: function () {
				var controller = this;

				$.when(this.orgs.request).done(function () {
				 	controller.setupOrgListView();
				});

				$.when(this.relateds.request).done(function () {
					controller.setupRelatedListView();
				});

				$.when(this.fitnessbasics.request).done(function () {
					controller.setupFitnessBasicListView();
				});

				//$.when(this.videos.request).done(function () {
				//	controller.setupVideoListView();
				//});
				
				$.when(this.fans.request).done(function (x) {
					controller.setupFansListView();
				});

				$.when(this.images.request).done(function (x) {
					//console.log("Images Ready (called in profile.js handleDeferredDynamic)",x);
					controller.setupImageListView();
				});
				
				
			},

			refreshPage: function () {
				var position;

				if (this.orgListView) {
					$(this.orgListView.destination).html('');
					position = $.inArray(this.orgListView, this.scheme);
					if (~position) this.scheme.splice(position, 1);
				}

				if (this.relatedListView) {
					$(this.relatedListView.destination).html('');
					position = $.inArray(this.relatedListView, this.scheme);
					if (~position) this.scheme.splice(position, 1);
				}

				if (this.fitnessBasicListView) {
					$(this.fitnessBasicListView.destination).html('');
					position = $.inArray(this.fitnessBasicListView, this.scheme);
					if (~position) this.scheme.splice(position, 1);
				}

				//if (this.videoListView) {
				//	$(this.videoListView.destination).html('');
				//	position = $.inArray(this.videoListView, this.scheme);
				//	if (~position) this.scheme.splice(position, 1);
				//}

				if (this.imageListView) {
					$(this.imageListView.destination).html('');
					position = $.inArray(this.imageListView, this.scheme);
					if (~position) this.scheme.splice(position, 1);
				}
				
				if (this.fansListView) {
					$(this.fansListView.destination).html('');
					position = $.inArray(this.fansListView, this.scheme);
					if (~position) this.scheme.splice(position, 1);
				}
			},

			setupHeaderView: function () {
				var headerView;

				headerView = new ProfileHeaderView({
					model: this.basics,
					name: "Header",
					destination: "#main-header"
				});

				this.scheme.push(headerView);
				this.layout.render();
			},

			setupAddMediaView: function () {
				var addMediaView;

				addMediaView = new ProfileAddMediaView({
					model: this.addmedia,
					name: "Add Media",
					destination: "#add-media",
					"userid": this.id
				});
				for (var x in this.scheme) {
					if (this.scheme[x].id == "add-media") delete this.scheme[x];
				}
				this.scheme.push(addMediaView);
				this.layout.render();
			},

			setupOrgListView: function () {
				var orgListView;
				console.error(this.orgs.toJSON());
				this.orgListView = new ProfileOrgListView({
					collection: this.orgs,
					destination: "#games_div"
				});

				this.scheme.push(this.orgListView);
				this.layout.render();
			},

			setupRelatedListView: function () {
				var relatedListView;
				this.relatedListView = new ProfileRelatedListView({
					collection: this.relateds,
					destination: "#related-wrap"
				});

				this.scheme.push(this.relatedListView);
				this.layout.render();
			},

			setupFitnessBasicListView: function () {
				var fitnessBasicListView;

				this.fitnessBasicListView = new ProfileFitnessBasicListView({
					collection: this.fitnessbasics,
					destination: "#fitnessbasic-wrap"
				});

				this.scheme.push(this.fitnessBasicListView);
				this.layout.render();
			},

			setupVideoListView: function () {
				var videoListView;

				this.videoListView = new ProfileVideoListView({
					collection: this.videos,
					destination: "#video-wrap"
				});

				this.scheme.push(this.videoListView);
				this.layout.render();
			},

			setupImageListView: function () {
				var self = this;
				//Channel('image-upload-success').subscribe(this.updateImages);
				routing.off('image-upload-success');
				routing.on('image-upload-success', function(data) { 
        			self.updateImages(data);
        		});
				this.imageListView = new ProfileImageListView({
					collection: this.images,
					destination: "#image-wrap",
					//model: Backbone.Model.extend(),
					name: "images View 2"
				});

				this.scheme.push(this.imageListView);
				this.layout.render();
			},
			
			setupFansListView: function () {
				this.fansListView = new FansImageListView({
					collection: this.fans,
					destination: "#fans-div",
					//model: Backbone.Model.extend(),
					name: "fansView"
				});

				this.scheme.push(this.fansListView);
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

			setupCommentOfListView: function () {
				var commentOfListView;
				commentOfListView = new ProfileCommentOfListView({
					collection: this.commentsof,
					destination: "#commentof-wrap"
				});
			//	this.scheme.push(commentOfListView);
			//	this.layout.render();
			},

			setupCommentOnListView: function () {
				var commentOnListView;
				console.log(this.commentson);
				this.commentOnListView = new ProfileCommentOnListView({
					collection: this.commentson,
					destination: "#commenton-wrap"
				});

				this.scheme.push(this.commentOnListView);
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

				//console.log("Profile page setupLayout Results: ", pageLayout);
				this.layout = pageLayout;

				return this.layout;
			}

		});

		return ProfileController;
	});
