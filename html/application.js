// application.js  
// --------------  
// Requires define
// Return {Object} App

define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup", "game", "team", "registration"],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, GameController, TeamController, RegistrationController) {

    var App,
        ApplicationStates = collections.ApplicationStates,
        $ = facade.$,
        _ = facade._,
        Backbone = facade.Backbone,
        Channel = utils.lib.Channel,
        debug = utils.debug;

    App = Backbone.Router.extend({

        routes: {
            '': 'defaultRoute',
            'home': 'initApp',
            'home/': 'initApp',
            'home/:action': 'initApp',
            
            'profile': 'showProfile',
            'profile/': 'showProfile',
            'profile/:userid': 'showProfile',

			'imageup': 'imageUp',
            
            'game': 'showGame',
            'game/': 'showGame',
            'game/:action': 'showGame',
            
            'team': 'showTeam',
            'team/': 'showTeam',
            'team/:action': 'showTeam',
            
            'registration': 'showRegistration',
            'registration/': 'showRegistration',
            'registration/:action': 'showRegistration' 
        },

        initialize: function (options) {
            _.bindAll(this);
            this.addSubscribers();
            Controller.prototype.appStates = new ApplicationStates();
        },

        defaultRoute: function () {
            this.initApp();
        },
        
        initApp: function (action) {
            //this.showProfile();
           	//this.showGame();
            //this.showTeam();
            this.showRegistration();
        },
        
        showProfile: function (userid) {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();

            function initProfile(id) {
                var profileController = new ProfileController({
                    "route": "resume", 
                    "id": userid==undefined ? id : userid
                });
            }
            
            Channel('app-inited').subscribe(initProfile);
        },
		imageUp: function () {
			console.log("router");
			this.loadStyles();
            
            $('body').empty();
            new ImageController();
            function initImage(id) {
				console.log("inside router");
                var imageController = new ImageController({
                    "route": ""
                });
            }
            
            Channel('app-inited').subscribe(initImage);
		},
        
        showGame: function () {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initGame(id) {
                var gameController = new GameController({
                    "route": ""
                });
            }
            
            Channel('app-inited').subscribe(initGame);
        },
        
        showTeam: function() {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initTeam(id) {
                var teamController = new TeamController({
                    "route": ""
                })
            }
            
            Channel('app-inited').subscribe(initTeam);
        },
        
        showRegistration: function() {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initRegistration() {
                var registrationController = new RegistrationController({
                    "route": ""
                })
            }
            
            Channel('app-inited').subscribe(initRegistration);
        },

        // load style sheets
        loadStyles: function () {
            Channel('load:css').publish([base_url + "css/bootstrap.css", 
                base_url + "css/bootstrap-responsive.css", 
                base_url + "css/app.css",
                base_url + 'css/jquery-ui-1.10.2.custom.css']);
        },

        // Pub / Sub

        addSubscribers: function () {
            Channel('load:css').subscribe(this.loadCss);
            debug.log("app subscribers added");
        },

        removeSubscribers: function () {
            Channel('load:css').unsubscribe(this.loadCss);
            debug.log("removeSubscribers from app");
        },

        // Helpers

        getStoredState: function (keyName, metaPropName) {
            var storedState, found;

            storedState = this.states.findByNameInStorage(keyName);
            if (_.isString(metaPropName)) {
                if (storedState && storedState.data) {
                    found = storedState.data[metaPropName];
                }
            }
            return found || storedState;
        },

        // Display helpers to use in a callback

        show: function (selector) {
            selector = selector || 'body';
            $(selector)
                .removeClass('hide');
        },

        hide: function (selector) {
            selector = selector || 'body';
            $(selector)
                .addClass('hide');
        },

        // Stylesheet helper

        cssLoaded: [],

        loadCss: function (arr) {
            var i, cssUrl;

            if (!_.isArray(arr)) {
                throw new Error("App method addCss expects an array");
            }
            for (i = 0; i < arr.length; i++) {
                cssUrl = arr[i];
                if (_.isString(cssUrl) && ($.inArray(cssUrl, this.cssLoaded) < 0)) {
                    utils.lib.loadCss(cssUrl);
                    this.cssLoaded.push(cssUrl);
                }
            }
        }
    });

    return App;
});
