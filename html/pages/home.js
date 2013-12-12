//Home Controller

define(
		[ "require", 
		  "text!pages/home/templates/layout.html", 
		  
		  "facade",
		  "controller", 
		  "models", 
		  "views", 
		  "utils",

		  //models
		  "pages/home/models/menu",
		  "packages/location/models/city",
		  "signup/models/registerbasic",

		  //collections
		  "packages/sport/collections/sports",
		  "pages/home/collections/image",
		  "location/collections/states",

		  //views
		  "pages/home/views/menu",
		  "pages/home/views/image-list",
		  "pages/home/views/state-list",
		  "packages/sport/views/sport-list",
		  "signup/views/registerbasic",
		  "packages/location/views/city"],
		function(require, pageLayoutTemplate) {

			var HomeController, 
				facade = require("facade"), 
				Controller = require("controller"), 
				models = require("models"), 
				views = require("views"), 
				utils = require("utils"),
				
				//collections
				SportList = require('packages/sport/collections/sports'), 
				StateList = require('location/collections/states'),
				ImageList = require('pages/home/collections/image'), 
	
				//models
				MenuModel = require("pages/home/models/menu"), 
				CityModel = require('packages/location/models/city'), 
				signupBaseModel=require("signup/models/registerbasic"),
				
				//views
				MenuView = require("pages/home/views/menu"), 
				signupBaseView=require("signup/views/registerbasic"),
				ImageListView = require("pages/home/views/image-list"),
				StateListView = require('pages/home/views/state-list'), 
				SportListView = require('packages/sport/views/sport-list'), 
				CityView = require('packages/location/views/city'), 
				LayoutView = views.LayoutView, 
				
				$ = facade.$, 
				_ = facade._, 
				Channel = utils.lib.Channel, 
				cssArr = [ base_url + 'pages/home/home.css' ];

			HomeController = Controller.extend({
				searchPage: 0,
				initialize : function(options) {
					Channel('load:css').publish(cssArr);
					_.bindAll(this);
					
					 // setParams Array in current class
					if(options.params) this.setParamsArray(options.params);
					this.handleOptions(options);
					if(options.userId) this.userId = options.userId;
					this.scheme = [];
					this.genderTypes = ['boys', 'girls', 'both'];
					this.init();
					return this;
				},

				init : function() {
					this.initUrlOptions();
					this.createData();
					this.handleDeferreds();
				},
				
				initUrlOptions : function() {
					this.searchUrls = ['/api/video/search', 
					                   '/api/image/search', 
					                   '/api/user/search', 
					                   '/api/game/search',
										'/api/team/search'];
										
					var base = (!_.isUndefined(this.base) && (this.base != "" || this.base == 0))?this.base:1;					
					this.baseUrl = this.searchUrls[base];
					//else
					//this.baseUrl = 1;
					this.urlOptions = {
						sports_id : this.sports_id || '0',
						cities_id : this.cities_id || '0',
						orderby : this.orderby || 'random',
						time : this.time || 'DAY',
						states_id : this.states_id || '0',
						searchtext : this.searchtext || '',
						country_id : this.country_id || '0'
					};
					
					this.urlOptionByPageView = {
						restype : ["base"],
						location : ["cities_id", "states_id", "country_id"],
						view : ["orderby"],
						sports : ["sports_id"]
					};
					
					
					this.menuValues = [
						{page: 'view', src : '.view-options-h .browse.select', target: '.view-link-h .option-heading-h', input: false, defaultValue: 'ORDER'},
     					{page: 'sports', src: '.sports-option-h .sport.select', target: '.sport-link-h .option-heading-h', input: false, defaultValue: 'ALL SPORTS'},
     					{page: 'location', src: '#city', target: '.location-link-h .option-heading-h', input: true, defaultValue: 'PLACE'},
						{page: 'restype', src: '#resulttype a.restype.select', target: '.restype-link-h .option-heading-h', input: false, defaultValue: 'ATHLETES'}
					];

					this.viewOptions = ['orderby', 'time'];
					this.sportsOptions = ['sports_id'];
					this.locationOptions = ['cities_id', 'states_id', 'country_id'];
				},
				
				addSubscribers : function() {
					var _self = this;
					_.each(this.genderTypes, function(viewName) {
						Channel('sportChanged:'+this.collections[viewName].cid, 'unique').subscribe(this.changeSportFilter);						
					}, this);
					
					Channel('cityChanged:'+ this.sections['city'].id, 'unique').subscribe(this.changeCityFilter);

					routing.off("stateChanged");
					routing.on("stateChanged", function( id ) {
						_self.changeStateFilter(id);
					});
					Channel('resetIndividual', 'unique').subscribe(this.updateIndividual);
					Channel('textChanged', 'unique').subscribe(this.updateText);
					Channel('viewFilterChanged', 'unique').subscribe(this.changeViewFilter);
					Channel('baseUrlChanged', 'unique').subscribe(this.updateBaseUrl);
					Channel('resetFilter', 'unique').subscribe(this.resetFilter);
				},
				
				setupScheme: function () {
		            var i, params = this.params;
		            for (i = 0; i < this.meta.activeViews.length; i++) {
		                this.scheme.push(this.sections[this.meta.activeViews[i]]);
		            };
				},
		        
		        updateIndividual: function(page) {
		        	for(var i in this.menuValues) {
		        		if(this.menuValues[i].page == page) {
							if(this.menuValues[i].input) {
								$(this.menuValues[i].src).val("");
							} else {
								$(this.menuValues[i].src).removeClass("select");
							}
						}
					}
					
					switch(page) {
						case 'view':
							for(var i in this.viewOptions) {
								if(this.viewOptions[i] == "orderby") {
									$(".dropdown-menu .browse").removeClass('select');
									this.urlOptions[this.viewOptions[i]] = "random";
								} else if(i == "time")
									this.urlOptions[this.viewOptions[i]] = "today";
							}
						break;
						case 'sports':
							for(var i in this.sportsOptions) {
								this.urlOptions[this.sportsOptions[i]] = "0";
							}
						break;
						
						case 'restype':
							this.baseUrl = this.searchUrls[0];
						break;
						case 'location':
							for(var i in this.locationOptions) {
								this.urlOptions[this.locationOptions[i]] = "0";
							}
						break;
					}
					
					this.updateUrlAfterReset(this.urlOptionByPageView[page]);
		        	this.transitionView();
		        },
		        
				updateUrlAfterReset: function(arr) {
					// to manage the params on url
					var currentHashUrl = window.location.hash;
					if(arr && arr.length) {
						for(var i in arr) {					
							var p = new RegExp(arr[i]+"\/[0-9a-zA-Z]+\/", "i"),
							p1 = new RegExp(arr[i]+"\/[0-9a-zA-Z]+", "i");
							if(p.test(currentHashUrl)) {
								currentHashUrl = currentHashUrl.replace(p,"");					
							} else if(p1.test(currentHashUrl)) {
								currentHashUrl = currentHashUrl.replace(p1,"");					
							}
						}
					}
					routing.navigate(currentHashUrl, {trigger: false});
				},		        
		        
		        
		        initSections : function () {
		        	this.setupMenuView();
		        	_.each(this.genderTypes, this.setupSportListView);
		        	_.each(['top-rated', 'search-result'], this.setupImageListView);
		        	this.setupLocationDDView();
		        	this.setupScheme();
		        	this.setupLayout().render();
		        	this.setUpRegistrationView();
		        	
		        	if(this.cityView) this.cityView.initPlugin();
		        	if(this.userId) $(".register-wrapper, .register-wrapper-h").hide().html("");
		        },
		        
		        updateBaseUrl : function(urlNumber) {
		        	this.baseUrl = this.searchUrls[urlNumber];
		        	var options = {'base': urlNumber};
		        	this.transitionView(options);
		        },
		        
		        updateText : function(text) {
		        	this.urlOptions.searchtext = text;
		        	var options = {'searchtext': text};
		        	this.transitionView(options);
		        },
		        
		        changeViewFilter : function(str) {
		        	if(str.submenu === 'browse') {
		        		options = {'orderby': str.value};
		        	} else {
		        		options = {'time' : str.value};
		        	}
			        if(options.orderby == 'random') $('.left-arrow-page').fadeOut();
			        else $('.left-arrow-page').fadeIn();
		        	this.transitionView(options);
		        },
		        
		        changeSportFilter : function(model) {
		        	var options = {'sports_id': model.attributes.payload.sport_id};
		        	this.transitionView(options);
		        },
		        
		        changeStateFilter : function(id) {
		        	var options = {'states_id' : id};
		        	this.transitionView(options);
		        },
		        
				changeCityFilter : function(item) {
					$(".menu-detail-h").hide();
					$(".reset-option-btn-h[data-type=city]").removeClass("hide");
					if(item.label)
						$("#city").val(item.label);
						
					var options = {'cities_id':item.id, 'states_id': item.state_id, 'country_id': item.country_id};
					this.transitionView(options);
				},
				
				resetFilter: function(page) {
					for(var i in this.menuValues) {
						if(this.menuValues[i].input) {
							$(this.menuValues[i].src).val("");
						} else {
							$(this.menuValues[i].src).removeClass("select");
						}
					}
					
					switch(page) {
						case 'view':
							for(var i in this.viewOptions) {
								if(this.viewOptions[i] == "orderby") {
									$(".dropdown-menu .browse").removeClass('select');
									this.urlOptions[this.viewOptions[i]] = "random";
								} else if(i == "time")
									this.urlOptions[this.viewOptions[i]] = "today";
							}
						break;
						case 'sports':
							for(var i in this.sportsOptions) {
								this.urlOptions[this.sportsOptions[i]] = "0";
							}
						break;
						case 'location':
							for(var i in this.locationOptions) {
								this.urlOptions[this.locationOptions[i]] = "0";
						}
						break;
					}
					this.removeParamsFromUrl();
					this.transitionView();
				},

				transitionView : function(options) {
					this.searchPage = 0;
					this.searchView(options);
				},
				
				// to manage the params on url
				manageHomePageUrl: function(options) {
					var sl, currentHashUrl = (window.location.hash.match("home"))?window.location.hash: window.location.hash+ "/!home";
					currentHashUrl = (currentHashUrl.match("search"))?currentHashUrl:currentHashUrl+"/search";
					if(options) {
						for(var i in options) {
							if(!_.isUndefined(options[i]) && (options[i] != "" || options[i] == "0")) {
								var p = new RegExp(i+"\/(.*)[0-9a-zA-Z]", "i"),
								p1 = new RegExp(i+"\/(.*)[0-9a-zA-Z]", "i");
								if(p.test(currentHashUrl)) {
									currentHashUrl = currentHashUrl.replace(p,i+'/'+options[i]);					
								} else if(p1.test(currentHashUrl)) {
									currentHashUrl = currentHashUrl.replace(p1,i+'/'+options[i]);					
								} else {
									sl = (currentHashUrl[currentHashUrl.length-1] != "/")?"/":"";
									currentHashUrl += sl+i+'/'+options[i];
								}
							}
						}
					}
					routing.navigate(currentHashUrl, {trigger: false});
				},
				
				removeParamsFromUrl: function() {
					routing.navigate("!home", {trigger: false});	
				},
				
				searchView: function(options) {
					var _self = this, viewName = 'search-result',
					    imageList = this.collections[viewName];
					    controller = this;

					this.manageHomePageUrl(options);
					imageList.url = this.url(options);
					//console.error(options);
					imageList.targetElement = "#search-result";
					imageList.fetch();
					var media_id = media_id || null;
					$.when(imageList.request).done(function() {
						if(imageList.length < 12)
							$(".right-arrow-page-h").addClass("disable-arrow-link");
						else
							$(".right-arrow-page-h").removeClass("disable-arrow-link");							
							
						if(_self.searchPage == 0 || controller.urlOptions.orderby=='random')
							$(".left-arrow-page-h").addClass("disable-arrow-link");
						else
							$(".left-arrow-page-h").removeClass("disable-arrow-link");														
							 
						var view = new ImageListView({
							collection : imageList,
							name : viewName,
							destination : '#'+viewName,
							user_id : this.userId,
							media_id: media_id,
							pageName: "home"
						});
						controller.layout.transition(viewName, view);
						
					});
					for(var i in this.menuValues) {
						if(this.menuValues[i].input) {
							var val = $(this.menuValues[i].src).val();
						} else {
							var val = $(this.menuValues[i].src).text();
						}
						
						if(val != '') {
							$(this.menuValues[i].target).html(val);
						} else {
							$(this.menuValues[i].target).html(this.menuValues[i].defaultValue);
						}
					}
				},
				
				bindCickEvents: function() {
					var _self = this;
					$(document).on("click", ".left-arrow-page-h", function() {
						_self.searchPage-=12;
						_self.searchView();
					});
					
					$(document).on("click", ".right-arrow-page-h", function() {
						_self.searchPage+=12;
						_self.searchView();
					});
					
					
					if(_self.searchPage == 0)
						$(".left-arrow-page-h").addClass("disable-arrow-link");
					else
						$(".left-arrow-page-h").removeClass("disable-arrow-link");	
				},
				
				url : function(options) {
					var base = this.baseUrl + '?offset='+this.searchPage+"&";
					_.extend(this.urlOptions, options);
					var tail = [];
					 $.each(this.urlOptions, function(key, value) {
						    tail.push(key + "=" + encodeURIComponent(value));
						  });
					base += tail.join('&');
					if(this.media_id) {
						base += "&media_id="+this.media_id;
					}
					return base;
				},
				
				createData : function() {
					var _self = this;
					_self.collections = {};
					_self.collections['search-result'] = new ImageList([], {
						url : _self.url(),
						num : '12',
						media_id: _self.media_id,
						targetElement: "#search-result"
					});
					
					_self.collections['state'] = new StateList(); 
					_self.collections['top-rated'] = new ImageList([], {
						url : '/api/user/search',
						num : '4',
						targetElement: "#top-rated"
					});
					
					_.each(_self.genderTypes, function(name) {
						_self.collections[name] = new SportList([], {name : name});
					});
				},

				handleDeferreds : function() {
					var controller = this;
					var requests = [];
					_.each(this.collections, function(value, key, list){
							requests.push(value.fetch());
					});
					$.when.apply($, requests).done(controller.initSections, controller.addSubscribers);
				},

				setupImageListView : function(viewName) {
					var imageListView;
					imageListView = new ImageListView({
						collection : this.collections[viewName],
						name : viewName,
						destination : '#'+viewName,
						user_id : this.userId,
						media_id: this.media_id,
						pageName: "home"
					});
					
					imageListView.render();
					this.sections[viewName] = imageListView;
					this.meta.activeViews.push(viewName);					
				},
				
				setupSportListView : function(viewName) {
					var sportListView;
					sportListView = new SportListView({
						collection : this.collections[viewName],
						name : viewName,
						id : viewName,
						sports_id: this.sports_id,
						destination : '#sport #'+ viewName
					});

					sportListView.render();
					this.sections[viewName] = sportListView;
					this.meta.activeViews.push(viewName);
				},
				
				setUpRegistrationView: function() {
					var registerView;
					 this.select_type = new signupBaseModel();
					///registerView = new signupBaseView({
					//	model : this.select_type,
					//	name : 'register View',
						//id : viewName,
					//	destination : '.register-wrapper-h'
					//});

					//registerView.render();
					//this.sections['register View'] = registerView;
					//this.meta.activeViews.push('register View');
					
					this.selectTypeView = new signupBaseView({
							model : this.select_type,
							name : "Select Registration Type",
							destination : ".register-wrapper-h",
							openAsaPage: true
						});
				},

				setupMenuView : function() {
					var menuModel = new MenuModel(),
						menuView,
						viewName = 'menu', options = this.urlOptions;
						
					options.base = this.base;	
					menuView = new MenuView({
						model : menuModel,
						name : viewName,
						destination : '#'+viewName,
						options: options
					});
					
					menuView.render();
					this.sections[viewName] = menuView;
					this.meta.activeViews.push(viewName);
				},

				setupLocationDDView : function() {
					var stateListView,
					    stateViewName = 'state',
					    cityModel = new CityModel(),
					    cityViewName = 'city';
					
					this.cityView = new CityView({
						model : cityModel,
						name : cityViewName,
						destination : "#location .city"
					});
					this.cityView.render();
					this.sections[cityViewName] = this.cityView;
					this.meta.activeViews.push(cityViewName);
				},

				setupLayout : function() {
					var pageLayout;
					pageLayout = new LayoutView({
						scheme : this.scheme,
						destination : "#main",
						template : pageLayoutTemplate,
						displayWhen : "ready"
					});
					this.layout = pageLayout;
					this.bindCickEvents();
					return this.layout;
				}

			});

			return HomeController;
		});