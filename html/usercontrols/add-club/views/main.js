/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define(['require', 'text!usercontrols/add-club/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 
 'usercontrol/add-club/collections/complevel', 'usercontrol/add-club/models/adress',
 'usercontrol/add-club/models/add',
 'usercontrol/dropdown/view/dropdown', 'profilesetting/collections/sports' ], function(require, layoutTemplate) {
 	
	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$, CompLevel = require('usercontrol/add-club/collections/complevel'),
	AdressModel = require('usercontrol/add-club/models/adress'),
	AddModel = require('usercontrol/add-club/models/add'),
	SportsCollection = require('profilesetting/collections/sports'),
	DropDownList = require('usercontrol/dropdown/view/dropdown');
	//Models
	PhotoPlayerView = SectionView.extend({
		template : layoutTemplate,
		events : {
			'click .verify-address-h' : 'verifyAddress',
			'click .finish-h': 'addClub',
			'blur .address-h': 'verifyAddress'
		},
		
		stateData: {},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			this.model = options.model;
			this.id = options.id;
			this.addType = options.addType;
			this.callback = options.callback;
			this.viewObj = options.viewObj;
			this.addressValid = false;
			SectionView.prototype.initialize.call(this, options);
			this.setUpMainView();
			this.render();
			this.setProfiles();
			if(this.addType != "school") {
				this.$el.find(".sports-select-h").removeClass("hide");
				this.showSportsList();
			}
		},
		
		openLocationPopup: function(latitude, longitude) {
        	var _self = this;
        	routing.trigger('show_location', latitude, longitude, '.location-map-h', function() {
        	});
        },
		
		// add club and school
		addClub: function() {
			var _self = this, submit = true;
			if(this.$el.find(".name-h").val() == "") {
				alert("Please enter name.");
				return false;
			}
			
			if(!this.addressValid) {
				alert("Please choose valid address");
				return false;
			} else {
				this.verifyAddress(function() {
					if(submit)
						_self.saveData();
				});
			}
		},
		
		// save data
		saveData: function() {
			var _self = this, addModel = new AddModel(), data = {};
			data.name = this.$el.find(".name-h").val();
			data.complevel_profiles_id = this.$el.find("#comp-levels-h").val();
			data.location_id = _self.locationId;
			data.season_profiles_id = this.$el.find("#profile-h").val();
			data.sports_club = (_self.addType == "school")?'0':'1';
			if(this.addType != "school") {
				data.single_sport_id = this.$el.find("#sports-h").val();
			}
			addModel.set(data);

			addModel.save();
			$.when(addModel.request).done(function() {
				console.log(addModel.get("payload"));
				var d = addModel.get("payload");
				data.locationState = _self.stateData;
				data.org_id = d.id;
				if(_self.callback) _self.callback(data);
				alert(_self.addType+" added successfully");
				routing.trigger('popup-close');
			});
		},
		
		// verify address
		verifyAddress: function(callback) {
			var _self = this, address = _self.$el.find('.address-h').val(), adressModel = new AdressModel();
			_self.stateData = {};
			adressModel.address = address;
			adressModel.url();
			adressModel.set({address: address});
			
			adressModel.showError = function(model, error) {
				try {
					_self.$el.find('.address-error-status-h').removeClass('hide').html(error.responseJSON.exec_data.error_array[0].error);
				} catch(e) {}
				_self.$el.find('.address-h').addClass('address-field-error').removeClass('address-verified');
			};
			
			adressModel.save({dataType:"json"});
			_self.$el.find('.address-h').removeClass('address-verified');
			$.when(adressModel.request).done(function() {
				_self.locationId = adressModel.get("payload").id;
				_self.stateData = adressModel.get("payload").states_obj;
				if(_self.locationId) {
					if(typeof callback != "function") 
						_self.openLocationPopup(adressModel.get("payload").lat, adressModel.get("payload").lon);
					_self.$el.find('.address-error-status-h').addClass('hide');
					_self.$el.find('.address-h').removeClass('address-field-error').addClass('address-verified');
					_self.addressValid = true;
					if(typeof callback == "function") callback();
				} else {
					_self.addressValid = false;
				}
			});
		},
		
		// set profile view dropdowns
		setProfiles: function() {
        	 var self = this, record = self.model.toJSON(), json = self.model.toJSON();
                var data = {};
               data.records = [];
               for(var i in json[0].payload) {
   					var name = [];
   					for(var j in json[0].payload[i].seasons) {
   						name.push(json[0].payload[i].seasons[j].name);
   					} 
					data.records.push({payload:{id: json[0].payload[i].id, name: name.join(", ")}});
   					           		
               }
               
               data.recordId = 'id';
			   data.recordValue = 'name';
               var DropDown = new DropDownList({
					data: data,
					title: "Club's Season Profile",
					elementId: "profile-h",
					destination: '.profile-h',
					targetView: self,
					callback: function(result) {
						self.getCompLevels();
					}
				});
        },
        
        showSportsList: function() {
        	//sports-h
			var _self = this, data = {}, List = new SportsCollection();
			 data.records = [];
			 data.records.push({payload:{id: "0", name: "Multiple sports"}});
			//this shows all sports if it is a club.
			List.sport_type =  0;
			List.sport_type_id = List.sport_type;
			List.male = 1;
			List.female = 0;
			if (_self.viewObj.gender == "male") {
				List.male = 1;
			} else if (_self.viewObj.gender == "famale") {
				List.female = 0;
			}
			List.fetch();
			$.when(List.request).done(function() {
				if (List.isError()) return;
				var models = List.toJSON();
				_self.sports = [];
				for (var key in models) {
					data.records.push({payload:{id: models[key].payload.id, name: models[key].payload.sports_name}});
				}
			   data.recordId = 'id';
			   data.recordValue = 'name';
               var DropDown = new DropDownList({
					data: data,
					title: "Select Sports",
					elementId: "sports-h",
					destination: '.sports-h',
					targetView: _self,
					callback: function(result) {
						//self.getCompLevels();
					}
				});
			});               
        },
		
		// get comp levels
		getCompLevels: function() {
        	 var _self = this;
            _self.compLevel = new CompLevel();
            _self.compLevel.fetch();
            
            $.when(_self.compLevel.request).done(function() {
            	var json = _self.compLevel.toJSON(), data = {};
               data.records = [];
               for(var i in json[0].payload) {
               		var name = [];
   					for(var j in json[0].payload[i].levels) {
   						name.push(json[0].payload[i].levels[j].name);
   					}
					data.records.push({payload:{id: json[0].payload[i].id, name: name.join(", ")}});               		
               		//for(var j in json[0].payload[i].levels) {
   					//	data.records.push({payload:{id: json[0].payload[i].id, name: json[0].payload[i].levels[j].name}});
   					//}
               }
            	
               data.recordId = 'id';
			   data.recordValue = 'name';
               var DropDown = new DropDownList({
					data: data,
					title: "Team",
					elementId: "comp-levels-h",
					//selectedValue: self.model.id,
					destination: '.comp-levels-h',
					targetView: _self,
					callback: function(result) {
					}
				});
            });
        },

		// set up main view
		setUpMainView : function() {
			var self = this;
			var data = {};
			data.type = self.addType;
			var markup = Mustache.to_html(self.template, data);
			$(self.$el).html(markup);
		}
	});
	return PhotoPlayerView;
});
