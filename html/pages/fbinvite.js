// FBInvite Controller
// ---------------
// module as controller for 'registration' package
// Returns {RegistrationController} constructor

define(["require", "text!fbinvite/templates/layout.html", "facade", "controller", "models", "views", "utils", "fbinvite/views/image-video-list", 'fbinvite/collections/fbinvite', 'media/models/image'], function(require, pageLayoutTemplate) {

	var RegistrationController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"), LayoutView = views.LayoutView, $ = facade.$, _ = facade._, debug = utils.debug, Channel = utils.lib.Channel, cssArr = ["/pages/registration/registration.css", "/pages/signup/css/signupstyle.css", "/css/style.jrac.css"];
	ProfileImageListView = require("fbinvite/views/image-video-list"),
	MediaImageModel = require("media/models/image"),
	FBInviteList = require('fbinvite/collections/fbinvite');
	return Controller.extend({
		initialize : function(options) {
			this.popup = (options.popup)?true:false;
			Channel('load:css').publish(cssArr);
			_.bindAll(this);
			this.ajaxCalls = [];
			this.handleOptions(options);
			this.init();
			return this;
		},

		init : function() {
			ga('send', 'event', 'FB Invite', 'Header', 'Loading reg header');
			this.setupLayout().render();
			this.refreshPage();
			this.createData();
			this.handleDeferreds();
		},

		createData : function() {
			this.images = new FBInviteList();
			this.images.targetElement = "#image-wrap";
			this.ajaxCalls.push(this.images.fetch());					
		},

		handleDeferreds : function() {
			
			
			var _self = this;
			$.when(this.images.request).done(function() {
				_self.images.allRecords = _self.images.toJSON();
				_self.setupFriendsList();
				$(".search-friends-h").keyup(function() {
					var v = $(this).val(), i, re = new RegExp(v, "i"),len = _self.images.allRecords.length, arr = [];
					for(var i = 0; i < len; i++) {
						if(re.test(_self.images.allRecords[i].payload.name)) {
							arr.push(_self.images.allRecords[i]);
						}
						if(_self.images.models[i]) _self.images.models[i].destroy();							
					}
					
					
					
					if(arr.length) {
						_self.images.reset(arr);
						_self.setupFriendsList();
						//_self.imageListView.renderTemplate();
						///for(var i in arr) {
						//	var newImageModel = new MediaImageModel();
						//	newImageModel.processItemFromPayload(arr[i]);
						//	_self.images.add(newImageModel);
						//	console.log(_self.images.toJSON());
						//}
					}
				});
			});
			
			
			
		},

		refreshPage : function() {
			var position;
			if (this.selectOrgView) {
				$(this.selectOrgView.destination).html('');
				position = $.inArray(this.selectOrgView, this.scheme);
				if (~position)
					this.scheme.splice(position, 1);
			}
		},

		setupFriendsList : function() {
			var self = this, position;
			if (this.imageListView) {
				$(this.imageListView.destination).html('');
				position = $.inArray(this.imageListView, this.scheme);
				if (~position)
					this.scheme.splice(position, 1);
			}
			
			this.imageListView = new ProfileImageListView({
					collection: this.images,
					destination: "#image-wrap",
					target_id : this.id,
					user_id: this.id,
					name: "images View 2"
			});
			this.scheme.push(this.imageListView);
			this.layout.render();
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
