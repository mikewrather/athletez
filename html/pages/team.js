// Team Controller
// ---------------
// module as controller for 'team' package
// Returns {TeamController} constructor

define([
    "require",
    "text!team/templates/layout.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    
    "team/models/basics",
    
    "team/views/header"
    
    
    ], function (require, pageLayoutTemplate) {

    var TeamController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        BasicsModel = require("team/models/basics"),
        
        HeaderView = require("team/views/header"),
        
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
            this.basics = new BasicsModel();
            this.basics.id = '101';            
            this.basics.fetch();
            this.id = this.basics.id;
            
            /*this.addmedia = new GameAddMediaModel();
            this.addmedia.id = this.id;            
            
            this.teamrosters = new GameTeamRosterList();
            this.teamrosters.id = this.id;
            this.teamrosters.fetch();
            
            this.videoplayer = new GameVideoPlayerModel();
            this.videoplayer.id = this.id;
            this.videoplayer.fetch();
            
            this.videothumbs = new GameVideoThumbList();
            this.videothumbs.id = this.id;
            this.videothumbs.fetch();
            
            this.images = new GameImageList();
            this.images.id = this.id;
            this.images.fetch();
            
            this.comments = new GameCommentList();
            this.comments.id = this.id;
            this.comments.fetch();*/
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();  
                //controller.setupAddMediaView();                              
            });
            
            /*$.when(this.teamrosters.request).done(function () {
                controller.setupTeamRosterListView();                        
            });
            
            $.when(this.videoplayer.request).done(function () {
                controller.setupVideoPlayerView();                        
            });
            
            $.when(this.videothumbs.request).done(function () {
                controller.setupVideoThumbListView();                        
            });
            
            $.when(this.images.request).done(function() {
                controller.setupImageListView();
            });
            
            $.when(this.comments.request).done(function() {
                controller.setupCommentListView();
            })*/
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
        
        /*setupAddMediaView: function() {
            var addMediaView;
            
            addMediaView = new GameAddMediaView({
                model: this.addmedia,
                name: "Add Media",
                destination: "#add-media"
            });
            
            this.scheme.push(addMediaView);
            this.layout.render();
        },
        
        setupRosterListView: function() {
            var teamRosterListView;
            
            teamRosterListView = new GameTeamRosterListView({
                collection: this.teamrosters,
                destination: "#roster-wrap"
            });
            
            this.scheme.push(teamRosterListView);
            this.layout.render();
        },
        
        setupVideoPlayerView: function() {
            var videoPlayerView;
            
            videoPlayerView = new GameVideoPlayerView({
                model: this.videoplayer,
                name: "Video Player",
                destination: "#video-player"
            });
            
            this.scheme.push(videoPlayerView);
            this.layout.render();
        },
        
        setupVideoThumbListView: function() {
            var videoThumbListView;
            
            videoThumbListView = new GameVideoThumbListView({
                collection: this.videothumbs,
                destination: "#videothumb-wrap"
            });
            
            this.scheme.push(videoThumbListView);
            this.layout.render();            
        },
        
        setupImageListView: function() {
            var imageListView;
            
            imageListView = new GameImageListView({
                collection: this.images,
                destination: "#image-wrap"
            });
            
            this.scheme.push(imageListView);
            this.layout.render();
        },
        
        setupCommentListView: function() {
            var commentListView;
            
            commentListView = new GameCommentListView({
                collection: this.comments,
                destination: "#comment-wrap"
            });
            
            this.scheme.push(commentListView);
            this.layout.render();            
        },*/
                        
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
