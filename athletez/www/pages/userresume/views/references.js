/* // REFERENCES View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {REFERENCES VIEW} constructor
 */
define(['require', 'text!userresume/templates/references.html', 'text!userresume/templates/listReferences.html', 
'facade', 'views', 'utils', 'vendor', 'userresume/collections/references', 
'userresume/collections/sports', 'userresume/models/reference'],
 function(require, referencesTemplate, listTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, ReferencesCollection = require('userresume/collections/references'),
	 SportsCollection = require('userresume/collections/sports'), ReferencesModel = require('userresume/models/reference'),

	//Models
	ReferencesView = SectionView.extend({

		template : referencesTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"click .btn-Add-reference_h" : "AddNewReference",
			//	"click .btn-Add-Existing_h" : "AddExistingReference",
			"click .btn-Save_reference_h" : "SaveNewReference",
			"click .btn-Update_reference_h" : "UpdateReference",
			"click .btn-Cancel-New" : "CancelNew",
			"click .btn-Cancel-Existing_reference_h" : "CancelExisting",
			"click .btn-remove_reference_h" : "RemoveReference",
			"click .edit_reference_h" : "EditReference"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {

			//Containers
			listContainer : "#section-list-references",
			newReferenceContainer : ".section-new-reference",
			newReferenceControls : ".section-new-controls",

			//Buttons
			btnAddReferencesExisting : ".btn-Add-Existing",
			btnAddNew : ".btn-Add",
			btnCancelExisting : ".btn-Cancel-Existing_reference_h",
			btnRemoveExisting : ".btn-remove_reference_h",
			btnUpdateReferenceExisting : ".btn-Update_reference_h",
			btnEditReference : ".edit_reference_h",

			//Imput Controls
			ddlSports : ".ddl-sports-references_h",
			newControls : ".txtReferences_h",
			txtName : ".txt_name_h",
			txtDescription : ".txt_description_h",
			txtYear : ".txt_year_h",
			txtEmail : ".txt_email_h",
			txtPhone : ".txt_phone_h",
			txtRelation : ".txt_relation_h",

			// LABELS
			lblError : '.error_h',
			lblSuccess : ".success_h"

		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistReferences : "No References entered yet.",
			MandatoryFields : "All Fields are Mandatory."
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);

			this.init();

		},

		/*render displays the view in browser*/
		render : function() {
			SectionView.prototype.render.call(this);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id;
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
		},
		setupView : function() {
			self.setUpMainView();
			self.setUpListView();
		},

		setUpMainView : function() {
			var markup = Mustache.to_html(self.template, {});
			$(self.el).html(markup);
		},

		setUpListView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new ReferencesCollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.references = Collection.parseAsRequired();
					if (self.references.length > 0) {
					var markup = Mustache.to_html(listTemplate, {
						data : self.references
					});
					$(self.el).find(self.controls.listContainer).html(markup);
				} else {
					$(self.el).find(self.controls.listContainer).html(self.messages.dataNotExistReferences);
				}
			});
		},
		ClearControls : function(e) {
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.newControls).val('');
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.newReferenceControls).fadeOut();
		},

		AddNewReference : function(e) {

			self.ClearControls(e);
			var dropdown = $(e.target).parents(self.controls.newReferenceContainer).find(self.controls.ddlSports);
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.newReferenceControls).fadeIn();

			if (self.sports && self.sports.length > 0) {
				self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', dropdown, 'Select Sport');
				return;
			} else {
				var List = new SportsCollection();
				List.sport_type = 1;
				List.sport_type_id = 1;
				// For Sports Not associated With Individuals
				//TODO:  Gender is missing in API so need to update code
				List.male = 1;
				List.female = 0;
				if (self.gender == "male") {
					List.male = 1;
				} else if (self.gender == "famale") {
					List.female = 0;
				}
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					if (models == null || models.length < 1)
						self.$(self.controls.ddlSports).parent().find(self.controls.fieldMessage).html(self.messages.dataNotExist).stop().fadeIn();

					self.sports = [];
					for (var key in models) {
						self.sports.push(models[key].payload);
					}
					// Sort Sports Before Filling Up Into Drop-Down
					self.sort(self.sports, 'sport_name', false);

					self.setDropdownOptions(self.sports, 'sport_name', 'sport_id', dropdown, 'Select Sport');

				});
			}
		},
		AddExistingReference : function() {
			console.log("Add Existing");
		},

		SaveReference : function(e, action) {
			var section = $(e.target).parents(self.controls.newReferenceContainer).find(self.controls.newReferenceControls);
			var sportId = $(e.target).attr('sportid') || section.find(self.controls.ddlSports).val();
			var name = section.find(self.controls.txtName).val();
			var description = section.find(self.controls.txtDescription).val();
			var relation = section.find(self.controls.txtRelation).val();
			var email = section.find(self.controls.txtEmail).val();
			var phone = section.find(self.controls.txtPhone).val();

			if (sportId == '' || sportId < 1 || $.trim(name) == '' || $.trim(phone) == '') {
				section.find(self.controls.lblError).html(self.messages.MandatoryFields).fadeIn();
				return;
			}

			section.find(self.controls.lblError).html('').fadeOut();

			var payload = {
				users_id : self.user_id,
				sports_id : sportId,
				name : name,
				relation : relation,
				email : email,
				phone : phone,
				long_description : description,				
			};
			var referenceId = 0;

			if (action == "update") {
				referenceId = $(e.target).attr('referenceid');
				payload.id1 = $(e.target).attr('referenceid');
			}

			var referencesModel = new ReferencesModel(payload);
			referencesModel.users_id = self.user_id;
			referencesModel.reference_id = referenceId;
			referencesModel.action = action;
			referencesModel.target = $(e.target);
			referencesModel.save();
			$.when(referencesModel.request).done(function() {
				self.ClearControls(e);
				self.setUpListView();
			});
		},

		SaveNewReference : function(e) {
			self.SaveReference(e, "save");
		},

		EditReference : function(e) {
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.newControls).removeAttr('disabled');
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.btnUpdateReferenceExisting).fadeIn();
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.btnCancelExisting).fadeIn();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnRemoveExisting).fadeOut();
		},

		UpdateReference : function(e) {
			self.SaveReference(e, "update");
		},

		CancelNew : function(e) {
			self.ClearControls(e);
		},
		
		CancelExisting : function(e) {
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.btnUpdateReferenceExisting).fadeOut();
			$(e.target).parents(self.controls.newReferenceContainer).find(self.controls.btnEditReference).fadeIn();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnRemoveExisting).fadeIn();
		},
		
		RemoveReference : function(e) {
			var referenceId = $(e.target).attr('referenceid');

			var payload = {
				id1 : referenceId,
				reference_id : referenceId,
				users_id : self.user_id
			};

			var referencesModel = new ReferencesModel(payload);
			referencesModel.id1 = referenceId;
			referencesModel.users_id = self.user_id;
			referencesModel.reference_id = referenceId
			referencesModel.action = "delete";
			referencesModel.target = $(e.target);
			referencesModel.destroy({
				success : function() {
					self.setUpListView();
				}
			});

		},
	});

	return ReferencesView;
});
