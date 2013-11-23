// application.js  
// --------------  
// Requires define
// Return {Object} App
define( ["facade", "utils", "collections", "chrome", "controller", "profile", "imageup",'home','videopreview',
	"game", "team", "registration","profilesetting","userresume","packages/site/collections/phrases","usercontrols/tag/tag",
	"usercontrols/addgame/addgame","signup","login", "usercontrols/photo-player/photo-player", "usercontrols/add-club/add-club",
	"utils/storage", 'usercontrols/location/views/view-location','signup/views/facebooksignup',"usercontrols/addevent/addevent",'chrome/views/header',
	'browserpop/views/browser','landingpage/views/landing'],
function (facade, utils, collections, chromeBootstrap, Controller, ProfileController, ImageController, HomeController, VideoPreviewController,
	GameController, TeamController, RegistrationController,ProfileSetting,UserResume, SitePhraseList , TagController,
	AddGameController, SignupController,LoginController,PhotoPlayerController, AddClubController,
	Store, googleMapLocationview,fbreg, AddEventController,header) {

    //App;
    	
        var App, ApplicationStates = collections.ApplicationStates,
        $ = facade.$,
        _ = facade._,
        Backbone = facade.Backbone,
        Channel = utils.lib.Channel,
	    browserView = require('browserpop/views/browser'),
		landingView = require('landingpage/views/landing');
        debug = utils.debug;
   		App = Backbone.Router.extend({
        routes: {
            '': 'defaultRoute',
            'home': 'showHome',
            'home/': 'showHome',
	        '!home/': 'showHome',
            'home/:action': 'initApp',

            
            'profile': 'showProfile',
            'profile/': 'showProfile',
            'profile/:userid': 'showProfile',
	        '!profile/:userid': 'showProfile',

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
	        '!game/:id' : 'showGame',
            
            'team': 'showTeam',
            'team/': 'showTeam',
            //'team/:action': 'showTeam',
            'team/:id' : 'showTeam',
	        '!team/:id' : 'showTeam',
            
            '!registration': 'showRegistration',
            'registration/': 'showRegistration',
	        '!registration/:action': 'showRegistration' ,
	        'registration/:action': 'showRegistration' ,
            
    //        'tag': 'showTag',
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
	       // this.intializeImageAndVideo();
	        this.showLandingInfo();
        },

		detectBrowser: function() {
			var self = this;
			var tryBrowser = setInterval(function(){
				try{
					$.browser.android; //if browser doesn't exist yet this will throw an error
					clearInterval(tryBrowser);

					var showBrowserWindow = showMobileWindow = false;
					if($.browser.ipad || $.browser.iphone || $.browser.android){
						showMobileWindow = true;
					}
					if(!_.isUndefined($.browser.msie) && $.browser.msie){
						if(parseInt($.browser.version) < 10){
							showBrowserWindow = true;
					//		console.log("IE under version 9");
						}
					}
					if(!_.isUndefined($.browser.version) && $.browser.mozilla){
						if(parseInt($.browser.version) < 25){
							showBrowserWindow = true;
					//		console.log("Old Version of FF.");
						}
					}
					if(showBrowserWindow || showMobileWindow){
						self.showBrowserWindow();
					}
				} catch(ex){
					//alert(ex);
				}
			},1000);
		},

		showBrowserWindow: function(){
			var browserPop = new browserView();
			
		},

		showLandingInfo: function(){
			var self = this;
		/*	setTimeout(function(){
				if(!self.checkForUser())
					var landing = new landingView();
			},2000);*/
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
        		//$("#modalPopup, #photoPlayerModal, .modal-backdrop").unbind().remove();
		        $(".modal:not(#Browser-detect)").remove();
		        routing.trigger('common-popup-close');
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
            	routing.trigger('common-popup-close');
            });
            
            routing.off('common-popup-open');
            routing.on('common-popup-open', function(options) {
            	// set the popup title
            	// append HTML
            	if(!options.id)
            		var id = "modal-popup-"+Math.floor(Math.random() * Math.random() * 50 * Math.random() * 50);
            	else
            		var id = options.id;
            		
            	var html = '<div id="'+id+'" class="modal common-modal hide fade model-popup-h in">'+
        		'<div class="modal-header"><a href="javascript: void(0);" title="close" data-id="'+id+'" class="close"'+ 
        		'>&times;</a><h3 class="modal-header-h">Header</h3></div>'+
        		'<div class="modal-body page-content-h" id="modalBody"></div>'+
        		'</div>';
        		
            	$("body").append(html);

	            if(options.addClass != undefined && options.addClass.length){
		            _.each(options.addClass,function(cssclass){
			            console.log(cssclass);
			            $('#'+id).addClass(cssclass);
		            });
	            }
	            
	            if(options.background_image){
		            console.log(options.background_image);
			        $('#'+id).css({
				        'background': 'url(' + options.background_image + ') no-repeat center center fixed #FFF',
				        '-webkit-background-size': 'cover',
				        '-moz-background-size': 'cover',
				        '-o-background-size': 'cover',
				        'background-size': 'cover'
			        });
                }

	            $('#'+id+ ' .close').attr("data-id",id);

            	if(options.title) {
            	  $("#"+id).find(".modal-header-h").html(options.title);
            	   $("#"+id).find(".modal-header").show();
            	} else {
            	  $("#"+id).find(".modal-header").hide();
            	}
            	console.log(options);

            	if(options.width){
		            $("#"+id).css({"width": options.width});

		            var added_width = parseInt($("#"+id).css('border-left'),10) +
			            parseInt($("#"+id).css('border-right'),10) +
			            parseInt($("#"+id).css('padding-left'),10) +
			            parseInt($("#"+id).css('padding-right'),10);

					var true_width;
		            if(options.width.indexOf('%') > 0)
		            {
			            var percentage_number = parseInt(options.width,10);
				        true_width = (window.innerWidth * (percentage_number/100)) + added_width;
		            }
		            else true_width = (parseInt(options.width,10) + added_width);


		            $("#"+id).css({
			            "left":'50%',
			            "margin-left": true_width<window.innerWidth ? -true_width/2 : '-50%'
		            });
	            }

            	if(options.height){
		            $("#"+id).css({"height": options.height});

		            var added_height = parseInt($("#"+id).css('border-top'),10) +
			            parseInt($("#"+id).css('border-bottom'),10) +
			            parseInt($("#"+id).css('padding-top'),10) +
			            parseInt($("#"+id).css('padding-bottom'),10);

		            var true_height;
		            if(options.height.indexOf('%') > 0){
			            var percentage_number = parseInt(options.height,10);
			            true_height = (window.innerHeight * (percentage_number/100)) + added_height;
		            }
					else true_height = (parseInt(options.height,10) + added_height);

		            $("#"+id).css({
			            "top":window.innerHeight/2,
			            "margin-top":true_height<window.innerHeight ? -true_height/2 : -window.innerHeight/2
		            });
		            console.log(true_height<window.innerHeight ? -true_height/2 : '-50%');
	            }

            	// if we have HTML then place it in popup
            	if(options.html) $("#"+id).find("#modalBody").html(options.html);
            	// open modal popup
				$("#"+id).modal('show');

	            if(_.isUndefined(options.slimScroll) || !options.slimScroll) {
		            $("#"+id).find('#modalBody').slimScroll({
			            height:(options.height)?options.height:'400px',
			            railVisible:true,
			            allowPageScroll:true,
			            disableFadeOut:true
		            });
	            }

	            Channel('popup-finished-launch-' + id).publish();

            });
            
            routing.off('common-popup-close');
            routing.on('common-popup-close', function(e) {
				$(".common-modal:not(#Browser-detect)").remove();
  				if(!$(".common-modal").length) $(".modal-backdrop").remove();
            });
            
            $(document).off('hidden.bs.modal', '#modalPopup, #photoPlayerModal');
            $(document).on('hidden.bs.modal', '#modalPopup, #photoPlayerModal', function (e) {
  				routing.trigger('popup-close', e);
			});
            
            $(document).off('.common-modal .close');
            $(document).on('click', '.common-modal .close', function (e) {
  				var id = $(e.currentTarget).data("id");
  				$("#"+id).remove();
  				if(!$(".common-modal").length) {
  					$(".modal-backdrop").remove();
  				}
  				//routing.trigger('popup-close', e);
			});
            
            // initialize add game popup common trigger 
            routing.off('add-game');
            routing.on('add-game', function(id,teams_id,sports_id,users_id, callback) {
            	 var addGameview = new AddGameController({
		            "teams_id":teams_id,
		             "sports_id":sports_id,
		            "user_id" : users_id,
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

            this.detectBrowser();
        },

	    checkForUser: function() {
		    return (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)?true:false;
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
				var title = "Athletez - We Are Athletez";
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
		  				if($("#userlogin").length)
			  				$("#userlogin").trigger('click');
		  				else
		  					if(this.signup.signupUser) this.signup.signupUser();
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
