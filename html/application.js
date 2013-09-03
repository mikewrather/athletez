// application.js  
// --------------  
// Requires define
// Return {Object} App
define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup",'home','videopreview',
 "game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","login/model","login/view"],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, HomeController, VideoPreviewController,
	GameController, TeamController, RegistrationController, ProfileSetting,UserResume, SitePhraseList , TagController,AddGameController,loginModel, loginView, ajaxRequests ) {

console.log(require.config().ajaxRequests);
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

			//'imageup': 'imageUp',

	        'videoprev': 'videoPreview',
	        'videoprev/': 'videoPreview',

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
            'registration/:action': 'showRegistration' , 
            
            'tag': 'showTag',
			'user/login' : 'showLogin',
			'addgame' : 'showAddGame',
        },

        initialize: function (options) {
            _.bindAll(this);
            this.addSubscribers();
	        Controller.prototype.appStates = new ApplicationStates();
	        this.getPhrases();
        },
        
        cancelAjaxRequests: function() {
        	 console.log(facade.ajaxRequests);
            if(facade.ajaxRequests.length) {
            	for(var i in facade.ajaxRequests) {
            		console.log("--------------------------here");
            		facade.ajaxRequests[i].abort();
            	}
            }
        },

        defaultRoute: function () {
            this.initApp();
        },
        
        initApp: function (action) {
        	//alert("init");
            //this.showProfile();
           	//this.showGame();
            //this.showTeam();
           // alert("this profile");
			this.showHome(null);
        },

	    getPhrases: function(){
		    var phrases = new SitePhraseList();
		    phrases.fetch();
	    },
	    
	    showHome: function (action) {
	    	this.loadStyles();
	    	
	    	// cancel ajax requests
	    	this.cancelAjaxRequests();
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
        	var self = this;
        	// cancel ajax requests
        	//alert("show profile");
	    	this.cancelAjaxRequests();
	        self.loadStyles();
           $('body').empty();
           // $('#main-header').empty();
            //$('#main-content').empty();
           chromeBootstrap();
			function initProfile(headerModelId) {
				//alert("init profile");
				var pCont = new ProfileController({
	                "userId": userid==undefined ? headerModelId : userid
	            });

            }
            //initProfile();
            Channel('app-inited').unsubscribe(initProfile);
            Channel('app-inited', 'unique').subscribe(initProfile);

        },
        
         showTag: function (userid) {
        	// cancel ajax requests
	    	this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();
			//alert("show fn");
            function initTag(id) {
            	//alert("init tag");
                var tag = new TagController({
                	"id": userid==undefined ? id : userid
                });
            }
            //initTag();
            Channel('app-inited').unsubscribe(initTag)
            Channel('app-inited', 'unique').subscribe(initTag);
        },
		imageUpListeners: function () {
            function showImage(url,attr) {
                var imageController = new ImageController({"route": "","url":url,"attr":attr});
            }
			Channel('add-image').subscribe(showImage);
        },
        showProfileSetting: function (userid) {
            // cancel ajax requests
	    	this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();

            function initProfileSetting(id) {
                var profileSetting = new ProfileSetting({
                	"id": userid==undefined ? id : userid
                });
            }
            Channel('app-inited').unsubscribe(initProfileSetting);
            Channel('app-inited', 'unique').subscribe(initProfileSetting);
        },
        
        ShowUserResume: function (userid) {
            // cancel ajax requests
	    	this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initUserResume(id) {
            	
                var resume = new UserResume({
                	"id": userid==undefined ? id : userid
                });
            }
            Channel('app-inited').unsubscribe(initUserResume);
            Channel('app-inited', 'unique').subscribe(initUserResume);
        },
        
		  //imageupProfile: function(){
        imageUp: function () {
			this.loadStyles();
			//chromeBootstrap();
            
            function initImage(id){ var imageController = new ImageController({"route": "","url":this.posturl,"attr":this.attribute}); }
            Channel('app-inited').unsubscribe(initImage);
            Channel('app-inited', 'unique').subscribe(initImage);
		},

	    videoPreview: function () {
		   
             
            this.loadStyles();
		   // chromeBootstrap();
		    //$('body').empty();
           // chromeBootstrap();chromeBootstrap();
		    //console.log(VideoPreviewController);

		    function initVideoPreview()
		    {
			    var VidPrevCtrl = new VideoPreviewController();
			    //console.log(VidPrevCtrl);
		    }
			Channel('app-inited').unsubscribe(initVideoPreview);
		    Channel('app-inited', 'unique').subscribe(initVideoPreview);
	    },
        
        showGame: function (id) {
            // cancel ajax requests
	    	this.cancelAjaxRequests();
            this.loadStyles();
            
           $('body').empty();
            chromeBootstrap();
             /*var gameController = new GameController({
                    "route": ""
                });*/
            //this callback function is called from /pages/chrom/views/header.js
            //it getting headerModelId
          // $('#main-content').empty();
            
            if(!id) id=1;
            function initGame(headerModelId) {
                var gameController = new GameController({
                    "route": "",
                    "gameId" : id
                });
            }
            Channel('app-inited').unsubscribe(initGame);
            Channel('app-inited', 'unique').subscribe(initGame);
        },
        
        showTeam: function(id) {
            // cancel ajax requests
	    	this.cancelAjaxRequests();
			this.loadStyles();
           // alert('test showteam');
            $('body').empty();
            chromeBootstrap();
            if(!id) id = 1;
            function initTeam(headerModelId) {
                var teamController = new TeamController({
                    "route": "",
                    "teamId": id
                })
            }
             Channel('app-inited').unsubscribe(initTeam);
            Channel('app-inited', 'unique').subscribe(initTeam);
        },
        
        showRegistration: function() {
            // cancel ajax requests
	    	this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initRegistration() {
                var registrationController = new RegistrationController({
                    "route": ""
                });
            }
            Channel('app-inited').unsubscribe(initRegistration);
            Channel('app-inited', 'unique').subscribe(initRegistration);
        },
        
        showAddGame : function(userid){
        	// cancel ajax requests
	    	this.cancelAjaxRequests();
        	this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initAddGame(id) {
            	
                var addGame = new AddGameController({
                	"id": userid==undefined ? id : userid
                });
            }
            Channel('app-inited').unsubscribe(initAddGame)
            Channel('app-inited', 'unique').subscribe(initAddGame);

        },
        
        
		// route to login template
		showLogin: function(){
		 $('#main-content').empty();
		 var mod = new loginModel();
		 var logview = new loginView({
					model:mod
				});
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
	        this.imageUpListeners();
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
