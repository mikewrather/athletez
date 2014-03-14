/* // Location View
 // ---------
 // Pages
 // Requires `define`, `require`
 */
define(['require',
	'text!packages/invite/templates/invite.html',
	'facade',
	'views',
	'utils',
	'common/models/entparse',
	'packages/invite/models/invite',
	'vendor'], function(require) {

	var facade = require('facade'),
		_ = facade._,
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,

		entParser = require('common/models/entparse'),
		InviteModel = require('packages/invite/models/invite'),
		vendor = require('vendor');

	var BaseView = views.BaseView, Backbone = facade.Backbone, _self,
		layoutTemplate = require('text!packages/invite/templates/invite.html');
	//Models

	return BaseView.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click #acceptInvite":"acceptInvite",
			"click #declineInvite":"declineInvite"
		},
		
		cssArr : ["packages/invite/invite.css"],
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {

			Channel('load:css').publish(this.cssArr);
			this.data = options;
			console.log("ACCEPT INVITE MODEL",this.model);
			this.render();
		},
		acceptInvite:function(e){
			var self = this;
			$(e.target).html('Accepting');
			this.model.save({},{
				success:function(model,data){
					model.loadInvitePage();
					self.$el.parents('.register-wrapper-h').slideUp('slow');
				}
			});
		},

		declineInvite:function(e){
			var self = this;
			self.$el.parents('.register-wrapper-h').slideUp('slow');
		},

		render:function(){
			console.log(this.el);
			this.$el.html(_.template(layoutTemplate,this.data));
			routing.trigger('center-landing-image',{});
		}
	});
});