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
    "team/collections/competitor_teams",
    "team/collections/rosters",
    "team/collections/videos",
    "team/collections/images",
    "team/collections/comments",
    
    "team/views/header",
    "team/views/add-media",
    "sportorg/views/schedule-list",
    "sportorg/views/competitorteam-list",
    "sportorg/views/roster-list",
    "team/views/video-list",
    "team/views/image-list",
    "team/views/comment-list"
    
    
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
        CompetitorTeamList = require("team/collections/competitor_teams"),
        RosterList = require("team/collections/rosters");
        VideoList = require("team/collections/videos");
        ImageList = require("team/collections/images");
        CommentList = require("team/collections/comments");
        
        TeamHeaderView = require("team/views/header"),
        AddMediaView = require("team/views/add-media"),
        ScheduleListView = require("sportorg/views/schedule-list"),
        CompetitorTeamListView = require("sportorg/views/competitorteam-list"),
        RosterListView = require("sportorg/views/roster-list"),
        VideoListView = require("team/views/video-list"),
        ImageListView = require("team/views/image-list"),
        CommentListView = require("team/views/comment-list"),
        
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
                controller.refreshPage();
            
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
                
                controller.competitor_teams = new CompetitorTeamList();
                controller.competitor_teams.id = controller.id;
                controller.competitor_teams.sport_id = sport_id;
                controller.competitor_teams.complevel_id = complevel_id;
                controller.competitor_teams.season_id = season_id;
                controller.competitor_teams.fetch();
                
                controller.rosters = new RosterList();
                controller.rosters.id = controller.id;
                controller.rosters.sport_id = sport_id;
                controller.rosters.complevel_id = complevel_id;
                controller.rosters.season_id = season_id;
                controller.rosters.fetch();
                
                controller.videos = new VideoList();
                controller.videos.id = controller.id;
                controller.videos.sport_id = sport_id;
                controller.videos.complevel_id = complevel_id;
                controller.videos.season_id = season_id;
                controller.videos.fetch();
                
                controller.images = new ImageList();
                controller.images.id = controller.id;
                controller.images.sport_id = sport_id;
                controller.images.complevel_id = complevel_id;
                controller.images.season_id = season_id;
                controller.images.fetch();
                
                controller.comments = new CommentList();
                controller.comments.id = controller.id;
                controller.comments.sport_id = sport_id;
                controller.comments.complevel_id = complevel_id;
                controller.comments.season_id = season_id;
                controller.comments.fetch();
                
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
        
        refreshPage: function() {
            var position;
            
            if (this.upcomingScheduleListView) {
                $(this.upcomingScheduleListView.destination).html('');
                position = $.inArray(this.upcomingScheduleListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.recentScheduleListView) {
                $(this.recentScheduleListView.destination).html('');
                position = $.inArray(this.recentScheduleListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.competitorTeamListView) {
                $(this.competitorTeamListView.destination).html('');
                position = $.inArray(this.competitorTeamListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
            
            if (this.rosterListView) {
                $(this.rosterListView.destination).html('');
                position = $.inArray(this.rosterListView, this.scheme);
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
            
            if (this.commentListView) {
                $(this.commentListView.destination).html('');
                position = $.inArray(this.commentListView, this.scheme);
                if ( ~position ) this.scheme.splice(position, 1);
            }
        },
        
        handleDeferredsDynamic: function() {
            var controller = this;
            
            $.when(this.upcoming_schedules.request).done(function () {
                controller.setupUpcomingSchedules();
            });
            
            $.when(this.recent_schedules.request).done(function () {
                controller.setupRecentSchedules();
            });
            
            $.when(this.competitor_teams.request).done(function () {
                controller.setupCompetitorTeams();
            });
            
            $.when(this.rosters.request).done(function () {
                controller.setupRosters();
            });
            
            $.when(this.videos.request).done(function () {
                controller.setupVideos();
            });
            
            $.when(this.images.request).done(function () {
                controller.setupImages();
            });
            
            $.when(this.comments.request).done(function () {
                controller.setupComments();
            });
        },
        
        setupHeaderView: function() {
            var headerView;
            
            headerView = new TeamHeaderView({
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
            var UpcomingScheduleListView;
            
            UpcomingScheduleListView = ScheduleListView.extend({
                name: "Upcoming Schedule List"
            });
            this.upcomingScheduleListView = new UpcomingScheduleListView({
                collection: this.upcoming_schedules,
                destination: "#upcoming-schedule"
            });
            
            this.scheme.push(this.upcomingScheduleListView);
            this.layout.render();
        },
        
        setupRecentSchedules: function() {
            var RecentScheduleListView;
            
            RecentScheduleListView = ScheduleListView.extend({
                name: "Recent Schedule List"
            });
            this.recentScheduleListView = new RecentScheduleListView({
                collection: this.recent_schedules,
                destination: "#recent-schedule"
            });
            
            this.scheme.push(this.recentScheduleListView);
            this.layout.render();
        },
        
        setupCompetitorTeams: function() {
            this.competitorTeamListView = new CompetitorTeamListView({
                collection: this.competitor_teams,
                destination: "#competitor-teams"
            });
            
            this.scheme.push(this.competitorTeamListView);
            this.layout.render();
        },
        
        setupRosters: function() {
            this.rosterListView = new RosterListView({
                collection: this.rosters,
                destination: "#roster-wrap"
            });
            
            this.scheme.push(this.rosterListView);
            this.layout.render();
        },
        
        setupVideos: function() {
            this.videoListView = new VideoListView({
                collection: this.videos,
                destination: "#video-wrap"
            });
            
            this.scheme.push(this.videoListView);
            this.layout.render();
        },
        
        setupImages: function() {
            this.imageListView = new ImageListView({
                collection: this.images,
                destination: "#image-wrap"
            });
            
            this.scheme.push(this.imageListView);
            this.layout.render();
        },
        
        setupComments: function() {
            this.commentListView = new CommentListView({
                collection: this.comments,
                destination: "#comment-wrap"
            });
            
            this.scheme.push(this.commentListView);
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

    return TeamController;
});
