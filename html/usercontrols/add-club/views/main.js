/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define(['require', 'text!usercontrols/add-club/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 
 'usercontrol/add-club/collections/complevel', 'usercontrol/add-club/models/adress',
 'usercontrol/add-club/models/add',
 'usercontrol/dropdown/view/dropdown' ], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$, CompLevel = require('usercontrol/add-club/collections/complevel'),
	AdressModel = require('usercontrol/add-club/models/adress'),
	AddModel = require('usercontrol/add-club/models/add'),
	DropDownList = require('usercontrol/dropdown/view/dropdown');
	//Models
	PhotoPlayerView = SectionView.extend({
		template : layoutTemplate,
		events : {
			'click .verify-address-h' : 'verifyAddress',
			'click .finish-h': 'addClub',
			'blur .address-h': 'verifyAddress'
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			this.model = options.model;
			this.id = options.id;
			this.addType = options.addType;
			this.addressValid = false;
			SectionView.prototype.initialize.call(this, options);
			this.setUpMainView();
			this.render();
			this.setProfiles();
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
			addModel.set(data);
			addModel.save();
			$.when(addModel.request).done(function() {
				alert(_self.addType+" added successfully");
			});
		},
		
		// verify address
		verifyAddress: function(callback) {
			var _self = this, address = _self.$el.find('.address-h').val(), adressModel = new AdressModel();
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
				console.log(adressModel.toJSON());
				_self.locationId = adressModel.get("payload").id;
				if(_self.locationId) {
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
               		var a = {};
               		a.name = [];
               		a.id = [];
               		//for(var j in json[0].payload[i].seasons) {
               		//	a.name.push(json[0].payload[i].seasons[j].name);
               		//	a.id.push(json[0].payload[i].seasons[j].id);
               		//}
               		//data.records.push({payload: {id: a.id.join(","), name: a.name.join(",")}});
               		data.records.push({payload:{id: json[0].payload[i].id, name: json[0].payload[i].name}});
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
		
		// get comp levels
		getCompLevels: function() {
        	 var _self = this;
            _self.compLevel = new CompLevel();
            _self.compLevel.fetch();
            
            $.when(_self.compLevel.request).done(function() {
            	console.error(_self.compLevel);
            	
            	var json = _self.compLevel.toJSON(), data = {};
               data.records = [];
               for(var i in json[0].payload) {
               		//var a = {};
               		//a.name = [];
               		//a.id = [];
               		//for(var j in json[0].payload[i].levels) {
               		//	a.name.push(json[0].payload[i].levels[j].name);
               		//	a.id.push(json[0].payload[i].levels[j].id);
               		//}
               		//data.records.push({payload: {id: a.id.join(","), name: a.name.join(",")}});
               		data.records.push({payload:{id: json[0].payload[i].id, name: json[0].payload[i].name}});
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
