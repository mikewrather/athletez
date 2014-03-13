/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require',
	'text!usercontrol/landing/templates/landing.html',
	'text!usercontrol/landing/landing.css',
	"signup/models/registerbasic",
	"signup/views/registerbasic",
	'facade',
	'views',
	'utils',
	'usercontrol/landing/models/fb-user',
	'common/models/entparse',
	'vendor',
	'packages/invite/views/invite'], function(require) {

	var facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),

		signupBaseModel = require("signup/models/registerbasic"),
		signupBaseView=require("signup/views/registerbasic"),
		UserModel = require('usercontrol/landing/models/fb-user'),
		entParser = require('common/models/entparse'),
		InviteView = require('packages/invite/views/invite'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		$ = facade.$,
		_ = facade._;

	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!usercontrol/landing/templates/landing.html');
	//Models

	return BaseView.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click #browse":"closePopup",
			"click #sign-in":"signIn",
			"click #browse":"scrollToContent"
		},
		
		cssArr : [base_url + "usercontrols/landing/landing.css"],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {

			console.log("LANDING PAGE",options);

			Channel('load:css').publish(this.cssArr);
			var _self = this;
			_self.data = {};
			_self.selectedOptions = [];
			_self.setOptions(options);
			_self.setDefaults();
			// get the user detail if fbid is defined
			try {

				if(typeof(options)==='object' && !_.isUndefined(options.invite_model)) {
					this.invite_model = options.invite_model;
					console.log(this.invite_model);
					_self.getUserData(this.invite_model);
				} else {
					_self.render();
				}
			} catch(e) {
				console.error(e);
			}

		},

		checkForUser: function() {

			if(!_.isUndefined(this.invite_model)){
				console.log("INVITE MODEL",this.invite_model,this.invite_model.get('payload').force_login);
				return ((!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn) ||
					this.invite_model.get('payload').force_login==="true" ||
					this.invite_model.get('payload').force_login===true) ? true:false;
			}
			else
				return (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn) ?true:false;

		},

		setDefaults: function(){

			this.data = {
				headline:"Athletes Live Here",
				text:"And we mean all athletes.  It's simple: create a profile, connect with your team, share your games, post your highlights, get discovered."
			};
		},

		getUserData: function(model) {
			var _self = this;
			console.log(model);

			var mpay = model.get('payload');
			console.log(mpay);
			var parser = new entParser({
				'mpay':mpay.invite_to_obj,
				display_width:1920,
				display_height:1024
			});
			var extra = parser.parsedData;

			if(!_.isUndefined(mpay.fb_user_data) && !_.isUndefined(mpay.fb_user_data.first_name)){
				this.data.headline = "Hey " + mpay.fb_user_data.first_name;
				this.data.email = mpay.invite_email ? mpay.invite_email : null;
			}

			_self.data.text = mpay.users_obj.name + " invited you to " + mpay.invite_type + " " + extra._label + ".  ";

			if(!this.checkForUser()){
				_self.data.text += "Sign up now to get started!"
			}
			else {

			}

			var options = {};
			if(typeof(extra.imgData == 'object')){
				options.background_image = extra.imgData.url
			}
			console.log(extra);
			_self.render(options);

		},
		

		//render displays the view in landing
		render : function(options) {
			var _self = this, markup = Mustache.to_html(_self.template,_self.data);
			this.$el = $('.register-wrapper-h');

			console.log(markup);

			if(!this.$el.length) {
				$('body header').after('<div class="register-wrapper-h"></div>');
				this.$el = $('.register-wrapper-h');
				console.log(this.$el);
			}


			//binding these events here because it requires that this.$el be set so we can't do it till now
			routing.off('hide-landing');
			routing.on('hide-landing',_self.hideLanding);


			var options = options || {};
			options.width = "100%";
			options.height = "100%";
			options.title = "&nbsp;";
			options.html = markup;
			options.id = "landing";
			options.fullPage = true;
			options.addClass = ['noBorder'];

			if(options.background_image == undefined){
		//		var rand = Math.ceil(Math.random()*100);
		//		var bgs = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'];
				options.background_image = "http://athletez.s3.amazonaws.com/resources/img/landing/7.jpg";// + bgs[rand % bgs.length];

			}

			_self.background_pic = new Image();
			_self.background_pic.src = options.background_image;
			_self.background_pic.onload = function(){
				console.log("IMAGE DATA",this,_self.background_pic.height,_self.background_pic.width);


				_self.$el.html(markup);


				_self.$el.css({
					'background':'url('+ options.background_image + ') no-repeat',
					'background-size':'cover',
					'background-position-y':'20%'
				});


				routing.off('center-landing-image');
				routing.on('center-landing-image',function(){
					_self.centerBackgroundVertically();
				});

				if(!_self.checkForUser()) _self.showReg();
				else _self.showInvite();



			}


		//	console.error(options);
		//	routing.trigger('common-popup-open', options);



			return this;
		},

		centerBackgroundVertically:function(){
			var self = this;
			setTimeout(function(){
				var divheight = self.$el.height(),
					divwidth = self.$el.width(),
					picheight = self.background_pic.height,
					picwidth = self.background_pic.width,
					scale = divwidth/picwidth,
					scaled_height = scale * picheight,
					remainder_cut = scaled_height - divheight;

				if(remainder_cut > 0){
					var half = remainder_cut / 2;
					self.$el.css({
						'background-position-y':'-'+half+'px'
					});
				}

				console.log(divheight,divwidth,picheight,picwidth,scale,scaled_height,remainder_cut);

			},0);
		},

		scrollToContent:function(e){
			$('html, body').animate({
				scrollTop: $("#main").offset().top
			}, 700);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		showReg: function()
		{
			var _self = this;
			this.regModel = new signupBaseModel();



			this.regView = new signupBaseView({
				model : this.regModel,
				name : "Select Registration Type",
				destination : "#reg-landing",
				openAsaPage: true,
				data: this.data,
				invite_hash: this.invite_model && _.isObject(this.invite_model) ? this.invite_model.get('payload').sechash : false,
				showOnLanding:true,
				fb_invite: this.userId !== undefined ? this.userId : false
			});



		},



		hideLanding:function(){
			$('div.register-wrapper-h').slideUp('slow');
		},

		showInvite: function(){
			var inviteView = new InviteView({
				model:this.invite_model,
				el:$("#reg-landing")
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