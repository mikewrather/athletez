/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrol/location/templates/view-location.html', 'facade', 'views', 'utils', 'vendor'], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, _self;
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;
			_self.game_id = options.game_id;
			_self.location = options;
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},		

		
		intializeMap: function() {
			console.log(_self.location);
			var pos = new google.maps.LatLng(_self.location.latitude, _self.location.longitude),
			mapOptions = {
			    zoom: 13,
			    center: pos,
			    scaleControl: true,
			    zoomControl: true,
				scrollwheel: false,
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
