/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrols/location/templates/layout.html', 'facade', 'views', 'utils', 'vendor', 'usercontrols/location/models/verify-adress'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	verifyAddress = require('usercontrols/location/models/verify-adress'),
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
			console.log(options);
			_self = this;
			_self.location = options;
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},
		
		
		setLocation: function(e) {
			var r = confirm("Are you sure want to set new address?");
			if(r) {
				routing.trigger("popup-close");
			}
		},
		
		verifyAddress: function() {
			var _self = this, address = _self.$el.find('.address-h').val(), adressModel = new verifyAddress();
			adressModel.address = address;
			adressModel.url();
			adressModel.set({address: address});
			
			adressModel.showError = function(model, error) {
				try {
					_self.$el.find('.set-address-h').addClass('link-disabled');
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
					_self.location.latitude = adressModel.get("payload").lat;
					_self.location.latitude = adressModel.get("payload").lon;
					_self.$el.find('.set-address-h').removeClass('link-disabled');
					//_self.$el.find('#map-canvas').unbind().empty();
					//_self.intializeMap();
					
					alert(adressModel.get("payload").lat +"--"+ adressModel.get("payload").lon);
					
					var pos = new google.maps.LatLng(adressModel.get("payload").lat, adressModel.get("payload").lon);
					_self.marker.setPosition(pos);
					_self.map.panTo(pos);
				}
			});
		},
		
		intializeMap: function() {
			
			console.log(_self.location);
			var pos = new google.maps.LatLng(_self.location.latitude, _self.location.longitude),
			mapOptions = {
			    zoom: 8,
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