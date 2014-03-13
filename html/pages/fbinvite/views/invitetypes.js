// Schedule-item.js  
// -------  
// Requires `define`

define([
	'vendor',
	'views',
	'utils',
	'facade',
	'text!pages/fbinvite/templates/invitetypes.html',
	'text!pages/fbinvite/templates/invitetypesmenu.html'],
	function (
		vendor,
		views,
		utils,
		facade,
	    layoutTemplate,
	    inviteTypesMenuTemplate
		) {

		var $ = facade.$,
			_ = facade._,
			BaseView = views.BaseView,
			Backbone = facade.Backbone;

		return BaseView.extend({
			template:layoutTemplate,
			model:Backbone.Model.extend(),
			events: {
				"click .facebook-message-invite-h":"fbMessageInvite",
				"click .email-invite-h":"emailInvite",
				"click .facebook-timeline-invite-h":"fbTimelineInvite"
			},

			initialize: function (options) {
				this.setOptions(options);
				this.data = options;
				this.controller = options.controller;
				console.log(this.template,this.model,this.$el);
				this.render();
			},
			render:function(){
				this.$el.html(_.template(this.template,this.data));
			},

			fbMessageInvite:function(e){
				this.controller.execRenderFriends();
			},

			emailInvite:function(e){
				this.controller.setupEmailInvite();
			},

			fbTimelineInvite:function(e){
				this.controller.setupSocialShareInvite();
			}

		});
	});