/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrols/location/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 'usercontrols/location/models/verify-adress', 'usercontrols/location/models/save'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	verifyAddress = require('usercontrols/location/models/verify-adress'),
	saveLocation = require('usercontrols/location/models/save'),
	Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, _self;
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			'click .verify-address-h': 'verifyAddress',
			'click .set-address-h' : 'setLocation'
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;
			_self.game_id = options.game_id || undefined;
			_self.location = options;
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},
		
		setLocation: function(e) {
			var r = confirm("Are you sure want to set new address?");
			if(r) {
				if(this.locationId) {
					var model = new saveLocation();
					model.id = this.game_id;
					model.set({locations_id: this.locationId, id: this.game_id});
					model.save();
					$.when(model.request).done(function(){		
						routing.trigger("popup-close");
					});
				}
			}
		},
		
		verifyAddress: function() {
			var _self = this, address = _self.$el.find('.address-h').val();
			_self.adressModel = new verifyAddress();
			_self.adressModel.address = address;
			_self.adressModel.url();
			_self.adressModel.set({address: address});
			_self.adressModel.showError = function(model, error) {
				try {
					_self.$el.find('.set-address-h').addClass('link-disabled');
					_self.$el.find('.address-error-status-h').removeClass('hide').html(error.responseJSON.exec_data.error_array[0].error);
				} catch(e) {}
				_self.$el.find('.address-h').addClass('address-field-error').removeClass('address-verified');
			};
			_self.adressModel.save({dataType:"json"});
			_self.$el.find('.address-h').removeClass('address-verified');
			$.when(_self.adressModel.request).done(function() {
				console.log(_self.adressModel.toJSON());
				_self.locationId = _self.adressModel.get("payload").id;
				if(_self.locationId) {
					_self.$el.find('.address-error-status-h').addClass('hide');
					_self.$el.find('.address-h').removeClass('address-field-error').addClass('address-verified');
					_self.location.latitude = _self.adressModel.get("payload").lat;
					_self.location.latitude = _self.adressModel.get("payload").lon;
					_self.$el.find('.set-address-h').removeClass('link-disabled');
					//_self.$el.find('#map-canvas').unbind().empty();
					//_self.intializeMap();
					var pos = new google.maps.LatLng(_self.adressModel.get("payload").lat, _self.adressModel.get("payload").lon);
					_self.marker.setPosition(pos);
					_self.map.panTo(pos);
				}
			});
		},
		
		intializeMap: function() {
			console.log(_self.location);
			var pos = new google.maps.LatLng(_self.location.latitude, _self.location.longitude),
			mapOptions = {
			    zoom: 13,
			    center: pos,
			    scaleControl: true,
			    zoomControl: true,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
			  
			  this.map = new google.maps.Map(this.$el.find('#map-canvas')[0], mapOptions);
			  this.marker = new google.maps.Marker({position: pos, map: this.map});
  			  this.marker.setMap(this.map);
		},

		//render displays the view in browser
		render : function() {
			var _self = this, markup = Mustache.to_html(_self.template, {'location': _self.locaion});
			$(_self.el).html(markup);
			setTimeout(function() {
				_self.intializeMap();				
			}, 1000);

			return this;
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		}
	});
});
