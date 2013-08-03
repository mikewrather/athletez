/* // Contacts View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {CONTACTS VIEW} constructor
 */
define(['require', 'text!userresume/templates/awards.html', 'text!userresume/templates/listAwards.html', 'facade', 'views', 'utils', 'vendor', 'userresume/collections/awards', 'userresume/collections/sports', 'userresume/models/award'], function(require, awardsTemplate, listTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, AwardsCollection = require('userresume/collections/awards'), SportsCollection = require('userresume/collections/sports'), AwardsModel = require('userresume/models/award'),

	//Models
	AwardsView = SectionView.extend({

		template : awardsTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"click .btn-Add-award_h" : "AddNewAward",
			//	"click .btn-Add-Existing_h" : "AddExistingAward",
			"click .btn-Save_award_h" : "SaveNewAward",
			"click .btn-Update_award_h" : "UpdateAward",
			"click .btn-Cancel-New" : "CancelNew",
			"click .btn-Cancel-Existing_award_h" : "CancelExisting",
			"click .btn-remove_award_h" : "RemoveAward",
			"click .edit_award_h" : "EditAward"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {

			//Containers
			listContainer : "#section-list-awards",
			newAwardContainer : ".section-new-award",
			newAwardControls : ".section-new-controls",

			//Buttons
			btnAddAwardsExisting : ".btn-Add-Existing",
			btnAddNew : ".btn-Add",
			btnCancelExisting : ".btn-Cancel-Existing_award_h",
			btnRemoveExisting : ".btn-remove_award_h",
			btnUpdateAwardExisting : ".btn-Update_award_h",
			btnEditAward : ".edit_award_h",

			//Imput Controls
			ddlSports : ".ddl-sports-awards_h",
			newControls : ".txtAwards_h",
			txtName : ".txt_name_h",
			txtDescription : ".txt_description_h",
			txtYear : ".txt_year_h",

			// LABELS
			lblError : '.error_h',
			lblSuccess : ".success_h"

		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistAwards : "Data Does Not Exists For Awards.",
			MandatoryFields : "Sports Id, Name , Year are mandatory."
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
			var Collection = new AwardsCollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.awards = Collection.parseAsRequired();
				console.log("self.awards", self.awards);
				if (self.awards.length > 0) {
					var markup = Mustache.to_html(listTemplate, {
						data : self.awards
					});
					$(self.el).find(self.controls.listContainer).html(markup);
				} else {
					$(self.el).find(self.controls.listContainer).html(self.messages.dataNotExistAwards);
				}
			});
		},
		ClearControls : function(e) {
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.newControls).val('');
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.newAwardControls).fadeOut();
		},

		AddNewAward : function(e) {
			console.log("Add new");

			self.ClearControls(e);
			var dropdown = $(e.target).parents(self.controls.newAwardContainer).find(self.controls.ddlSports);
			console.log(dropdown);
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.newAwardControls).fadeIn();

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
		AddExistingAward : function() {
			console.log("Add Existing");
		},

		SaveAward : function(e, action) {

			var section = $(e.target).parents(self.controls.newAwardContainer).find(self.controls.newAwardControls);
			var sportId = $(e.target).attr('sportid') || section.find(self.controls.ddlSports).val();
			var name = section.find(self.controls.txtName).val();
			var year = section.find(self.controls.txtYear).val();
			var description = section.find(self.controls.txtDescription).val();

			if (sportId =='' || sportId < 1 || $.trim(name) == '' || $.trim(description) == ''|| $.trim(year) == '') {

				section.find(self.controls.lblError).html(self.messages.MandatoryFields).fadeIn();
				return;
			}

			section.find(self.controls.lblError).html('').fadeOut();

			var payload = {
				description : description,
				name : name,
				sports_id : sportId,
				year : year,
				users_id : self.user_id
			};
			var awardId =0;
			
			if(action == "update"){
				awardId = $(e.target).attr('awardid');
				payload.id1 = $(e.target).attr('awardid');
			}
			
			var awardsModel = new AwardsModel(payload);
			awardsModel.users_id = self.user_id;
			awardsModel.award_id = awardId;
			awardsModel.action = action;
			
			
			
			awardsModel.save();
			$.when(awardsModel.request).done(function() {
				self.ClearControls(e);
				self.setUpListView();
			});
		},

		SaveNewAward : function(e) {
			console.log("Save New");
		
			self.SaveAward(e, "save");
		},
		
		EditAward : function(e){
			console.log("Edit Award")
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.newControls).removeAttr('disabled');
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnUpdateAwardExisting).fadeIn();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnCancelExisting).fadeIn();
			
		},
		
		UpdateAward : function(e) {
			console.log("Update Award")
			self.SaveAward(e,"update");

		},
		
		CancelNew : function() {
			console.log("Cancel New");
			self.ClearControls(e);
		},
		CancelExisting : function() {
			console.log("Cancel Existing")
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnUpdateAwardExisting).fadeOut();
			$(e.target).parents(self.controls.newAwardContainer).find(self.controls.btnEditAward).fadeIn();
		
		},
		RemoveAward : function(e) {
			console.log("Remove Award");
			var awardId = $(e.target).attr('awardid');
			
			var payload = {
				id1: awardId,
				award_id : awardId,
				users_id : self.user_id
			};
			
			var awardsModel = new AwardsModel(payload);
			awardsModel.id1 = awardId;
			awardsModel.users_id = self.user_id;
			awardsModel.award_id = awardId
			awardsModel.action = "delete";
			awardsModel.destroy({
				success:function(){
				self.setUpListView();	
				}
			});
			
		},
	});

	return AwardsView;
});
