// application.js  
// --------------  
// Requires define
// Return {Object} App

define( ["facade", "utils", "collections", "chrome", "controller", "profile", "game"], 
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, GameController) {

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
            'profile/:action': 'showProfile',
            
            'game': 'showGame',
            'game/': 'showGame',
            'game/:action': 'showGame'
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
            this.showGame();
        },
        
        showProfile: function () {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            var profileController = new ProfileController({
                "route": "resume"
            });
        },
        
        showGame: function () {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            var gameController = new GameController({
                "route": ""
            });
        },

        // load style sheets
        loadStyles: function () {
            Channel('load:css').publish([base_url + "css/bootstrap.css", 
                base_url + "css/bootstrap-responsive.css", 
                base_url + "css/app.css"]);
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
