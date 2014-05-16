// Register with Facebook
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationFacebookView} constructor

define(['require', 'text!registration/templates/register_facebook.html', 'backbone', 'facade', 'views', 'utils', 'vendor', 'jquery.pstrength', 'registration/collections/fbimages', 'registration/views/fbimage-list'], function(require, registrationFacebookTemplate) {

	var RegistrationFacebookView, facade = require('facade'), views = require('views'), vendor = require('vendor'), Mustache = vendor.Mustache, utils = require('utils'), Channel = utils.lib.Channel, SectionView = views.SectionView, RegistrationFBImageList = require('registration/collections/fbimages'), RegistrationFBImageView = require('registration/views/fbimage-list');

	RegistrationFacebookView = SectionView.extend({

		id : 'main-content',

		events : {
			"keypress" : "stopSubmit",
		},

		template : registrationFacebookTemplate,

		initialize : function(options) {
			this.callback = options.callback;
			this.inviteModel = options.inviteModel;

			var response = $.parseJSON(this.model.request.responseText);
			if (response.exec_data.exec_error) {
				var errorDisplay = true;
				var errorValue = response.exec_data.error_array[0].error;
				this.model.set('errorDisplay', true);
				this.model.set('errorValue', errorValue);
			}
			var self = this;
			if (!this.model) {
				throw new Error("RegistrationFacebookView expected options.model.");
			}

			self.parseFBData(this.model.get('payload'));
			SectionView.prototype.initialize.call(this, options);
			function changeUserPicture(picture) {
				self.$('.picture').attr('src', picture);
			}


			Channel("registration-change-picture").subscribe(changeUserPicture);
			function showDiffFBPicture() {
				self.initFBPictures();
			}


			Channel("registration-diff-fbpicture").subscribe(showDiffFBPicture);
			function showUploadImage() {
				self.initUploadImage();
			}


			Channel("registration-upload-image").subscribe(showUploadImage);
		},

		// Child views...
		childViews : {},

		render : function(domInsertion, dataDecorator, partials) {
			var options = {};
			options.height = "500px";
			options.width = "650px";
			options.title = "Register With Facebook - " + this.model.get('payload')['name'];
			options.id = "fb-reg-pop";
			options.html = Mustache.to_html(this.template, this.model.toJSON());
			routing.trigger('common-popup-open', options);

			$('#fb-reg-pop .next').bind('click', this.nextStep);
			$('#fb-reg-pop div.edit').bind('click', this.changeField);
			$('#fb-reg-pop .diff_fb_pic').bind('click', this.diffFBPicture);
			$('#fb-reg-pop .upload_new_image').bind('click', this.uploadNewImage);
		},

		stopSubmit : function(event) {
			var code = (event.keyCode ? event.keyCode : event.which);
			if (code == 13) {
				event.preventDefault();
			}
		},

		diffFBPicture : function(event) {
			event.preventDefault();
			this.initFBPictures();
		},

		uploadNewImage : function(event) {
			event.preventDefault();
			this.initUploadImage();
		},

		parseFBData : function(payload) {
			payload.hs_exists = payload.high_school ? true : false;
			payload.dob_exists = payload.birthday ? true : false;
			payload.email_exists = payload.email ? true : false;

			this.model.set('payload', payload);
		},

		initFBPictures : function() {
			var self = this;

			if (!this.fbimages) {
				this.fbimages = new RegistrationFBImageList();
				this.fbimages.fetch();
				$.when(this.fbimages.request).done(function() {
					debug.log("this.fbimages are as follows");
					debug.log(self.fbimages.toJSON());
					//self.setupFBPictures();
					//alert('if');

					this.fbImageListView = new RegistrationFBImageView({
						collection : self.fbimages.toJSON()
					});
				});
			} else {
				debug.log(self.fbimages.toJSON(), "else");
				this.fbImageListView = new RegistrationFBImageView({
					collection : self.fbimages.toJSON()
				});
				//alert('else');
				//$('#' + this.fbImageListView.id).dialog({
				//	width : '80%',
				//	close : self.removeListView
				//});
				//this.fbImageListView.initCropView();
			}
		},

		setupFBPictures : function() {
			var self = this;

			this.fbImageListView = new RegistrationFBImageView({
				collection : this.fbimages
			});
			var renderFBImageListView = this.addChildView(this.fbImageListView);
			this.childViews.fbImageListView = this.fbImageListView;
			this.callbacks.add(function() {
				renderFBImageListView();
			});

			this.fbImageListView.render();
			this.$el.append(self.fbImageListView.el);
			$('#' + this.fbImageListView.id).dialog({
				width : '80%',
				close : self.removeListView
			});
		},

		removeListView : function() {
			this.childViews.fbImageListView.removeCropView();
		},

		initUploadImage : function() {
			alert('Upload Image');
		},

		changeField : function(event) {
			event.preventDefault();
			$(event.target).fadeOut();
			var $parent = $(event.target).parent().find('input');
			$parent.removeAttr('disabled').focus();

		},

		nextStep : function(event) {

			event.preventDefault();
			var _self = this, fields = $("#fb-reg-pop :input").serializeArray();
			var payload = this.model.get('payload');

			$.each(fields, function(i, field) {
				payload[field.name] = field.value;
			});

			if (payload['password'] == '' || payload['password-again'] == '') {
				alert('Please input a password');
				return;
			}
			if (payload['password'] != payload['password-again']) {
				alert('Please input a password correctly');
				return;
			}
			if (payload['agree'] == null) {
				alert('Please agree to the Terms of Service');
				return;
			}

			this.model.attributes.id = false;
			this.model.set({
				'payload' : payload,
				id : 1
			});
			this.model.url = function() {
				if (testpath)
					return testpath + '/user/basics';
				return '/api/user/basics/' + payload['users_id'];
			};

			this.model.save({
				callback : "true"
			}, {
				success : function(msg) {
					$('#RegModal').modal('hide');


					if (_self.callback && _.isFunction(_self.callback)) {
						routing.trigger('common-popup-close');

						_self.callback(function() {
							window.location.reload();
						});


					} else {
						window.location.href = "#usersettings";
					}
				}
			});
			//disabled temporarly
			//Channel('registration-select-org').publish();
		}
	});

	return RegistrationFacebookView;
});
