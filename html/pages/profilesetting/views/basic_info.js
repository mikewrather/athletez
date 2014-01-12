/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/basic_info_header.html', 'text!profilesetting/templates/basic_info_header_edit.html', 'text!profilesetting/templates/basic_info_header_completed.html', 'profilesetting/models/basic_info', 'facade', 'views', 'utils', 'vendor', 'usercontrols/imagecropper/imagecropper', 'component/forms'], function(require, profileHeaderTemplate, profileHeaderEditTemplate, profileHeaderCompletedTemplate) {

	var ProfileHeaderView, facade = require('facade'), views = require('views'), BasicsInfoModel = require('profilesetting/models/basic_info'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, ImageCropperController = require('usercontrols/imagecropper/imagecropper'), FormComponent = require('component/forms');

	ProfileHeaderView = SectionView.extend({
		id : 'basic_info',
		template : profileHeaderTemplate,
		events : {
			"click .btn-prof-setting-h" : "initialize",
			"click #edit_profile_info" : "editProfile",
			"click #change_user_pic" : "changeUserpic",
			"click #save_user_data" : "saveProfileBasics"
		},

		initialize : function(options) {
			if(options.name) SectionView.prototype.initialize.call(this, options);
			this.initBasicView();			
		},
		
		render: function() {
			SectionView.prototype.render.call(this);
		},

		generateForm : function() {
			var _self = this;
			var formData = new FormComponent({
				'name' : {
					form_values : {
						post_to_server : true,
						serverKey : "name",
						serverDbField : 'name',
						value: _self.basicInfoModel.get("payload").name
					},
					type : 'Text',
					attr : {
						'placeholder' : 'Name',
						'class' : ""
					},
					label : "Name"
				},

				'Height' : {
					form_values : {
						post_to_server : true,
						serverKey : "height_in",
						serverDbField : 'height',
						value: _self.basicInfoModel.get("payload").height_in
					},
					type : 'Text',
					attr : {
						'placeholder' : 'Height',
						'class' : ""
					},
					label : "Height (in)"
				},

				'Weight' : {
					form_values : {
						post_to_server : true,
						serverKey : "weight_lb",
						serverDbField : 'weight',
						value: _self.basicInfoModel.get("payload").weight_lb
					},
					type : 'Text',
					attr : {
						'placeholder' : 'Weight',
						'class' : ""
					},
					label : "Weight (lbs)"
				},

				'Password' : {
					form_values : {
						post_to_server : true,
						serverKey : "password",
						serverDbField : 'password'
					},
					type : 'Password',
					attr : {
						'placeholder' : 'New Passord',
						'class' : ""
					},
					label : "New"
				},

				'Again' : {
					form_values : {
						post_to_server : false,
						serverKey : "re_password",
						serverDbField : 're_password'
					},
					type : 'Password',
					attr : {
						'placeholder' : 'New Password Again'
					},
					label : "Again"
				},

				'submit' : {
					type : 'Submit',
					fieldClass : "button-field",
					form_values: {
						post_to_server : false
					},
					attr : {
						'value' : 'Save',
						'class' : 'resume_button'
					},
					showLable : false,
					onSubmit : function(e) {
						var errors = form.commit();
						if (errors) {
							// auto scroll to focus element which has error
							for (var i in errors) {
								var $ob = $("*[name=" + i + "]"), $pos = $ob.position();
								$ob.parents(".common-modal #modalBody").animate({
									scrollTop : $pos.top
								}, '500', function() {
									$ob.addClass('focus-error-animation');
									setTimeout(function() {
										$ob.removeClass('focus-error-animation');
									}, 2000);
								});
								break;
							}
						} else {
							if (_self.formValues) {
								var formData = _self.formValues.getFormValues();
							} else {
								var formData = form.getValue();
							}
							var formData = _self.formValues.getFormValues();
							_self.saveProfileBasics(formData);
						}
					}
				}
			}, $('#user_profile_data'));
			var form = formData.form;
			this.formValues = formData.formValues;
		},

		initBasicView : function() {
			var self = this;
			this.basicInfoModel = new BasicsInfoModel();
			//TODO: Assign Users Id To Id
			//this.basicInfoModel.id = this.id; //;
			this.basicInfoModel.fetch();
			$.when(this.basicInfoModel.request).done(function() {
				self.basicInfoModel.set('id', self.basicInfoModel.get('payload').id);
				
				self.setupBasicView();
				self.generateForm();
			});
		},

		setupBasicView : function() {
			console.log("called");
			var self = this;
			var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
			$('#section-basics-prof-setting').html(markup);
			$('#change_user_pic').bind('click', function() {
				self.changeUserpic();
			});
			$('#edit_profile_info').bind('click', function() {
				self.editProfile();
			});
			$('#save_user_data').bind('click', function() {
				self.saveProfileBasics();
			});
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			if (!this.model) {
				throw new Error("HeaderView expects option with model property.");
			}
		},

		editProfile : function() {
			//var self = this, markup = Mustache.to_html(profileHeaderEditTemplate, this.basicInfoModel.toJSON());
			//$('div#user_profile_data').html(markup);
			$("#user_profile_data").html("");
			this.generateForm();
			//$('#save_user_data').bind('click', function() {
			//	self.saveProfileBasics();
			//});
		},

		saveProfileBasics : function(fields) {
			var self = this, newAttr = {};
			
			if(!fields) {
				$('div#user_profile_data').find('input').each(function() {
					newAttr[$(this).attr('model-property')] = $(this).val();
				});
			} else {
				newAttr = fields;
			}

			this.basicInfoModel.save(newAttr, {
				success : function() {
					var markup = Mustache.to_html(profileHeaderCompletedTemplate, self.basicInfoModel.toJSON());
					$('div#user_profile_data').html(markup);
					$('#edit_profile_info').bind('click', function() {
						self.editProfile();
					});
				},
				error: function(res) {
					var response = JSON.parse(res.responseText);
					var errorArray = response.exec_data.error_array;
					self.formValues.showServersErrors(errorArray);
				}
			});
			
		},

		changeUserpic : function() {
			var mpay = this.basicInfoModel.get('payload');

			Channel('userpic-changed').subscribe(function() {
				self.initBasicView();
			});

			var self = this, imageCropperController = new ImageCropperController({
				'image_o' : mpay.user_picture_obj.pre_crop_url,
				'image_e' : mpay.user_picture_obj.image_path
			});

		}
	});

	return ProfileHeaderView;
});
