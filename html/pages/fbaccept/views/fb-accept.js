/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require',
	'text!fbAccept/templates/layout.html',
	'text!fbAccept/fb-accept.css',
	"signup/models/registerbasic",
	"signup/views/registerbasic",
	'facade',
	'views',
	'utils',
	'vendor'], function(require) {

	var facade = require('facade'), views = require('views'),
		SectionView = views.SectionView, utils = require('utils'),

		signupBaseModel = require("signup/models/registerbasic"),
		signupBaseView=require("signup/views/registerbasic"),

		Channel = utils.lib.Channel, vendor = require('vendor'),
		Mustache = vendor.Mustache, $ = facade.$;

	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!fbAccept/templates/layout.html');
	//Models

	return BaseView.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click #browse":"closePopup",
			"click #sign-in":"signIn"
		},
		
		cssArr : [],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			Channel('load:css').publish(this.cssArr);
			_self = this;
			// get the user detail if fbid is defined
			_self.data = {};
			_self.data.firstname = options.firstname;
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},
		
		

		//render displays the view in landing
		render : function() {
			var _self = this, markup = Mustache.to_html(_self.template,_self.data);
			this.el = markup;
			return this;
			//markup should open up in a popup
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		showReg: function(data)
		{
			this.regModel = new signupBaseModel();

			this.regView = new signupBaseView({
				model : this.regModel,
				data: data,
				name : "Select Registration Type",
				destination : "#reg-landing",
				openAsaPage: true,
				showOnLanding:true
			});
		},

		signIn: function(e){
			this.regView.showLogin(e);
		},

		closePopup:function(){
			console.log("close popup");
			routing.trigger('common-popup-close');
		}
	});
});