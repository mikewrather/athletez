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
    
    "user/models/basics",
    "user/collections/orgs",
    "user/collections/relateds",
    "user/collections/fitnessbasics",
    "media/collections/videos",
    "media/collections/images",
    "media/models/primaryvideo",
    "sitedata/collections/commentsof",
    "sitedata/collections/commentson",
    
    "profile/views/header",
    "profile/views/org-list",
    "profile/views/related-list",
    "profile/views/fitnessbasic-list",
    "profile/views/video-list",
    "profile/views/image-list",
    "profile/views/primaryvideo",
    "profile/views/commentof-list",
    "profile/views/commenton-list"
    
    ], function (require, profileLayoutTemplate) {

    var ProfileController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        ProfileBasicsModel = require("user/models/basics"),
        ProfileOrgList = require("user/collections/orgs"),
        ProfileRelatedList = require("user/collections/relateds"),
        ProfileFitnessBasicList = require("user/collections/fitnessbasics"),
        ProfileVideoList = require("media/collections/videos"),
        ProfileImageList = require("media/collections/images"),
        ProfilePrimaryVideoModel = require("media/models/primaryvideo"),
        ProfileCommentOfList = require("sitedata/collections/commentsof"),
        ProfileCommentOnList = require("sitedata/collections/commentson"),
        
        ProfileHeaderView = require("profile/views/header"),
        ProfileOrgListView = require("profile/views/org-list"),
        ProfileRelatedListView = require("profile/views/related-list"),
        ProfileFitnessBasicListView = require("profile/views/fitnessbasic-list"),
        ProfileVideoListView = require("profile/views/video-list"),
        ProfileImageListView = require("profile/views/image-list"),
        ProfilePrimaryVideoView = require("profile/views/primaryvideo"),
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

            this.handleOptions(options);
            
            this.initProfile();
            
            return this;
        },
        
        initProfile: function() {
            this.createProfileData();
            this.setupLayout().render();
            this.handleDeferreds();            
        },
        
        createProfileData: function () {
            this.basics = new ProfileBasicsModel();
            this.basics.fetch();
            this.id = this.basics.id;
            
            this.orgs = new ProfileOrgList();
            this.orgs.id = this.id;
            this.orgs.fetch();            
            
            this.relateds = new ProfileRelatedList();
            this.relateds.id = this.id;
            this.relateds.fetch();
            
            this.fitnessbasics = new ProfileFitnessBasicList();
            this.fitnessbasics.id = this.id;
            this.fitnessbasics.fetch();
            
            this.videos = new ProfileVideoList();
            this.videos.id = this.id;
            this.videos.fetch();
            
            this.images = new ProfileImageList();
            this.images.id = this.id;
            this.images.fetch();
            
            this.primaryvideo = new ProfilePrimaryVideoModel();
            this.primaryvideo.fetch();
            
            this.commentsof = new ProfileCommentOfList();
            this.commentsof.id = this.id;
            this.commentsof.fetch();
            
            this.commentson = new ProfileCommentOnList();
            this.commentson.id = this.id;
            this.commentson.fetch();
            
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();                                
            });
            
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
            
            $.when(this.images.request).done(function() {
                controller.setupImageListView();
            });
            
            $.when(this.primaryvideo.request).done(function() {
                controller.setupPrimaryVideoView();
            });
            
            $.when(this.commentsof.request).done(function() {
                controller.setupCommentOfListView();
            });
            
            $.when(this.commentson.request).done(function() {
                controller.setupCommentOnListView();
            });
        },
        
        setupHeaderView: function() {
            var headerView;
            
            headerView = new ProfileHeaderView({
                model: this.basics,
                name: "Header",
                destination: "#profile-header"
            });

            this.scheme.push(headerView);            
            this.layout.render();
        },
        
        setupOrgListView: function() {
            var orgListView;
            
            orgListView = new ProfileOrgListView({
                collection: this.orgs,
                destination: "#profile-sidebar #org-wrap"
            });
            
            this.scheme.push(orgListView);
            this.layout.render();
        },
        
        setupRelatedListView: function() {
            var relatedListView;
            
            relatedListView = new ProfileRelatedListView({
                collection: this.relateds,
                destination: "#profile-sidebar #related-wrap"
            });
            
            this.scheme.push(relatedListView);
            this.layout.render();
        },
        
        setupFitnessBasicListView: function() {
            var fitnessBasicListView;
            
            fitnessBasicListView = new ProfileFitnessBasicListView({
                collection: this.fitnessbasics,
                destination: "#profile-sidebar #fitnessbasic-wrap"
            });
            
            this.scheme.push(fitnessBasicListView);
            this.layout.render();
        },
        
        setupVideoListView: function() {
            var videoListView;
            
            videoListView = new ProfileVideoListView({
                collection: this.videos,
                destination: "#profile-content #video-wrap"
            });
            
            this.scheme.push(videoListView);
            this.layout.render();
        },
        
        setupImageListView: function() {
            var imageListView;
            
            imageListView = new ProfileImageListView({
                collection: this.images,
                destination: "#profile-content #image-wrap"
            });
            
            this.scheme.push(imageListView);
            this.layout.render();
        },
        
        setupPrimaryVideoView: function() {
            var primaryVideoView;
            
            primaryVideoView = new ProfilePrimaryVideoView({
                model: this.primaryvideo,
                name: "Primary Video",
                destination: "#profile-primaryvideo"
            });

            this.scheme.push(primaryVideoView);            
            this.layout.render();
        },
        
        setupCommentOfListView: function() {
            var commentOfListView;
            
            commentOfListView = new ProfileCommentOfListView({
                collection: this.commentsof,
                destination: "#profile-content #commentof-wrap"
            });
            
            this.scheme.push(commentOfListView);
            this.layout.render();
        },
        
        setupCommentOnListView: function() {
            var commentOnListView;
            
            commentOnListView = new ProfileCommentOnListView({
                collection: this.commentson,
                destination: "#profile-content #commenton-wrap"
            });
            
            this.scheme.push(commentOnListView);
            this.layout.render();
        },
        
        setupLayout: function () {
            var profileLayout;

            profileLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
                template: profileLayoutTemplate,
                displayWhen: "ready"
            });
            this.layout = profileLayout;

            return this.layout;
        }

    });

    return ProfileController;
});
