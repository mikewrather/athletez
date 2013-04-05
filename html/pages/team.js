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
    
    "team/views/header",
    "team/views/add-media",
    "sportorg/views/schedule-list",
    "sportorg/views/competitorteam-list"
    
    
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
        
        HeaderView = require("team/views/header"),
        AddMediaView = require("team/views/add-media"),
        ScheduleListView = require("sportorg/views/schedule-list"),
        CompetitorTeamListView = require("sportorg/views/competitorteam-list"),
        
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
