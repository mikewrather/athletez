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
        
        BasicsModel = require("profile/models/basics"),
        AddMediaModel = require("profile/models/addmedia"),
        OrgList = require("profile/collections/orgs"),
        RelatedList = require("profile/collections/relateds"),
        FitnessBasicList = require("profile/collections/fitnessbasics"),
        VideoList = require("profile/collections/videos"),
        ImageList = require("profile/collections/images"),
        CommentOfList = require("profile/collections/commentsof"),
        CommentOnList = require("profile/collections/commentson"),
        
        ProfileHeaderView = require("profile/views/header"),
        AddMediaView = require("profile/views/add-media"),
        OrgListView = require("sportorg/views/org-list"),
        RelatedListView = require("user/views/related-list"),
        FitnessBasicListView = require("user/views/fitnessbasic-list"),
        VideoListView = require("profile/views/video-list"),
        ImageListView = require("profile/views/image-list"),
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
            
            this.commentsof = new CommentOfList();
            this.commentsof.id = this.id;
            this.commentsof.fetch();
            
            this.commentson = new CommentOnList();
            this.commentson.id = this.id;
            this.commentson.fetch();
            
            var controller = this;
            
            function callback(sport_id) {
                controller.refreshPage();
            
                controller.orgs = new OrgList();
                controller.orgs.id = controller.id;
                controller.orgs.sport_id = sport_id;
                controller.orgs.fetch();            
                
                controller.relateds = new RelatedList();
                controller.relateds.id = controller.id;
                controller.relateds.sport_id = sport_id;
                controller.relateds.fetch();
                
                controller.fitnessbasics = new FitnessBasicList();
                controller.fitnessbasics.id = controller.id;
                controller.fitnessbasics.sport_id = sport_id;
                controller.fitnessbasics.fetch();
                
                controller.videos = new VideoList();
                controller.videos.id = controller.id;
                controller.videos.sport_id = sport_id;
                controller.videos.fetch();
                
                controller.images = new ImageList();
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
            
            $.when(this.images.request).done(function() {
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
            
            this.orgListView = new OrgListView({
                collection: this.orgs,
                destination: "#org-wrap"
            });
            
            this.scheme.push(this.orgListView);
            this.layout.render();
        },
        
        setupRelatedListView: function() {
            var relatedListView;
            
            this.relatedListView = new RelatedListView({
                collection: this.relateds,
                destination: "#related-wrap"
            });
            
            this.scheme.push(this.relatedListView);
            this.layout.render();
        },
        
        setupFitnessBasicListView: function() {
            var fitnessBasicListView;
            
            this.fitnessBasicListView = new FitnessBasicListView({
                collection: this.fitnessbasics,
                destination: "#fitnessbasic-wrap"
            });
            
            this.scheme.push(this.fitnessBasicListView);
            this.layout.render();
        },
        
        setupVideoListView: function() {
            var videoListView;
            
            this.videoListView = new VideoListView({
                collection: this.videos,
                destination: "#video-wrap"
            });
            
            this.scheme.push(this.videoListView);
            this.layout.render();
        },
        
        setupImageListView: function() {
            var imageListView;
            
            this.imageListView = new ImageListView({
                collection: this.images,
                destination: "#image-wrap"
            });
            
            this.scheme.push(this.imageListView);
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
