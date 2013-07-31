/* // Contacts View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {CONTACTS VIEW} constructor
 */
define(['require', 'text!userresume/templates/awards.html','text!userresume/templates/listAwards.html', 'facade', 'views', 'utils', 'vendor', 
'userresume/collections/awards'],
 function(require, awardsTemplate,listTemplate) {

	var self, facade = require('facade'),
	 views = require('views'),
	  SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, 
	  vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, 
	  AwardsCollection = require('userresume/collections/awards'),
	  

	//Models
	 AwardsView = SectionView.extend({

		template : awardsTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			//Containers
			listContainer : "#section-list-awards",
			
			//Buttons
			btnAddAwardsExisting : ".btn-Add-Existing",
			btnAddNew : ".btn-Add",
			
			//Imput Controls
			ddlSports : ".ddl-sports-awards"
			
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistAwards : "Data Does Not Exists For Awards.",
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
		setUpMainView : function(){
			var markup = Mustache.to_html(self.template,{});
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
		}
	});

	return AwardsView;
});
