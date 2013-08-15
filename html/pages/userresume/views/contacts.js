/* // Contacts View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {CONTACTS VIEW} constructor
 */
define(['require', 'text!userresume/templates/contact.html', 'facade', 'views', 'utils', 'vendor', 
'userresume/collections/contacts'],
 function(require, contactTemplate) {

	var self, facade = require('facade'),
	 views = require('views'),
	  SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, 
	  vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, 
	  ContactsCollection = require('userresume/collections/contacts'),
	  

	//Models
	 ContactView = SectionView.extend({

		template : contactTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistContacts : "Data Does Not Exists For Contacts.",
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
			//	this.el = options.destination;
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
			
		},


		setUpListView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new ContactsCollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.contacts = Collection.parseAsRequired();
				//console.log("self.contacts", self.contacts);
				if (self.contacts.length > 0) {
					var markup = Mustache.to_html(contactTemplate, {
						data : self.contacts
					});
					$(self.el).find(self.el).html(markup);
				} else {
					self.$el(self.controls.ContainerGpa).html(self.messages.dataNotExistContacts);

				}

			});
			
		}
	});

	return ContactView;
});
