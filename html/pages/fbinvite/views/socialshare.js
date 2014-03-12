// Schedule-item.js  
// -------  
// Requires `define`

define([
	'vendor',
	'views',
	'utils',
	'facade',
	'text!pages/fbinvite/templates/socialshare.html',
	'component/fb',
	'component/share',
	'fbinvite/models/openinvite',
	'common/models/entparse'],
	function (
		vendor,
		views,
		utils,
		facade,
	    layoutTemplate,
	    FbComponent,
	    ShareComponent,
	    OpenInviteModel,
	    entParse
		) {

		var $ = facade.$,
			_ = facade._,
			BaseView = views.BaseView,
			Backbone = facade.Backbone;

		return BaseView.extend({
			template:layoutTemplate,
			events: {
				"click .share-on-h":"shareOn"
			},
			athletezDesc:"Athletez.com is a social network of athletez from all different sports, ages and skill levels.  " +
				"Athletez is a free and easy way to build a personal athletic profile, upload media from events, games, or training sessions, " +
				"and connect with teammates or training partners.  Be more involved in your athletic life with Athletez.com",

			initialize: function (options) {
				this.setOptions(options);
				this.data = options;
				this.controller = options.controller;
				this.model = new OpenInviteModel();

				if(options.FBOptions) this.model.set({
					invite_type:options.FBOptions.invite_type,
					'invite_to': {
						subject_id: options.FBOptions.subject_id,
						enttype_id: options.FBOptions.enttypes_id
					}
				});



				console.log(this.template,this.model,this.$el);
				this.render();
			},
			render:function(){
				this.$el.html(_.template(this.template,this.data));
			},

			// share event binding
			shareOn: function(e) {
				e.stopPropagation();
				var type = $(e.currentTarget).data("share");
				var self = this;
				if(this.model.isNew()){
					this.model.save({},{
						success:function(model,data){
							self.model.id = model.get('payload').id;
							self.setData(model);

							if(type && _.isFunction(self[type])) self[type]();

						}
					});
				} else {
					if(_.isUndefined(this.share)) this.setData(this.model);
					if(type && _.isFunction(self[type])) self[type]();
				}
			},

			setData:function(model){
				var ep = new entParse({
					mpay:model.get('payload').invite_to_obj
				});
				this.share = {
					caption: "Come " + model.get('payload').invite_type + " \"" +ep.parsedData._label + "\" on Athletez.com",
					name:ep.parsedData._label,
					image_path : ep.parsedData.imgData.url,
					invite_type : model.get('payload').invite_type
				};
			},

			getLink: function(data) {
				var link = "#acceptfbinvite/" + this.model.get("payload").sechash;
				console.log(link);
				return link;
			},

			twitter: function() {
				var _self = this, data = this.share;
				var twitter = function() {
					var options = {
						'link': _self.getLink(data),
						'name': data.name,
						'caption': data.caption,
						'image': data.image_path,
						'description': '',
						'title' :'',
						'type': "twitter"
					};
					new ShareComponent(options);
			//		console.log(ShareComponent);
				};

				if(!_self.checkForUser()) {
					routing.trigger('showSignup', function(callback) {
						twitter();
					});
				} else {
					twitter();
				}

			},

			gplus: function() {
				var _self = this, data = this.share;
				var gplusFn = function() {
					var options = {
						//'link': "#"+this.pageName+data.userId+data.sportId+data.mediaId,
						'link': _self.getLink(data),
						'name': data.name,
						'caption': data.caption,
						'image': data.image_path,
						'description': '',
						'title' :'',
						'type': "gplus"
					};
					new ShareComponent(options);
				};
				if(!_self.checkForUser()) {
					routing.trigger('showSignup', function(callback) {
						gplusFn();
					});
				} else {
					gplusFn();
				}

			},

			tumbler: function() {
				var _self = this, data = this.share;

				var tumbler = function() {

					var options = {
						'link': _self.getLink(data),
						'name': data.name,
						'caption': data.caption,
						'image': data.image_path,
						'description': '',
						'title' :'',
						'type': "tumbler"
					};
					new ShareComponent(options);
				};
				if(!_self.checkForUser()) {
					routing.trigger('showSignup', function(callback) {
						tumbler();
					});
				} else {
					tumbler();
				}
			},

			// share media on facebook
			facebook: function() {
				var _self = this, data = this.share;
				var link = this.getLink(data),
					name = data.name,
					caption = data.caption,
					image = data.image_path,
					description = this.athletezDesc;
				var facebookShare = function() {
					var fb = new FbComponent();
					fb.shareOnFacebook({
						method: 'feed',
						name: name,
						link: link,
						picture: image,
						caption: caption,
						description: description,
						success: function() {
							alert("Shared successfully.");
						},
						error: function() {
							alert("Not Shared successfully.");
						}
					});
				};
				if(!_self.checkForUser()) {
					routing.trigger('showSignup', function(callback) {
						facebookShare();
					});
				} else {
					facebookShare();
				}

			},

			checkForUser: function() {
				return (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)?true:false;
			},

			destroy_view: function() {
				delete this.model;
				this.model = {};
				//COMPLETELY UNBIND THE VIEW
				this.undelegateEvents();

				this.$el.removeData().unbind();


				//Remove view from DOM
		//		this.remove();
		//		Backbone.View.prototype.remove.call(this);

			},

		});
	});