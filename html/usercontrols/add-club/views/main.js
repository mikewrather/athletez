/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define(['require',
	'text!usercontrols/add-club/templates/layout.html',
	'facade',
	'views',
	'utils',
	'vendor',
	"usercontrol/add-club/collections/complevel",
	"usercontrols/add-club/collections/profile",
    'sportorg/models/org',
	'usercontrols/add-club/collections/sports',
	'sportorg/collections/seasons',
	'component/forms' ], function(require, layoutTemplate) {
 	
	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$,

	//Models
	OrgModel = require('sportorg/models/org'),
	SportsCollection = require('usercontrols/add-club/collections/sports'),
	CompLevel = require('usercontrol/add-club/collections/complevel'),
	ProfileCollection = require("usercontrols/add-club/collections/profile"),
	FormComponent = require('component/forms');

	var addOrgView = SectionView.extend({
		template : layoutTemplate,
		stateData: {},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			this.model = options.model;
			this.id = options.id;
			this.addType = options.addType;
			this.callback = options.callback;
			this.viewObj = options.viewObj;
			this.addressValid = false;
			if(options.orgNameSoFar) this.orgNameSoFar = options.orgNameSoFar;
			SectionView.prototype.initialize.call(this, options);
			this.setUpMainView();
			this.render();

		},

		// set up main view
		setUpMainView : function() {
			var self = this;
			var data = {};
			data.type = self.addType;
			var markup = Mustache.to_html(self.template, data);
			$(self.$el).html(markup);
		},

		afterRender: function(){
			this.showAddClubForm();
		},
		showAddClubForm:function(){

			var _self = this;
			var formData = new FormComponent({
				'org_name' : {
					form_values: {
						post_to_server	: true,
						serverDbField: 'org_name',
						serverKey: "org_name",
						objectValuesToUpdate: [],
						defaultValue:_self.orgNameSoFar
					},

					type : 'Text',
					attr : {
						'placeholder' : 'Organization Name',
						'class' : ""
					},

					showLable : false,
					label: "Organization Name",
					validators : [{
						type : 'required',
						message : 'Please enter an organization name.'
					}]
				},
				'season_profile' : {
					type : 'DropDown',
					showLable : true,
					label: "We Compete:",
					form_values : {
						serverKey : "season_profiles_id",
						serverDbField: "season_profiles_id",
						post_to_server	: true,
						objectValuesToUpdate: [],
						source_collection : ProfileCollection,
						request_finished : function() {

						},

						data : {
							records : undefined,
							recordId : 'id',
							recordValue : 'name',
							selectedValue : _self.sports_id
						},

//						elementId : _self.controls.hdnTimePeriodData,
						callback : function(result) {
						}
					}
				},

				'complevel_profile' : {
					type : 'DropDown',
					showLable : true,
					label: "Which best describes the levels your organization has?",
					width:400,
					form_values : {
						serverKey : "complevel_profiles_id",
						post_to_server	: true,
						objectValuesToUpdate: [],
						source_collection : CompLevel,
						request_finished : function() {
						},

						data : {
							records : undefined,
							recordId : 'id',
							recordValue : 'name',
							selectedValue : _self.sports_id
						},

//						elementId : _self.controls.hdnTimePeriodData,
						callback : function(result) {
						}
					}
				},

				'Sports' : {
					type : (_self.addType == "school")?'Hidden':'DropDown',
					showLable : true,
					label: "What Sport?",
					form_values : {
						serverKey : "single_sport_id",
						post_to_server	: true,
						objectValuesToUpdate: [],
						source_collection : SportsCollection,
						request_finished : function() {

						},

						data : {
							records : undefined,
							recordId : 'id',
							recordValue : 'custom_name',
							selectedValue : _self.sports_id
						},

//						elementId : _self.controls.hdnTimePeriodData,
						callback : function(result) {
						}
					}
				},


				'Location' : {
					form_values: {
						serverKey : "locations_id",
						post_to_server	: true,
						serverDbField: 'locations_id'
					},
					type : 'Location',
					label: 'Location (e.g. "UCLA" or "Santa Monica" or a full address)',
					validators : [{type : 'required',
						message : 'Please select location.'}],
				},
				'users_id'	: {
					form_values: {
						serverKey: _self.users_id,
						post_to_server	: true,
						value: _self.user_id
					},
					type: "Hidden",
				},
				'submit' : {
					type : 'Submit',
					fieldClass: "button-field",
					attr : {
						'value' : 'Create'
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
							var formData = _self.formValues.getFormValues();

							var payload = {
								complevel_profiles_id : formData.complevel_profiles_id,
								name : formData.org_name,
								location_id : formData.locations_id,
								season_profiles_id : formData.season_profiles_id,
								single_sport_id : formData.single_sport_id,
								sports_club : (_self.addType == "school")?'0':'1'
							};

							console.log(payload);

							var orgModel = new OrgModel(payload);
							orgModel.save({});

							$.when(orgModel.request).done(function() {
								console.log(orgModel.get("payload"));
								var d = orgModel.get("payload");
								payload.locationState = _self.stateData;
								payload.org_id = d.id;
								if(_self.callback) _self.callback(payload);
								alert("Your " + _self.addType + " has been added to our database successfully.  Please continue the process by adding yourself to a specific season.");
								routing.trigger('common-popup-close');
							});

						}
					}
				},
				'button' : {
					type : 'Button',
					fieldClass: "button-field",
					attr : {
						'value' : 'Cancel'
					},
					onClick : function() {
						routing.trigger('common-popup-close');
					},
					showLable : false
				},
			}, this.$el.find('.add-club-school-outer'));

			var form = formData.form;
			this.formValues = formData.formValues;
		}
	});
	return addOrgView;
});
