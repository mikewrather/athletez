/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require',
	'text!usercontrols/landing/templates/landing.html',
	'text!usercontrols/landing/landing.css',
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
		layoutTemplate = require('text!usercontrols/landing/templates/landing.html');
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
		cssArr : ["usercontrols/landing/landing.css"],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			Channel('load:css').publish(this.cssArr);
			_self = this;
			_self.data = {};
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.render();
		},

		//render displays the view in landing
		render : function() {
			var _self = this, markup = Mustache.to_html(_self.template,_self.data);
			//console.error(markup);
			//this.el = markup;
			//console.error(this.el);
			var options = {};
			options.width = "100%";
			options.height = "100%";
			options.title = "&nbsp;";
			options.html = markup;
			options.id = "landing";
			options.addClass = ['noBorder'];

			var rand = Math.ceil(Math.random()*100);
			var bgs = ['1.jpg','2.jpg','3.jpg'];
			console.log(rand,rand % bgs.length);

			options.background_image = "http://cdn.athletez.com/resources/img/landing/" + bgs[rand % bgs.length];
			console.error(options);
			routing.trigger('common-popup-open', options);
			this.$el = $('#landing .modal-body');

			function onPop(){
				Channel('popup-finished-launch-'+options.id).unsubscribe();
				_self.showReg();
			}

			Channel('popup-finished-launch-'+options.id).subscribe(onPop);
			return this;
			//markup should open up in a popup
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		showReg: function()
		{
			this.regModel = new signupBaseModel();

			this.regView = new signupBaseView({
				model : this.regModel,
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