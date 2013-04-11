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
    "game/models/videoplayer",
    "game/collections/videothumbs",
    "game/collections/images",
    "game/collections/comments",
    
    "game/views/header",
    "game/views/add-media",
    "sportorg/views/teamroster-list",
    "media/views/videoplayer",
    "game/views/videothumb-list",
    "game/views/image-list",
    "game/views/comment-list"
    
    ], function (require, pageLayoutTemplate) {

    var GameController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        BasicsModel = require("game/models/basics"),
        AddMediaModel = require("game/models/addmedia"),
        TeamRosterList = require("game/collections/teamrosters"),
        VideoPlayerModel = require("game/models/videoplayer"),
        VideoThumbList = require("game/collections/videothumbs");
        ImageList = require("game/collections/images");
        CommentList = require("game/collections/comments");
        
        GameHeaderView = require("game/views/header"),
        AddMediaView = require("game/views/add-media"),
        TeamRosterListView = require("sportorg/views/teamroster-list"),
        VideoPlayerView = require("media/views/videoplayer"),
        VideoThumbListView = require("game/views/videothumb-list"),
        ImageListView = require("game/views/image-list"),
        CommentListView = require("game/views/comment-list"),
        
        
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
            
            this.addmedia = new AddMediaModel();
            this.addmedia.id = this.id;            
            
            this.teamrosters = new TeamRosterList();
            this.teamrosters.id = this.id;
            this.teamrosters.fetch();
            
            this.videoplayer = new VideoPlayerModel();
            this.videoplayer.id = this.id;
            this.videoplayer.fetch();
            
            this.videothumbs = new VideoThumbList();
            this.videothumbs.id = this.id;
            this.videothumbs.fetch();
            
            this.images = new ImageList();
            this.images.id = this.id;
            this.images.fetch();
            
            this.comments = new CommentList();
            this.comments.id = this.id;
            this.comments.fetch();
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();  
                controller.setupAddMediaView();                              
            });
            
            $.when(this.teamrosters.request).done(function () {
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
            })
        },
        
        setupHeaderView: function() {
            var headerView;
            
            headerView = new GameHeaderView({
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
        
        setupTeamRosterListView: function() {
            var teamRosterListView;
            
            teamRosterListView = new TeamRosterListView({
                collection: this.teamrosters,
                destination: "#roster-wrap"
            });
            
            this.scheme.push(teamRosterListView);
            this.layout.render();
        },
        
        setupVideoPlayerView: function() {
            var videoPlayerView;
            
            videoPlayerView = new VideoPlayerView({
                model: this.videoplayer,
                name: "Video Player",
                destination: "#video-player"
            });
            
            this.scheme.push(videoPlayerView);
            this.layout.render();
        },
        
        setupVideoThumbListView: function() {
            var videoThumbListView;
            
            videoThumbListView = new VideoThumbListView({
                collection: this.videothumbs,
                destination: "#videothumb-wrap"
            });
            
            this.scheme.push(videoThumbListView);
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
        
        setupCommentListView: function() {
            var commentListView;
            
            commentListView = new CommentListView({
                collection: this.comments,
                destination: "#comment-wrap"
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
