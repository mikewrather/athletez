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
			this.addressValid = false;
			SectionView.prototype.initialize.call(this, options);
			this.setUpMainView();
			this.render();
			this.setProfiles();
		},
		
		addClub: function() {
			var _self = this;
			if(!this.addressValid) {
				alert("Please choose valid address");
			} else {
				var addModel = new AddModel();
				addModel.name = "";
				addModel.compLevel = this.$el.find("#comp-levels-h").val();
				addModel.locationId = _self.locationId;
				addModel.club = (self.addType == "school")?1:0;
				addModel.save();
			}
		},
		
		verifyAddress: function() {
			var _self = this, address = _self.$el.find('.address-h').val(), adressModel = new AdressModel();
			adressModel.address = address;
			adressModel.url();
			adressModel.set({address: address});
			adressModel.save();
			_self.$el.find('.address-h').removeClass('address-verified');
			$.when(adressModel.request).done(function() {
				console.log(adressModel.toJSON());
				_self.locationId = adressModel.get("payload").id;
				if(_self.locationId) {
					_self.$el.find('.address-h').addClass('address-verified');
					_self.addressValid = true;
					console.log(adressModel);
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
               		for(var j in json[0].payload[i].seasons) {
               			a.name.push(json[0].payload[i].seasons[j].name);
               			a.id.push(json[0].payload[i].seasons[j].id);
               		}
               		data.records.push({payload: {id: a.id.join(","), name: a.name.join(",")}});
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
		
		getCompLevels: function() {
        	 var _self = this;
            _self.compLevel = new CompLevel();
            _self.compLevel.fetch();
            
            $.when(_self.compLevel.request).done(function() {
            	console.error(_self.compLevel);
            	
            	var json = _self.compLevel.toJSON(), data = {};
               data.records = [];
               for(var i in json[0].payload) {
               		var a = {};
               		a.name = [];
               		a.id = [];
               		for(var j in json[0].payload[i].levels) {
               			a.name.push(json[0].payload[i].levels[j].name);
               			a.id.push(json[0].payload[i].levels[j].id);
               		}
               		data.records.push({payload: {id: a.id.join(","), name: a.name.join(",")}});
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

		setUpMainView : function() {
			var self = this;
			var markup = Mustache.to_html(self.template, {});
			$(self.$el).html(markup);
		}
	});
	return PhotoPlayerView;
});
