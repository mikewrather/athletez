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
    
    "game/views/header",
    "game/views/add-media",
    "game/views/teamroster-list",
    "game/views/videoplayer"
    
    ], function (require, pageLayoutTemplate) {

    var GameController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        GameBasicsModel = require("game/models/basics"),
        GameAddMediaModel = require("game/models/addmedia"),
        GameTeamRosterList = require("game/collections/teamrosters"),
        GameVideoPlayerModel = require("game/models/videoplayer"),
        
        GameHeaderView = require("game/views/header"),
        GameAddMediaView = require("game/views/add-media"),
        GameTeamRosterListView = require("game/views/teamroster-list"),
        GameVideoPlayerView = require("game/views/videoplayer"),
        
        
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
            
            this.initGame();
            
            return this;
        },
        
        initGame: function() {
            this.setupLayout().render();
            this.createGameData();
            this.handleDeferreds();            
        },
        
        createGameData: function () {
            this.basics = new GameBasicsModel();
            this.basics.fetch();
            this.id = this.basics.id;
            
            this.addmedia = new GameAddMediaModel();
            this.addmedia.id = this.id;            
            
            this.teamrosters = new GameTeamRosterList();
            this.teamrosters.id = this.id;
            this.teamrosters.fetch();
            
            this.videoplayer = new GameVideoPlayerModel();
            this.videoplayer.id = this.id;
            this.videoplayer.fetch();
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
            
            addMediaView = new GameAddMediaView({
                model: this.addmedia,
                name: "Add Media",
                destination: "#add-media"
            });
            
            this.scheme.push(addMediaView);
            this.layout.render();
        },
        
        setupTeamRosterListView: function() {
            var teamRosterListView;
            
            teamRosterListView = new GameTeamRosterListView({
                collection: this.teamrosters,
                destination: "#main-sidebar #roster-wrap"
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
