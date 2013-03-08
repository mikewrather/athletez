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
    "profile/models/header",
    "profile/collections/orgs",
    "profile/collections/relateds",
    "profile/collections/videos",
    "profile/views/header",
    "profile/views/org-list",
    "profile/views/related-list",
    "profile/views/video-list"
    ], function (require, profileLayoutTemplate) {

    var ProfileController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        ProfileHeaderModel = require("profile/models/header"),
        ProfileOrgList = require("profile/collections/orgs"),
        ProfileRelatedList = require("profile/collections/relateds"),
        ProfileVideoList = require("profile/collections/videos"),
        ProfileHeaderView = require("profile/views/header"),
        ProfileOrgListView = require("profile/views/org-list"),
        ProfileRelatedListView = require("profile/views/related-list"),
        ProfileVideoListView = require("profile/views/video-list"),
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/packages/profile/profile.css"
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
            this.header = new ProfileHeaderModel();
            this.header.fetch();
            this.id = this.header.id;
            
            this.orgs = new ProfileOrgList();
            this.orgs.id = this.id;
            this.orgs.fetch();            
            
            this.relateds = new ProfileRelatedList();
            this.relateds.id = this.id;
            this.relateds.fetch();
            
            this.videos = new ProfileVideoList();
            this.videos.id = this.id;
            this.videos.fetch();
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.header.request).done(function () {
                controller.setupHeaderView();                                
            });
            
            $.when(this.orgs.request).done(function() {
                controller.setupOrgListView();
            });
            
            $.when(this.relateds.request).done(function() {
                controller.setupRelatedListView();
            });
            
            $.when(this.videos.request).done(function() {
                controller.setupVideoListView();
            });
        },
        
        setupHeaderView: function() {
            var headerView;
            
            headerView = new ProfileHeaderView({
                model: this.header,
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
                destination: "#profile-sidebar .org-wrap"
            });
            
            this.scheme.push(orgListView);
            this.layout.render();
        },
        
        setupRelatedListView: function() {
            var relatedListView;
            
            relatedListView = new ProfileRelatedListView({
                collection: this.relateds,
                destination: "#profile-sidebar .related-wrap"
            });
            
            this.scheme.push(relatedListView);
            this.layout.render();
        },
        
        setupVideoListView: function() {
            var videoListView;
            
            videoListView = new ProfileVideoListView({
                collection: this.videos,
                destination: "#profile-content .video-wrap"
            });
            
            this.scheme.push(videoListView);
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
        },

    });

    return ProfileController;
});
