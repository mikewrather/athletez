// application.js  
// --------------  
// Requires define
// Return {Object} App

define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup",'home','videopreview',"game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","signup","login", "usercontrols/photo-player/photo-player", "usercontrols/add-club/add-club", "utils/storage", 'usercontrols/location/views/view-location'],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, HomeController, VideoPreviewController,
	GameController, TeamController, RegistrationController,ProfileSetting,UserResume, SitePhraseList , TagController,AddGameController, SignupController,LoginController,PhotoPlayerController, AddClubController, Store, googleMapLocationview) {



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
           // 'user/create':'showUsercreate'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.addSubscribers();
	       
			Controller.prototype.appStates = new ApplicationStates();
	        this.getPhrases();
	       // this.intializeImageAndVideo();
        },
        
        // get user name by id
        getUserName: function(id) {
        	var appStates = new Store("user","localStorage");
        	var name;
        	if(appStates.data) {
 	  	     	for(var userId in appStates.data) {
 	  	     		if(userId == id) {
 	  	     			name =  appStates.data[userId].user_name;
 	  	     			break;	
 	  	     		}	
 	  	     	}
        	}
        	
        	if(name)	
        		return name;
        	else
        		return false;
        },
        
        intializeImageAndVideo: function() {
        	this.imageUpListeners();
			this.videoPreview();
            this.showUsercreate();
            this.showLogin();
        },
        
        cancelAjaxRequests: function() {
            if(typeof routing != "undefined" && typeof routing.ajaxRequests != "undefined" && routing.ajaxRequests.length) {
            	for(var i in routing.ajaxRequests) {
            		routing.ajaxRequests[i].abort();
            	}
            }
        },
        
        initTriggers: function() {
        	routing.off('photo-player-init');
            routing.on('photo-player-init', function(index, collection, userId, array) {
            	
            	 var photoPlayer = new PhotoPlayerController({
                	index: index,
                	userId: userId,
                	_collection: collection,
                	array: array
                });
            });
            
            routing.off('add-school-init');
            routing.on('add-school-init', function(collection, userId, addType) {
            	 var addSchool = new AddClubController({
            	 	type: addType
                	//userId: userId,
                	//_collection: collection
                });
            });
            
            var popupCallback = undefined, locationCallback = undefined;
            
            routing.off('edit_game_popup_open');
            routing.on('edit_game_popup_open', function(view, location, callback) {
            	if(callback)
	            	popupCallback = callback;
            	 var modelHTML = '<div id="modalPopup" class="modal photo-frame-model hide fade model-popup-h">'+
					'<div class="modal-header">'+
 					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
					'</div>'+
					'<div class="modal-body page-content-h">'+
					'</div></div>';
					$(".model-popup-h").remove();
					$('body').append(modelHTML);
					var viewOb = new view(location);
					$(".modal-body").html(viewOb.$el);
					$('#modalPopup').modal();
            });
            
            routing.off('show_location');
            routing.on('show_location', function(lat, longitude, destination, callback) {
            	locationCallback = callback;
            	var location = {latitude: lat, longitude: longitude};
            	var viewOb = new googleMapLocationview(location);
            	$(destination).html(viewOb.$el);
            });            
            
            routing.off('popup-close');
            routing.on('popup-close', function() {
            	$('#modalPopup').modal('hide');
            	$(".model-popup-h").remove();
            	if(locationCallback) locationCallback();
            });
        },
        
        initialiRoutesInit: function(fn, title) {
        	var self = this;
        	routing.off('app-inited');
            routing.on('app-inited', function(id) {
            	fn(id);
            });
            
            
            // initialize add game popup common trigger 
            routing.off('add-game');
            routing.on('add-game', function(id,teams_id,sports_id,users_id) {
            	//fn(id);
            	 var addGameview = new AddGameController({
		            "teams_id":teams_id,
		             "sports_id":sports_id,
		            "users_id" : users_id,
                	"id": id,
                	popup: true
                });
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
	    	var self = this;
	    	this.cancelAjaxRequests();
	    	this.loadStyles();
	    	
	    	$('body').empty();
	    	
            chromeBootstrap();
            
	    	//self.removeCurrent();
	    	function initHome(id) {
	    		
	    		self.currentController = new HomeController({
	    			route: "",
	    			title: "Athletz"
	    		});
	    	}
	    	this.initialiRoutesInit(initHome);
	    },
	    
	    removeCurrent: function() {
	    	/*if(this.currentController) {
	    		console.log(this.currentController.layout);
	    		this.currentController.remove();
	    	}*/
	    },
	    
        showProfile: function (userid) {
        	var self = this;
        	this.cancelAjaxRequests();
	        self.loadStyles();
           $('body').empty();
           // $('#main-header').empty();
            //$('#main-content').empty();
           chromeBootstrap();
           self.removeCurrent();
			function initProfile(headerModelId) {
                self.currentController = new ProfileController({
	                "userId": (typeof userid != "undefined")?userid:headerModelId,
	                title: self.getUserName(headerModelId)
	            });
            }
            this.initialiRoutesInit(initProfile);

            
            //Channel('app-inited').subscribe(initProfile);

        },
        
        notFound: function(page) {
        	alert("Page not found");
        },
        
        
         showTeam: function(id) {
         	var self = this;
            this.cancelAjaxRequests();
			this.loadStyles();
           // alert('test showteam');
            $('body').empty();
            chromeBootstrap();
            if(!id) { 
            	this.notFound('team');
            	return; 
            }
            self.removeCurrent();
            function initTeam(headerModelId) {
            	
                self.currentController = new TeamController({
                    "teamId": id,
                     title: "team page",
                    "userId": headerModelId
                });
            }
            this.initialiRoutesInit(initTeam);
           // Channel('app-inited').subscribe(initTeam);
        },
        
        
		imageUpListeners: function () {
            function showImage(url,attr) {
                var imageController = new ImageController({"route": "","url":url,"attr":attr});
            }
			this.addImageTrigger(showImage);
        },
        
        addImageTrigger: function(fn) {
        	routing.off('add-image');
            routing.on('add-image', function(url, attr) {
            	fn(url , attr);
            });
        },
		
        showProfileSetting: function (userid) {
            this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
			 this.removeCurrent();
            function initProfileSetting(id) {
               self.currentController = new ProfileSetting({
                	"id": userid==undefined ? id : userid,
                	title: "Profile setting"
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
			this.removeCurrent();
            function initUserResume(id) {
            	
                self.currentController = new UserResume({
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
			
		    function initVideoPreview(url,attr) {
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
            
            if(!id) { 
            	this.notFound('team');
            	return; 
            }
             this.removeCurrent();
            function initGame(headerModelId) {
                self.currentController = new GameController({
                    "route": "",
                    "gameId" : id,
                    title: "Game Page",
                    "userId": headerModelId
                });
            }
             this.initialiRoutesInit(initGame);
        },

        showRegistration: function() {
        	this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();
             this.removeCurrent();
            function initRegistration() {
                self.currentController = new RegistrationController({
                    "route": "",
                    title: "Register"
                });
            }
            this.initialiRoutesInit(initRegistration);
        },
        
        showTag: function (userid) {
           this.cancelAjaxRequests();
            this.loadStyles();
            $('body').empty();
            chromeBootstrap();
			 this.removeCurrent();
            function initTag(id) {
                self.currentController = new TagController({
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
			this.removeCurrent();
            function initAddGame(id) {
            	
                self.currentController = new AddGameController({
                	"id": userid==undefined ? id : userid
                });
            }
           this.initialiRoutesInit(initAddGame); 
            //Channel('app-inited').subscribe(initAddGame);
        },
        
        
		// route to login template
		showLogin: function(){
		 //$('#main-content').empty();
		   //$('body').empty();
           // chromeBootstrap();
        // var mod = new loginModel();
		// var logview = new loginView({
		//			model:mod
		//		});
         
		},
        // route to registratiom
        showUsercreate: function(){
            
            /*this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();*/

            function initSignup() {
               
            //    var registrationController = new RegistrationController({
            //        "route": ""
            //   });
               var signupController = new SignupController({
                    "route": ""
                });
            }
            this.addUserTrigger(initSignup);
            //this.initialiRoutesInit(initSignup);

        },
        addUserTrigger: function(fn) {
            routing.off('add-user');
            routing.on('add-user', function() {
                fn();
            });
        },

        showRegistration: function() {
            this.cancelAjaxRequests();
            this.loadStyles();
            
            $('body').empty();
            chromeBootstrap();
            
            function initRegistration() {
                var registrationController = new RegistrationController({
                    "route": "",
                    title: "Register"
                });
            }
            this.initialiRoutesInit(initRegistration);
            //Channel('app-inited').subscribe(initRegistration);
        },
        // load style sheets
        loadStyles: function () {
            Channel('load:css').publish([base_url + "css/bootstrap.css", 
            base_url + "css/bootstrap-responsive.css",
            base_url + "css/app.css",
            base_url + "css/common.css",
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
