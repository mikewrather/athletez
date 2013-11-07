/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require', 'text!usercontrols/detection/templates/browser.html','text!usercontrols/detection/browser.css', 'facade', 'views', 'utils', 'vendor','browser'], function(require) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, utils = require('utils'), 
	Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$;
	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!usercontrols/detection/templates/browser.html');
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click .close":"closePopup"
		},
		cssArr : ["usercontrols/detection/browser.css"],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			Channel('load:css').publish(this.cssArr);
			_self = this;
			_self.data = {};
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.populateData();
		},

		populateData: function(){
			var self = this;
			var tryBrowser = setInterval(function(){
				try{
					$.browser.android; //if browser doesn't exist yet this will throw an error
					clearInterval(tryBrowser);
					if($.browser.ipad || $.browser.iphone || $.browser.android){
						self.data.mobile = true;
					}
					if($.browser.msie){
						self.data.old_ie = true;
					}
					if($.browser.mozilla){
						self.data.old_ff = true;
					}
					self.data.current_version = $.browser.version
					self.render();
				} catch(ex){}
			},500);
		},
		//render displays the view in browser
		render : function() {
			var _self = this, markup = Mustache.to_html(_self.template,_self.data);
			//console.error(markup);
			//this.el = markup;
			//console.error(this.el);
			var options = {};
			options.width = "90%";
					options.height = "500px";
					options.title = "Your Browser Might be an Issue";
					options.html = markup;
					options.id = "Browser-detect";
					console.error(options);
					routing.trigger('common-popup-open', options);
			
			return this;
			//markup should open up in a popup
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		closePopup:function(){
			//whatever will close the popup
		}
	});
});
