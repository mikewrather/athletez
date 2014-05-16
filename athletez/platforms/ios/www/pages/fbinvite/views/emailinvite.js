// Schedule-item.js  
// -------  
// Requires `define`

define([
	'vendor',
	'views',
	'utils',
	'facade',
	'text!pages/fbinvite/templates/emailinvite.html',
	'text!pages/fbinvite/templates/emaillist.html',
	'fbinvite/models/emailinvite'
],
	function (
		vendor,
		views,
		utils,
		facade,
	    layoutTemplate,
	    emailListTemplate,
	    EmailInviteModel
		) {

		var $ = facade.$,
			_ = facade._,
			BaseView = views.BaseView,
			Backbone = facade.Backbone;

		return BaseView.extend({
			template:layoutTemplate,
			model:new EmailInviteModel(),
			events: {
				"keyup textarea":"parseEmailList",
				"click .send-email-invite-h":"sendInvites"
			},

			initialize: function (options) {
				this.setOptions(options);
				this.data = options;
				this.controller = options.controller;

				console.log(options);

				if(options.FBOptions) this.model.set({
					invite_type:options.FBOptions.invite_type,
					'invite_to': {
						subject_id: options.FBOptions.subject_id,
						enttype_id: options.FBOptions.enttypes_id
					}
				});

				this.render();
			},
			render:function(){
				this.$el.html(_.template(this.template,this.data));

			},

			GetEmailsFromString:function(input) {
				var email =/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
				return input.match(email);
			},

			concatUnique: function(array){
				var a = array.concat();
				for(var i=0; i<a.length; ++i) {
					if( a[i]==false || a[i]==undefined || a[i]==null){
						a.splice(i,1);
					}
					else{
						for(var j=i+1; j<a.length; ++j) {
							if(a[i] === a[j] || a[i]==false || a[i]==undefined || a[i]==null){
								a.splice(j--, 1);
							}
						}
					}
				}
				return a;
			},
			parseEmailList:function(e){
				var str = $(e.target).val();

				var emails = str.split(','),
					validEmails = [];
				for(var i=0;i<emails.length;i++)
				{
					validEmails = this.concatUnique(validEmails.concat(this.GetEmailsFromString(emails[i])));
				}
				this.model.set({
					emailList:validEmails
				})
				this.drawEmailList();
			},

			drawEmailList:function(emails){
				this.$el.find('div#emailAddresses').html(_.template(emailListTemplate,{data:this.model.get('emailList')}));
				this.$el.find('button.send-email-invite-h').html('Send ' + this.model.get('emailList').length + ' Invites').removeAttr('disabled');
			},

			sendInvites:function(e){
				var self = this;
				$(e.target).html('Sending...').attr('disabled','disabled');
				this.model.save({},{
					success:function(model,data){
						$(e.target).html("Sent");
						self.$el.find('textarea').val("");
						_.each(model.get('payload'),function(item){
							console.log(item.invite_email,self.$el.find('#emailAdresses li[data-address="' + item.invite_email + '"]'));

							self.$el.find('li[data-address="' + item.invite_email + '"]').addClass('sent');
						});
					},
					error:function(model){

					}
				});
			}

		});
	});