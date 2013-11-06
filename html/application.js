// application.js  
// --------------  
// Requires define
// Return {Object} App
define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup",'home','videopreview',"game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag","usercontrols/addgame/addgame","signup","login", "usercontrols/photo-player/photo-player", "usercontrols/add-club/add-club", "utils/storage", 'usercontrols/location/views/view-location','signup/views/facebooksignup',"usercontrols/addevent/addevent",'chrome/views/header'],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, HomeController, VideoPreviewController,
	GameController, TeamController, RegistrationController,ProfileSetting,UserResume, SitePhraseList , TagController,AddGameController, SignupController,LoginController,PhotoPlayerController, AddClubController, Store, googleMapLocationview,fbreg, AddEventController,header) {

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
            'fbconnect':'showFbreg',
            'logout':'callLogout'
           // 'user/create':'showUsercreate'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.addSubscribers();
	       
			Controller.prototype.appStates = new ApplicationStates();
	        this.getPhrases();
	        this.detectBrowser();
	       // this.intializeImageAndVideo();
        },

		detectBrowser: function(){
			console.log($.browser);
			var showBrowserWindow = false;
			var showMobileWindow = false;
			if($.browser.ipad || $.browser.iphone || $.browser.android){
				showMobileWindow = true;
			}
			if($.browser.msie){
				if(parseInt($.browser.version) < 10){
					showBrowserWindow = true;
					console.log("IE under version 9");
				}
			}
			if($.browser.mozilla){
				if(parseInt($.browser.version) < 24){
					showBrowserWindow = true;
					console.log("Old Version of FF.");
				}
			}
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
            this.showHomeRefresh();
            this.showLogin();
            this.triggerSignup();
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
            routing.on('add-school-init', function(collection, userId, addType, callback) {
            	 var addSchool = new AddClubController({
            	 	type: addType,
            	 	callback: callback
                });
            });
            
            var locationCallback = undefined;
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
        	var self = this, closeModelBox = function() {
        		$("#modalPopup, .modal-backdrop").unbind().remove();
		        };
	        this.hideSignup();
        	$("body").removeClass("homePage");
        	routing.off('app-inited');
            routing.on('app-inited', function(id) {
            	closeModelBox();
            	fn(id);
            });
            
            routing.off('popup-close');
            routing.on('popup-close', function(e) {
            	if(e) {
	            	$(e.currentTarget).modal('hide');
   		         	$(e.currentTarget).unbind().remove();            		
            	} else {
	            	$("#modalPopup").modal('hide');
   		         	$("#modalPopup").unbind().remove();				            		
            	}

            });
            
            
            
            $(document).off('hidden.bs.modal', '#modalPopup, #photoPlayerModal');
            $(document).on('hidden.bs.modal', '#modalPopup, #photoPlayerModal', function (e) {
  				routing.trigger('popup-close', e);
			});
            
            // initialize add game popup common trigger 
            routing.off('add-game');
            routing.on('add-game', function(id,teams_id,sports_id,users_id, callback) {
            	//fn(id);
            	 var addGameview = new AddGameController({
		            "teams_id":teams_id,
		             "sports_id":sports_id,
		            "users_id" : users_id,
                	"id": id,
                	popup: true,
                	callback: callback
                });
            });
            
            
            // initialize add event popup common trigger 
            routing.off('add-event');
            routing.on('add-event', function(id,sports_id,users_id, callback) {
            	//alert(id+"--"+sports_id +"--"+ users_id);
            	 var addGameview = new AddEventController({
		             "sports_id": sports_id,
		            "users_id" : users_id,
                	popup: true,
                	callback: callback
                });
            });
        },

	    checkForUser: function() {
		    if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
			    return true;
		    else
			    return false;
	    },

        defaultRoute: function () {
            this.initApp();
        },
        
        initApp: function (action) {
            //this.showProfile();
           	//this.showGame();
            //this.showTeam();
           // alert("this profile");
	        ga('send', 'event', 'app', 'initialized','Browser Reload');
			this.showHome(null);
        },

	    getPhrases: function(){
		    var phrases = new SitePhraseList();
		    phrases.fetch();
	    },
	    showFbreg:function(){
		    ga('send', 'event', 'popup', 'open', 'FB Reg');
            fbregistration = new fbreg();
            fbregistration.signupFacebook();
        },

		gaPageView: function(page,title){
			ga('send','pageview',{
				"page":page,
				"title":title
			});
		},
	    showHome: function (action) {
	    	var self = this;
	    	this.cancelAjaxRequests();
	    	this.loadStyles();
            chromeBootstrap();
            
	    	//self.removeCurrent();
	    	function initHome(id) {
	    		$("body").addClass("homePage");
				var title = "Athletez - We Are Athletez"
	    		self.currentController = new HomeController({
	    			route: "",
	    			title: title,
	    			userId : id
	    		});
			    if(!id && $('div.register-wrapper').length == 0){
				    $('body header').after('<div class="register-wrapper"></div><div class="register-wrapper-h"></div>');
			    }
			    self.gaPageView("Home Page",title);
	    	}
	    	this.initialiRoutesInit(initHome);
	    },
	    
	    removeCurrent: function() {
	    	if(this.currentController) {
	    		console.log(this.currentController.layout);
	    	//	this.currentController.remove();
	    	}
	    },
	    
        showProfile: function (userid) {
        	var self = this;
        	this.cancelAjaxRequests();
	        self.loadStyles();
           // $('#main-header').empty();
            //$('#main-content').empty();
           chromeBootstrap();
	        //if(this.currentController) this.currentController.remove();
			function initProfile(headerModelId) {
				Channel('refresh-profilepage').empty();
				var title =  self.getUserName(headerModelId);
                self.currentController = new ProfileController({
	                "userId": (typeof userid != "undefined")?userid:headerModelId,
	                title:title
	            });
				self.gaPageView("Profile Page",title);
            }
            this.initialiRoutesInit(initProfile);
        },
		hideSignup : function(){
		    $('div.register-wrapper').remove();
		    $('div.register-wrapper-h').remove();
	    },
        
        notFound: function(page) {
        	alert("Page not found");
        },
        
         showTeam: function(id) {
         	var self = this;
            this.cancelAjaxRequests();
			this.loadStyles();
           // alert('test showteam');
            chromeBootstrap();
            if(!id) { 
            	this.notFound('team');
            	return; 
            }
            self.removeCurrent();
            function initTeam(headerModelId) {
            	
                self.currentController = new TeamController({
                    "teamId": id,
                     title: "Team Page",
                    "userId": headerModelId
                });
	            self.gaPageView("Team Page","NA");
            }
            this.initialiRoutesInit(initTeam);
           // Channel('app-inited').subscribe(initTeam);
        },
        
        
		imageUpListeners: function () {
            function showImage(url,attr, data) {
                var imageController = new ImageController({"route": "","url":url,"attr":attr, data: data});
            }
			this.addImageTrigger(showImage);
        },
        
        addImageTrigger: function(fn) {
        	routing.off('add-image');
            routing.on('add-image', function(url, attr, data) {
            	console.log(url, attr, data);
	            if(!this.checkForUser()) {
		            routing.trigger('showSignup');
		            //$(".signup-email").trigger('click');
		            return;
	            }
            	fn(url , attr, data);
            });
        },
		
        showProfileSetting: function (userid) {
            this.cancelAjaxRequests();
            this.loadStyles();
           
            chromeBootstrap();
			 this.removeCurrent();
	        var _self = this;
            function initProfileSetting(id) {
               self.currentController = new ProfileSetting({
                	"id": userid==undefined ? id : userid,
                	title: "Profile Settings"
                });
	            _self.gaPageView("Profile Settings","NA");
            }
            this.initialiRoutesInit(initProfileSetting);
            //Channel('app-inited').subscribe(initProfileSetting);
        },
        
        ShowUserResume: function (userid) {
            this.cancelAjaxRequests();
            this.loadStyles();
            chromeBootstrap();
			this.removeCurrent();
            function initUserResume(id) {
            	
                self.currentController = new UserResume({
                	"id": userid==undefined ? id : userid
                });
	            self.gaPageView("User Resume Page","NA");
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
		triggerSignup:function(){
			//ga('send', 'event', 'menu', 'Sign Up','Action-Triggered');
			this.signup = new header();
			routing.off('showSignup');
            routing.on('showSignup', function() {
              try{
		  				this.signup.signupUser();
		    		}
		    		catch(e){
		    			try{
							console.log(e);
						}
						catch(e){
							console={};
							console.log=function(e){};
						}
		    		}	 

            });
		},
	    videoPreview: function () {
		   
             this.cancelAjaxRequests();
            this.loadStyles();
             // chromeBootstrap();
		    //$('body').empty();
           // chromeBootstrap();
		    //console.log(VideoPreviewController);
			var self = this;
		    function initVideoPreview(url,attr) {

				if(!self.checkForUser()) {
					routing.trigger('showSignup');
					//$(".signup-email").trigger('click');
					return;
				}
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
	        var _self = this;
            function initGame(headerModelId) {
                self.currentController = new GameController({
                    "route": "",
                    "gameId" : id,
                    title: "Game Page",
                    "userId": headerModelId
                });

	            _self.gaPageView("Game Page","NA");
            }
             this.initialiRoutesInit(initGame);
        },

        showRegistration: function() {
	        ga('send', 'event', 'popup', 'Registration');
        	this.cancelAjaxRequests();
            this.loadStyles();
            chromeBootstrap();
             this.removeCurrent();
            function initRegistration() {
                self.currentController = new RegistrationController({
                    "route": "",
                    title: "Register"
                });
	            self.gaPageView("Registration Page","NA");
            }
            this.initialiRoutesInit(initRegistration);
        },
        
        showTag: function (userid) {
           this.cancelAjaxRequests();
            this.loadStyles();
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
	        ga('send', 'event', 'popup', 'Add Game','',userid);
        	this.cancelAjaxRequests();
        	this.loadStyles();
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
        RefreshHome:function(){
          chromeBootstrap();  
        },
        showHomeRefresh:function(){
           // this.addHomeTrigger(this.RefreshHome)
            //this.addHomeTrigger(this.showHome);
            this.addHomeTrigger(this.initApp);
        },
        addHomeTrigger: function(fn) {
            routing.off('reload-home');
            routing.on('reload-home', function() {
                fn();
            });
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
        callLogout:function(){
	      ga('send', 'event', 'menu', 'Log Out','Action-Triggered',routing.userLoggedIn);
          this.logout= new LoginController();
          routing.trigger('Logout');
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
