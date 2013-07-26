// application.js  
// --------------  
// Requires define
// Return {Object} App

define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup", 'test','home',
 "game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases"],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, TestController, HomeController, 
	GameController, TeamController, RegistrationController, ProfileSetting,UserResume, SitePhraseList) {

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
            'home': 'showHome',
            'home/': 'showHome',
            'home/:action': 'initApp',
            
            'profile': 'showProfile',
            'profile/': 'showProfile',
            'profile/:userid': 'showProfile',

 			 'usersettings': 'showProfileSetting',
             'usersettings/': 'showProfileSetting',
         /*    'usersettings/:userid': 'showProfileSetting', This is not necessary because we will only be seeing settings for currently logged in user*/

 			 'resume': 'ShowUserResume',
             'resume/': 'ShowUserResume',

			'imageup': 'imageUp',
			'imgtestd': 'testsd',
            
            'game': 'showGame',
            'game/': 'showGame',
            //'game/:action': 'showGame',
            'game/:id' : 'showGame',
            
            'team': 'showTeam',
            'team/': 'showTeam',
            //'team/:action': 'showTeam',
            'team/:id' : 'showTeam',
            
            'registration': 'showRegistration',
            'registration/': 'showRegistration',
            'registration/:action': 'showRegistration' 
        },

        initialize: function (options) {
            _.bindAll(this);
            this.addSubscribers();
	        Controller.prototype.appStates = new ApplicationStates();
	        this.getPhrases();

        },

        defaultRoute: function () {
            this.initApp();
        },
        
        initApp: function (action) {
            //this.showProfile();
           	//this.showGame();
            //this.showTeam();
            this.showHome();
        },

	    getPhrases: function(){
		    var phrases = new SitePhraseList();
		    phrases.fetch();
	    },
	    
	    showHome: function (action) {
	    	this.loadStyles();
	    	
	    	$('body').empty();
	    	chromeBootstrap();
	    	
	    	function initHome() {
	    		var homeController = new HomeController({
	    			"route" : "home"
	    		});
	    	}
	    	
	    	initHome();
	    },
	    
        showProfile: function (userid) {
        	this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
			function initProfile(headerModelId) {
				var profileController=new ProfileController({
	                "route": "resume", 
	                "userId": userid==undefined ? null : userid
	            });
            }
            Channel('app-inited').subscribe(initProfile);
			
        },
		testsd: function () {
        	this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
			console.log("t");
			 var testController=new TestController({
                "route": ""
            });
            function initTest() {
                var testController=new TestController({
	                "route": ""
	            });
            }
            function showImage(url,attr) {
                var imageController = new ImageController({"route": "","url":url,"attr":attr});
            }
            Channel('add-image').subscribe(showImage);
            Channel('app-inited').subscribe(initTest);
        },
        showProfileSetting: function (userid) {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();

            function initProfileSetting(id) {
                var profileSetting = new ProfileSetting({
                	"id": userid==undefined ? id : userid
                });
            }
            
            Channel('app-inited').subscribe(initProfileSetting);
        },
        
        ShowUserResume: function (userid) {
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initUserResume(id) {
            	
                var resume = new UserResume({
                	"id": userid==undefined ? id : userid
                });
            }
            
            Channel('app-inited').subscribe(initUserResume);
        },
        
		imageUp: function () {
			console.log("router");
			this.loadStyles();
            
         // $('body').empty();
			chromeBootstrap();
			//URL to which it has to be passed

			//this.posturl="";
			//Extra attributes need to be posted

			//this.attribute={};
			//pass those attributes to the controller
        //    new ImageController({"route": "","url":this.posturl,"attr":this.attribute});
            function initImage(id)
            {
	        //    this.posturl="/api/image/add/";
	        //    this.attribute={'sports_id':'46',"id":"0"};

				console.log("inside router");
                var imageController = new ImageController({"route": "","url":this.posturl,"attr":this.attribute});
	            console.log("Image Controller",imageController);
            }
			
            Channel('app-inited').subscribe(initImage);
		},
        
        showGame: function (id) {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
             /*var gameController = new GameController({
                    "route": ""
                });*/
            //this callback function is called from /pages/chrom/views/header.js
            //it getting headerModelId
            if(!id) id=1;
            function initGame(headerModelId) {
                var gameController = new GameController({
                    "route": "",
                    "gameId" : id
                });
            }
            
            Channel('app-inited').subscribe(initGame);
        },
        
        showTeam: function(id) {
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            if(!id) id = 1;
            function initTeam(headerModelId) {
                var teamController = new TeamController({
                    "route": "",
                    "teamId": id
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
        },

        removeSubscribers: function () {
            Channel('load:css').unsubscribe(this.loadCss);
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
