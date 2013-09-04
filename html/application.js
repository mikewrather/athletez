// application.js  
// --------------  
// Requires define
// Return {Object} App
define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup",'home','videopreview',
 "game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","login/model","login/view"],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, HomeController, VideoPreviewController,
	GameController, TeamController, RegistrationController, ProfileSetting,UserResume, SitePhraseList , TagController,AddGameController,loginModel, loginView ) {


    //App;
    	
        var App, ApplicationStates = collections.ApplicationStates,
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

	        //'videoprev': 'videoPreview',
	        //'videoprev/': 'videoPreview',

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
            if(typeof routing != "undefined" && typeof routing.ajaxRequests != "undefined" && routing.ajaxRequests.length) {
            	for(var i in routing.ajaxRequests) {
            		routing.ajaxRequests[i].abort();
            	}
            }
        },
        
        initialiRoutesInit: function(fn) {
        	routing.off('app-inited');
            routing.on('app-inited', function(id) {
            	fn(id);
            });
        },

        defaultRoute: function () {
            this.initApp();
        },
        
        initApp: function (action) {
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
	    	this.cancelAjaxRequests();
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
        	var self = this;
        	this.cancelAjaxRequests();
	        self.loadStyles();
           $('body').empty();
           // $('#main-header').empty();
            //$('#main-content').empty();
           chromeBootstrap();
			function initProfile(headerModelId) {
				var pCont = new ProfileController({
	                "userId": userid==undefined ? headerModelId : userid
	            });
            }
            this.initialiRoutesInit(initProfile);

            
            //Channel('app-inited').subscribe(initProfile);

        },
		imageUpListeners: function () {
            function showImage(url,attr) {
                var imageController = new ImageController({"route": "","url":url,"attr":attr});
            }
			Channel('add-image').subscribe(showImage);
        },
		
        showProfileSetting: function (userid) {
            this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();

            function initProfileSetting(id) {
                var profileSetting = new ProfileSetting({
                	"id": userid==undefined ? id : userid
                });
            }
            this.initialiRoutesInit(initProfileSetting);
            //Channel('app-inited').subscribe(initProfileSetting);
        },
        
        ShowUserResume: function (userid) {
            this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initUserResume(id) {
            	
                var resume = new UserResume({
                	"id": userid==undefined ? id : userid
                });
            }
             this.initialiRoutesInit(initUserResume);
            //Channel('app-inited').subscribe(initUserResume);
        },
        
		  //imageupProfile: function(){
        imageUp: function () {
        	this.cancelAjaxRequests();
			this.loadStyles();
			//chromeBootstrap();
            
            function initImage(id){ var imageController = new ImageController({"route": "","url":this.posturl,"attr":this.attribute}); }
            this.initialiRoutesInit(initImage);
            
            //Channel('app-inited').subscribe(initImage);
		},

	    videoPreview: function () {
		   
             this.cancelAjaxRequests();
            this.loadStyles();
		   // chromeBootstrap();
		    //$('body').empty();
           // chromeBootstrap();chromeBootstrap();
		    //console.log(VideoPreviewController);

		    function initVideoPreview(url,attr)
		    {
			    var VidPrevCtrl = new VideoPreviewController({"url":url,"attr":attr});
			    //console.log(VidPrevCtrl);
		    }
			//** creating a call back list and adding the method
		    
			//Channel('app-inited').subscribe(initVideoPreview);
			Channel('add-video').subscribe(initVideoPreview);
	    },
        
        showGame: function (id) {
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
             this.initialiRoutesInit(initGame);
            //Channel('app-inited').subscribe(initGame);
        },
        
        showTeam: function(id) {
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
            this.initialiRoutesInit(initTeam);
           // Channel('app-inited').subscribe(initTeam);
        },
        
        showRegistration: function() {
        	this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initRegistration() {
                var registrationController = new RegistrationController({
                    "route": ""
                })
            }
            this.initialiRoutesInit(initRegistration);
            //Channel('app-inited').subscribe(initRegistration);
        },
        
        showTag: function (userid) {
           this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initTag(id) {
                var tag = new TagController({
                	"id": userid==undefined ? id : userid
                });
            }
            this.initialiRoutesInit(initTag);
           // Channel('app-inited').subscribe(initTag);
        },
        
        showAddGame : function(userid){
        	this.cancelAjaxRequests();
        	this.loadStyles();
            $('body').empty();
            chromeBootstrap();

            function initAddGame(id) {
            	
                var addGame = new AddGameController({
                	"id": userid==undefined ? id : userid
                });
            }
           this.initialiRoutesInit(initAddGame); 
            //Channel('app-inited').subscribe(initAddGame);

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
			this.videoPreview();
			
			
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
