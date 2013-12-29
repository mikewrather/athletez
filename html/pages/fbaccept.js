// FBInvite Controller
// ---------------
// module as controller for 'registration' package
// Returns {RegistrationController} constructor

define(["require", "text!fbAccept/templates/main.html", "facade", "controller", "models", "views", "utils", "fbAccept/views/fb-accept", 'fbAccept/models/fb-user'], function(require, pageLayoutTemplate) {

	var RegistrationController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"), LayoutView = views.LayoutView, $ = facade.$, _ = facade._, debug = utils.debug, Channel = utils.lib.Channel, cssArr = ["/pages/registration/registration.css", "/pages/fbaccept/fb-accept.css", "/pages/signup/css/signupstyle.css", "/css/style.jrac.css"];
	FBAccept = require("fbAccept/views/fb-accept"),
	FBModel = require('fbAccept/models/fb-user');
	return Controller.extend({
		initialize : function(options) {
			this.popup = (options.popup)?true:false;
			this.userId = (options.userId)?options.userId:undefined;
			
			Channel('load:css').publish(cssArr);
			_.bindAll(this);
			this.ajaxCalls = [];
			this.handleOptions(options);
			this.init();
			return this;
		},

		init : function() {
			ga('send', 'event', 'FB Accept', 'Header', 'Loading reg header');
			this.setupLayout().render();
			this.setupView();
			

			
		},

		setupView : function() {
			var _self = this, model = new FBModel();
			model.fbUserId = this.userId;
			model.fetch();
			
			
			$.when(model.request).done(function() {
				var data = {firstname: model.get("payload").fb_user_data.first_name, lastname: model.get("payload").fb_user_data.last_name};
				_self.acceptView = new FBAccept(data);
				$("#inviteView").html(_self.acceptView.el);
				var rand = Math.ceil(Math.random()*100);
				var bgs = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];
				$("#inviteView").css({"background-image":"url(http://athletez.s3.amazonaws.com/resources/img/landing/" + bgs[rand % bgs.length]+")", "margin-top": "-26px"});
				_self.acceptView.showReg(data);
				/* $("#inviteView > div").slimScroll({
			            height:'90%',
			            railVisible:true,
			            allowPageScroll:true,
			            disableFadeOut:true
		         });*/
			});
		},
		setupLayout : function() {
			this.scheme = [];
			var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#main",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout = pageLayout;
			return this.layout;

		}
	});
});
