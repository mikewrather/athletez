// FBInvite Controller
// ---------------
// module as controller for 'registration' package
// Returns {RegistrationController} constructor

define(["require",
	"text!fbinvite/templates/layout.html",
	"facade",
	"controller",
	"models",
	"views",
	"utils",
	"fbinvite/views/image-list",
	'fbinvite/collections/fbinvite',
	'media/models/image',
	'signup/views/facebooksignup',
	'fbinvite/views/invitetypes',
	'fbinvite/views/invitetypesmenu',
	'fbinvite/views/emailinvite',
	'fbinvite/views/socialshare'],
	function(require, pageLayoutTemplate) {

	var RegistrationController,
		facade = require("facade"),
		Controller = require("controller"),
		models = require("models"),
		views = require("views"),
		utils = require("utils"),
		LayoutView = views.LayoutView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		Channel = utils.lib.Channel,
		cssArr = ["/pages/registration/registration.css", "/pages/signup/css/signupstyle.css", "/css/style.jrac.css","pages/fbinvite/fbinvite.css"],
		ProfileImageListView = require("fbinvite/views/image-list"),
		MediaImageModel = require("media/models/image"),
		FBInviteList = require('fbinvite/collections/fbinvite'),
		fbreg = require('signup/views/facebooksignup'),
		InviteTypesView = require('fbinvite/views/invitetypes'),
		InviteTypesMenuView = require('fbinvite/views/invitetypesmenu'),
		SocialShareView = require('fbinvite/views/socialshare'),
		EmailInviteView = require('fbinvite/views/emailinvite');

	return Controller.extend({
		initialize : function(options) {
			this.popup = (options.popup)?true:false;
			this.options = options.options;
			Channel('load:css').publish(cssArr);
			_.bindAll(this);
			this.ajaxCalls = [];
			this.handleOptions(options);
			this.init();
			return this;
		},

		init : function() {
			ga('send', 'event', 'FB Invite', 'Header', 'Loading reg header');
						this.modelHTML = '<div id="fbInvite" class="modal hide fade model-popup-h">'+
			'<div class="closer"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">	&times;</button></div>'+
							'&nbsp;<div id="search-area" class=""></div>' +
							'<div id="invite-types-menu" class=""></div>' +
			'<div id="modalBody" class="modal-body page-content-h">'+
			'</div></div>';

			this.setupLayout().render();
			this.setupInviteTypesView();
		},

		execRenderFriends:function(){

			this.refreshPage();
			this.createData();
			$('#search-area').html('<input type="search" class="search-friends-h" placeholder="Search your friends" />');
			this.handleDeferreds();
		},

		createData : function() {
			var _self = this;
			this.images = new FBInviteList();
			this.images.targetElement = "#image-wrap-h";
			this.ajaxCalls.push(this.images.fetch({
				error:function(e,n){
					ga('send', 'event', 'popup', 'open', 'FB Auth Token Renew');
					if(confirm("Your Facebook Authentication has timed out.  Want to try and renew it?")){
						var fbregistration = new fbreg();
						fbregistration.signupFacebook("linkWithFB",_self.execRenderFriends);
					} else {
						$('#fbInvite .close').trigger("click");
					}
				}
			}));
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


			this.setupInviteTypesMenuView();

			this.imageListView = new ProfileImageListView({
					collection: this.images,
					destination: "#image-wrap-h",
					target_id : this.id,
					user_id: this.id,
					FBOptions: this.options,
					name: "images View 2"
			});
			this.scheme.push(this.imageListView);
			this.layout.render();
		},
		setupLayout : function() {
			this.scheme = [];
			$('#fbInvite').modal('hide');
			$(".model-popup-h").remove();
			$('body').append(this.modelHTML);
			var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalBody",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout = pageLayout;
			$('#fbInvite').modal('show');
			return this.layout;

		},

		setupEmailInvite:function(){
			var self = this;

			this.setupInviteTypesMenuView();
			var emailInivte = new EmailInviteView({
				el:'#image-wrap-h',
				controller:self,
				FBOptions: this.options
			});
		},

		setupSocialShareInvite:function(){
			var self = this;

			this.setupInviteTypesMenuView();
			this.socialShareView = new SocialShareView({
				el:'#image-wrap-h',
				controller:self,
				FBOptions: this.options
			});
		},

		setupInviteTypesMenuView:function(){
			var self = this;
			var inviteTypesMenu = new InviteTypesMenuView({
				el:'#invite-types-menu',
				controller:self,
				FBOptions: this.options
			});

		},

		setupInviteTypesView:function(){
			var self = this;
			$('#search-area').html('');
			$('#invite-types-menu').html("");

			if(this.socialShareView) {

				this.socialShareView.destroy_view();
				this.layout.render();

			}
			var inviteTypes = new InviteTypesView({
				el:'#image-wrap-h',
				controller:self,
				FBOptions: this.options
			});

		}
	});
});
