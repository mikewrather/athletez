/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 
'text!profilesetting/templates/individualsports.html',
'text!profilesetting/templates/sportscheckbox.html',
 'facade', 'views', 'utils', 'vendor', 
 'profilesetting/collections/individualsports',
 
  
   ], function(require, individualSportsTemplate,sportsCheckboxes) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$,
	   SportsCollection = require('profilesetting/collections/individualsports'),

	HighSchoolView = SectionView.extend({

		template : individualSportsTemplate,
		/*Bind Events on controls present in current view template*/
		events : {
			"change .select-all" : "CheckAll",
			"change .chk-single" : "CheckSelectAll"
		},
		/*Holds */

		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			content : '#section-individual-prof-setting',
			sportslist : '.sports-list-individial-sports',
			btnSave: '.btn-Save-Individual-Sports',
			chkAll : '.select-all',
			chkSingle : '.chk-single'
		},
		
		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : 'Data not exist.',
			optionsMissing : 'HeaderView expects option with model property.',
		},
		/*FUNCTION TO BE CALLED AS SOON AS INTANCE CREATED SHOULD BE CALLED HERE*/
		initialize : function(options) {
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options)

			this.init();

		},
		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupSportsView();

		},
		/*render displays the view in browser*/
		render : function() {
			SectionView.prototype.render.call(this);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.user_id = options.user_id,
			this.gender = options.gender,
			this.destination = options.destination
		},
		
		/*Set complete view like template rendering, default data bindings*/
		setupSportsView : function() {
		var List = new SportsCollection();
		List.user_id = self.user_id;
			List.fetch();

			$.when(List.request).done(function() {
				if (List.isError())
					return;

				var models = List.toJSON();
				if (models == null || models.length < 1){
					return;
				}
				
				self.sports = [];
				for (var key in models) {
					self.sports.push(models[key].payload);
				}
				
				var markup = Mustache.to_html(sportsCheckboxes, {sports: self.sports});
            	self.$(self.controls.sportslist).html(markup);
			});
		},
		/*SELECT ALL SPORTS IF A USER CLICKS ON SELECT ALL*/
		CheckAll : function(e){
			console.log("Check All");
			if($(e.target).is(':checked')){
				self.$(self.controls.chkSingle).attr('checked','checked');
			}
			else {
				self.$(self.controls.chkSingle).removeAttr('checked','checked');
				
			}
		},
		/*CHECK UNCHECK SELECT ALL AS PER THE NUMBER OF SELECTED SPORTS, IF ALL ARE SELECTED THEN CHECKED ELSE UNCHECKED*/
		CheckSelectAll: function(e){
			console.log("Check Select All Called ");
			
			if($(e.target).is(':checked')){
				var isAllChecked = true;
				self.$(self.controls.chkSingle).each(function(){
					if(! $(this).is(':checked')){
						isAllChecked = false;
					}
				});
				
				if(isAllChecked)
					self.$(self.controls.chkAll).attr('checked','checked');	
				else
						self.$(self.controls.chkAll).removeAttr('checked','checked');
			}
			else {
				self.$(self.controls.chkAll).removeAttr('checked','checked');
				
			}
		},
			});

	return HighSchoolView;
});
