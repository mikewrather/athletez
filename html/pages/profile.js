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
    "profile/models/primaryvideo",
    "profile/collections/commentsof",
    "profile/collections/commentson",
    
    "profile/views/header",
    "profile/views/add-media",
    "sportorg/views/org-list",
    "user/views/related-list",
    "user/views/fitnessbasic-list",
    "media/views/video-list",
    "profile/views/image-list",
    "media/views/primaryvideo",
    "profile/views/commentof-list",
    "profile/views/commenton-list"
    
    ], function (require, pageLayoutTemplate) {

    var ProfileController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        BasicsModel = require("profile/models/basics"),
        AddMediaModel = require("profile/models/addmedia"),
        OrgList = require("profile/collections/orgs"),
        RelatedList = require("profile/collections/relateds"),
        FitnessBasicList = require("profile/collections/fitnessbasics"),
        VideoList = require("profile/collections/videos"),
        ImageList = require("profile/collections/images"),
        PrimaryVideoModel = require("profile/models/primaryvideo"),
        CommentOfList = require("profile/collections/commentsof"),
        CommentOnList = require("profile/collections/commentson"),
        
        HeaderView = require("profile/views/header"),
        AddMediaView = require("profile/views/add-media"),
        OrgListView = require("sportorg/views/org-list"),
        RelatedListView = require("user/views/related-list"),
        FitnessBasicListView = require("user/views/fitnessbasic-list"),
        VideoListView = require("media/views/video-list"),
        ImageListView = require("profile/views/image-list"),
        PrimaryVideoView = require("media/views/primaryvideo"),
        CommentOfListView = require("profile/views/commentof-list"),
        CommentOnListView = require("profile/views/commenton-list"),
        
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
            
            this.init();
            
            return this;
        },
        
        init: function() {
            this.setupLayout().render();
            this.createData();
            this.handleDeferreds();            
        },
        
        createData: function () {
            this.id = '101';
            this.basics = new BasicsModel();
            this.basics.id = this.id;
            this.basics.fetch();
            
            this.addmedia = new AddMediaModel();
            this.addmedia.id = this.id;            
            
            this.orgs = new OrgList();
            this.orgs.id = this.id;
            this.orgs.fetch();            
            
            this.relateds = new RelatedList();
            this.relateds.id = this.id;
            this.relateds.fetch();
            
            this.fitnessbasics = new FitnessBasicList();
            this.fitnessbasics.id = this.id;
            this.fitnessbasics.fetch();
            
            this.videos = new VideoList();
            this.videos.id = this.id;
            this.videos.fetch();
            
            this.images = new ImageList();
            this.images.id = this.id;
            this.images.fetch();
            
            this.primaryvideo = new PrimaryVideoModel();
            this.primaryvideo.id = this.id;
            this.primaryvideo.fetch();
            
            this.commentsof = new CommentOfList();
            this.commentsof.id = this.id;
            this.commentsof.fetch();
            
            this.commentson = new CommentOnList();
            this.commentson.id = this.id;
            this.commentson.fetch();
            
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();                                
                controller.setupAddMediaView();
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
            
            headerView = new HeaderView({
                model: this.basics,
                name: "Header",
                destination: "#main-header"
            });

            this.scheme.push(headerView);            
            this.layout.render();
        },
        
        setupAddMediaView: function() {
            var addMediaView;
            
            addMediaView = new AddMediaView({
                model: this.addmedia,
                name: "Add Media",
                destination: "#add-media"
            });
            
            this.scheme.push(addMediaView);
            this.layout.render();
        },
        
        setupOrgListView: function() {
            var orgListView;
            
            orgListView = new OrgListView({
                collection: this.orgs,
                destination: "#org-wrap"
            });
            
            this.scheme.push(orgListView);
            this.layout.render();
        },
        
        setupRelatedListView: function() {
            var relatedListView;
            
            relatedListView = new RelatedListView({
                collection: this.relateds,
                destination: "#related-wrap"
            });
            
            this.scheme.push(relatedListView);
            this.layout.render();
        },
        
        setupFitnessBasicListView: function() {
            var fitnessBasicListView;
            
            fitnessBasicListView = new FitnessBasicListView({
                collection: this.fitnessbasics,
                destination: "#fitnessbasic-wrap"
            });
            
            this.scheme.push(fitnessBasicListView);
            this.layout.render();
        },
        
        setupVideoListView: function() {
            var videoListView;
            
            videoListView = new VideoListView({
                collection: this.videos,
                destination: "#video-wrap"
            });
            
            this.scheme.push(videoListView);
            this.layout.render();
        },
        
        setupImageListView: function() {
            var imageListView;
            
            imageListView = new ImageListView({
                collection: this.images,
                destination: "#image-wrap"
            });
            
            this.scheme.push(imageListView);
            this.layout.render();
        },
        
        setupPrimaryVideoView: function() {
            var primaryVideoView;
            
            primaryVideoView = new PrimaryVideoView({
                model: this.primaryvideo,
                name: "Primary Video",
                destination: "#primaryvideo"
            });

            this.scheme.push(primaryVideoView);            
            this.layout.render();
        },
        
        setupCommentOfListView: function() {
            var commentOfListView;
            
            commentOfListView = new CommentOfListView({
                collection: this.commentsof,
                destination: "#commentof-wrap"
            });
            
            this.scheme.push(commentOfListView);
            this.layout.render();
        },
        
        setupCommentOnListView: function() {
            var commentOnListView;
            
            commentOnListView = new CommentOnListView({
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
            this.layout = pageLayout;

            return this.layout;
        }

    });

    return ProfileController;
});
