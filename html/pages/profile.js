// Profile Controller
// ---------------
// module as controller for 'profile' package
// Returns {ProfileController} constructor

define([
    "require",
    "text!profile/templates/layout.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    
    "profile/models/basics",
    "profile/models/addmedia",
    "profile/collections/orgs",
    "profile/collections/relateds",
    "profile/collections/fitnessbasics",
    "profile/collections/videos",
    "profile/collections/images",
    "profile/collections/commentsof",
    "profile/collections/commentson",
    
    "profile/views/header",
    "profile/views/add-media",
    "sportorg/views/org-list",
    "user/views/related-list",
    "user/views/fitnessbasic-list",
    "profile/views/video-list",
    "profile/views/image-list",
    "profile/views/commentof-list",
    "profile/views/commenton-list"
    
    ], function (require, pageLayoutTemplate) {

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
        ProfileVideoList = require("profile/collections/videos"),
        ProfileImageList = require("profile/collections/images"),
        ProfileCommentOfList = require("profile/collections/commentsof"),
        ProfileCommentOnList = require("profile/collections/commentson"),
        
        ProfileHeaderView = require("profile/views/header"),
        ProfileAddMediaView = require("profile/views/add-media"),
        ProfileOrgListView = require("sportorg/views/org-list"),
        ProfileRelatedListView = require("user/views/related-list"),
        ProfileFitnessBasicListView = require("user/views/fitnessbasic-list"),
        ProfileVideoListView = require("profile/views/video-list"),
        ProfileImageListView = require("profile/views/image-list"),
        ProfileCommentOfListView = require("profile/views/commentof-list"),
        ProfileCommentOnListView = require("profile/views/commenton-list"),
        
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
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

	        console.log("Profile Options: ",options);

            this.handleOptions(options);
            
            if (options.id) {
                this.id = options.id;
                this.init();
            }
            return this;
        },
        
        init: function() {
            this.setupLayout().render();
            this.createData();
            this.handleDeferreds();            
        },
        
        createData: function () {
            this.basics = new ProfileBasicsModel();
            this.basics.id = this.id;
            this.basics.fetch();
            
            this.addmedia = new ProfileAddMediaModel();
            this.addmedia.id = this.id;
            
            this.commentsof = new ProfileCommentOfList();
            this.commentsof.id = this.id;
            this.commentsof.fetch();
            
            this.commentson = new ProfileCommentOnList();
            this.commentson.id = this.id;
            this.commentson.fetch();
            
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
                
                controller.videos = new ProfileVideoList();
                controller.videos.id = controller.id;
                controller.videos.sport_id = sport_id;
                controller.videos.fetch();
                
                controller.images = new ProfileImageList();
                controller.images.id = controller.id;
                controller.images.sport_id = sport_id;
                controller.images.fetch();
                
                controller.handleDeferredsDynamic();
            }
            Channel('refresh-profilepage').subscribe(callback);
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();                                
                controller.setupAddMediaView();
            });
            
            $.when(this.commentsof.request).done(function() {
                controller.setupCommentOfListView();
            });
            
            $.when(this.commentson.request).done(function() {
                controller.setupCommentOnListView();
            });
        },
        
        refreshPage: function() {
            var position;
            
            if (this.orgListView) {
                $(this.orgListView.destination).html('');
                position = $.inArray(this.orgListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.relatedListView) {
                $(this.relatedListView.destination).html('');
                position = $.inArray(this.relatedListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.fitnessBasicListView) {
                $(this.fitnessBasicListView.destination).html('');
                position = $.inArray(this.fitnessBasicListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.videoListView) {
                $(this.videoListView.destination).html('');
                position = $.inArray(this.videoListView, this.scheme);
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
            
            $.when(this.orgs.request).done(function() {
                controller.setupOrgListView();
            });
            
            $.when(this.relateds.request).done(function() {
                controller.setupRelatedListView();
            });
            
            $.when(this.fitnessbasics.request).done(function() {
                controller.setupFitnessBasicListView();
            });
            
            $.when(this.videos.request).done(function() {
                controller.setupVideoListView();
            });
            
            $.when(this.images.request).done(function(x) {
	            console.log("Images Ready (called in profile.js handleDeferredDynamic)",x);
                controller.setupImageListView();
            });
		},
        
        setupHeaderView: function() {
            var headerView;
            
            headerView = new ProfileHeaderView({
                model: this.basics,
                name: "Header",
                destination: "#main-header"
            });

            this.scheme.push(headerView);            
            this.layout.render();
        },
        
        setupAddMediaView: function() {
            var addMediaView;
            
            addMediaView = new ProfileAddMediaView({
                model: this.addmedia,
                name: "Add Media",
                destination: "#add-media"
            });
            
            this.scheme.push(addMediaView);
            this.layout.render();
        },
        
        setupOrgListView: function() {
            var orgListView;
            
            this.orgListView = new ProfileOrgListView({
                collection: this.orgs,
                destination: "#org-wrap"
            });
            
            this.scheme.push(this.orgListView);
            this.layout.render();
        },
        
        setupRelatedListView: function() {
            var relatedListView;
            
            this.relatedListView = new ProfileRelatedListView({
                collection: this.relateds,
                destination: "#related-wrap"
            });
            
            this.scheme.push(this.relatedListView);
            this.layout.render();
        },
        
        setupFitnessBasicListView: function() {
            var fitnessBasicListView;
            
            this.fitnessBasicListView = new ProfileFitnessBasicListView({
                collection: this.fitnessbasics,
                destination: "#fitnessbasic-wrap"
            });
            
            this.scheme.push(this.fitnessBasicListView);
            this.layout.render();
        },
        
        setupVideoListView: function() {
            var videoListView;
            
            this.videoListView = new ProfileVideoListView({
                collection: this.videos,
                destination: "#video-wrap"
            });
            
            this.scheme.push(this.videoListView);
            this.layout.render();
        },
        
        setupImageListView: function() {
            var imageListView;


            this.imageListView = new ProfileImageListView({
                collection: this.images,
                destination: "#image-wrap"
            });

	        console.log("Profile.js setupImageListView: ",this.imageListView);


	        //needs to be updated here.
            
            this.scheme.push(this.imageListView);
            this.layout.render();
        },
        
        setupCommentOfListView: function() {
            var commentOfListView;
            
            commentOfListView = new ProfileCommentOfListView({
                collection: this.commentsof,
                destination: "#commentof-wrap"
            });
            
            this.scheme.push(commentOfListView);
            this.layout.render();
        },
        
        setupCommentOnListView: function() {
            var commentOnListView;
            
            commentOnListView = new ProfileCommentOnListView({
                collection: this.commentson,
                destination: "#commenton-wrap"
            });
            
            this.scheme.push(commentOnListView);
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

	        console.log("Profile page setupLayout Results: ",pageLayout);
            this.layout = pageLayout;

            return this.layout;
        }

    });

    return ProfileController;
});
