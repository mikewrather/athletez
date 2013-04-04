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
    "team/models/addmedia",
    "team/collections/upcoming_schedules",
    "team/collections/recent_schedules",
    
    "team/views/header",
    "team/views/add-media",
    "sportorg/views/schedule-list"
    
    
    ], function (require, pageLayoutTemplate) {

    var TeamController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        
        BasicsModel = require("team/models/basics"),
        AddMediaModel = require("team/models/addmedia"),
        UpcomingScheduleList = require("team/collections/upcoming_schedules"),
        RecentScheduleList = require("team/collections/recent_schedules"),
        
        HeaderView = require("team/views/header"),
        AddMediaView = require("team/views/add-media"),
        ScheduleListView = require("sportorg/views/schedule-list"),
        
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
            
            this.addmedia = new AddMediaModel();
            this.addmedia.id = this.id;
            
            var controller = this;
            
            function callback(sport_id, complevel_id, season_id) {
                controller.upcoming_schedules = new UpcomingScheduleList();
                controller.upcoming_schedules.id = controller.id;
                controller.upcoming_schedules.sport_id = sport_id;
                controller.upcoming_schedules.complevel_id = complevel_id;
                controller.upcoming_schedules.season_id = season_id;
                controller.upcoming_schedules.fetch();
                
                controller.recent_schedules = new RecentScheduleList();
                controller.recent_schedules.id = controller.id;
                controller.recent_schedules.sport_id = sport_id;
                controller.recent_schedules.complevel_id = complevel_id;
                controller.recent_schedules.season_id = season_id;
                controller.recent_schedules.fetch();
                
                /*this.teamrosters = new GameTeamRosterList();
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
                
                controller.handleDeferredsDynamic();
            }
            Channel('refresh-teampage').subscribe(callback);
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.basics.request).done(function () {
                controller.setupHeaderView();  
                controller.setupAddMediaView();                              
            });
        },
        
        handleDeferredsDynamic: function() {
            var controller = this;
            
            $.when(this.upcoming_schedules.request).done(function () {
                controller.setupUpcomingSchedules();
            });
            
            $.when(this.recent_schedules.request).done(function () {
                controller.setupRecentSchedules();
            });
        },
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
        
        setupUpcomingSchedules: function() {
            var upcomingScheduleListView;
            
            UpcomingScheduleListView = ScheduleListView.extend({
                name: "Upcoming Schedule List"
            });
            upcomingScheduleListView = new UpcomingScheduleListView({
                collection: this.upcoming_schedules,
                destination: "#upcoming-schedule"
            });
            
            this.scheme.push(upcomingScheduleListView);
            this.layout.render();
        },
        
        setupRecentSchedules: function() {
            var recentScheduleListView,
                RecentScheduleListView;
            
            RecentScheduleListView = ScheduleListView.extend({
                name: "Recent Schedule List"
            });
            recentScheduleListView = new RecentScheduleListView({
                collection: this.recent_schedules,
                destination: "#recent-schedule"
            });
            
            this.scheme.push(recentScheduleListView);
            this.layout.render();
        },
        
        /*setupRosterListView: function() {
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
