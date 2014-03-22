/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrol/location/templates/get-view-location.html', 'facade', 'views', 'utils', 'vendor', 'usercontrol/location/models/verify-adress'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	verifyAddress = require('usercontrol/location/models/verify-adress'),
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
			'blur .address-h': 'verifyAddress'
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;
			_self.location = {};
			
			if(options.callback) this.callback = options.callback;
				
			_self.location.latitude = (!_.isUndefined(options) && !_.isUndefined(options.latitude))?options.latitude:undefined;
			_self.location.longitude = (!_.isUndefined(options) && !_.isUndefined(options.longitude))?options.longitude:undefined;
			_self.setOptions(options);
			_self.render();
		},		
		
		intializeMap: function() {
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
			_self.callback("");
			$.when(_self.adressModel.request).done(function() {
				console.log(_self.adressModel.toJSON());
				_self.locationId = _self.adressModel.get("payload").id;
				if(_self.locationId) {
					_self.$el.find('.address-error-status-h').addClass('hide');
					_self.$el.find('.address-h').removeClass('address-field-error').addClass('address-verified');
					_self.location.latitude = _self.adressModel.get("payload").lat;
					_self.location.latitude = _self.adressModel.get("payload").lon;
					_self.$el.find('.set-address-h').removeClass('link-disabled');
					_self.callback(_self.locationId);
					if(_self.map) {
						var pos = new google.maps.LatLng(_self.adressModel.get("payload").lat, _self.adressModel.get("payload").lon);
						_self.marker.setPosition(pos);
						_self.map.panTo(pos);
					} else {
						_self.createMap();
					}
				}
			});
		},
		
		createMap: function() {
			var _self = this;
			var pos = new google.maps.LatLng(_self.location.latitude, _self.location.latitude),
			mapOptions = {
			    zoom: 13,
			    center: pos,
			    scaleControl: true,
			    zoomControl: true,
				scrollwheel: false,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
			  this.$el.find('#map-canvas-h').show();
			  this.map = new google.maps.Map(document.getElementById('map-canvas-h'), mapOptions);
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
