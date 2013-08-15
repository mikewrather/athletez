/*
 // -------------------
 // -------------------
 // module as controller for 'profilesetting' package
 // Returns {UserResumeController} constructor
 */

define(["require", "text!userresume/templates/layout.html", 
	"text!userresume/templates/sentresume.html",
	 'text!userresume/templates/basic_info_header.html',
	  'text!userresume/templates/rdtree.html',
	  'text!userresume/templates/academic.html',
	  'text!userresume/templates/awards.html',
	  'text!userresume/templates/contact.html',
	  'text!userresume/templates/references.html',
	  
	   "facade",
	  
	   "controller", "models", "views",
	    "utils", "userresume/models/basic_info",
	     'userresume/models/resume',
	      'userresume/models/rdtree',
	       'userresume/models/gpa',
	       'userresume/models/award',
	       'userresume/models/contact',
	       'userresume/models/reference',
	      
	    "userresume/views/basic_info",
	     "userresume/views/sentresumeview", 
	     "userresume/views/rdtree",
	     "userresume/views/academic",
	     "userresume/views/awards",
	     "userresume/views/contacts",
	     "userresume/views/references",
	     
	     ], function(require, pageLayoutTemplate, sentResumeHtml, basicInfoHtml, rdTreeHtml,academicHtml,awardsHtml,contactHtml,referenceHtml) {

	var UserResumeController, facade = require("facade"), Controller = require("controller"), models = require("models"), views = require("views"), utils = require("utils"), $ = facade.$, _ = facade._, debug = utils.debug, Channel = utils.lib.Channel, LayoutView = views.LayoutView,

	/*MODEL SECTION*/
	BasicInfoModel = require("userresume/models/basic_info"), 
	ResumeModel = require('userresume/models/resume'),
	RDTreeModel = require("userresume/models/rdtree"),
	GpaModel = require("userresume/models/gpa"),
	AwardModel = require("userresume/models/award"),
	ContactModel = require("userresume/models/contact"),
	ReferenceModel = require("userresume/models/reference"),
	
	/*COLLECTIONS SECTIONS*/

	/*VIEW SECTION*/
	BasicInfoView = require("userresume/views/basic_info"), SentResumeView = require("userresume/views/sentresumeview"),
	RDTreeView = require("userresume/views/rdtree"),
	AcademicView = require("userresume/views/academic"),
	AwardsView = require("userresume/views/awards"),
	ContactsView = require("userresume/views/contacts"),
	ReferencesView = require("userresume/views/references"),
	UserResumeController = Controller.extend({
		/*CSS SECTION*/
		cssArr : ["/pages/userresume/userresume.css"],

		events : {
		},
		/*Actions to be performed on the first time the object is created*/
		initialize : function(options) {

			/*Load CSS File*/
			Channel('load:css').publish(this.cssArr);
			/*Bind Class with all events*/
			_.bindAll(this);

			if (options.id) {
				this.id = options.id;
				this.init();
			}

			return this;

		},
		/*To reduce initialize methods length and all the view related functions */
		init : function() {
			this.setupLayout().render();
			this.setupView();
			this.handleDeferreds();

		},
		/*Method renders the page layout for user setting page*/
		/*pageLayoutTemplate is just the skeleton for user setting page modules like High School,Clubs,Individual Sports,
		 *  Their respective implementation is done in their own view respectively*/
		setupLayout : function() {
			var pageLayout;

			if (this.layout)
				return this.layout;

			var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#main",
				template : pageLayoutTemplate,
				displayWhen : "ready"
			});
			this.layout = pageLayout;

			return this.layout;
		},
		/*Creates objects for different child views used in the page like header, HighSchool, ClubView, IndividualSports*/
		setupView : function() {
			var self = this;
			this.basicInfoModel = new BasicInfoModel();
			this.basicInfoModel.id = self.id;
			this.basicInfoModel.fetch();

			//Set Up different views when you have all userinfo about user
			$.when(this.basicInfoModel.request).done(function() {

				var data = self.basicInfoModel.toJSON()

				// Assign Properties From Data
				self.gender = data.payload.gender;

				// Call All The Views
				self.setUpBasicView();
				self.setUpSentResumeView();
				self.setUpRdTreeView();
				self.setUpAcademicView();
				self.setUpAwardsView();
				self.setUpContactsView();
				self.setUpReferenceView();
			});

		},
		/*Set up Basic Info View*/
		setUpBasicView : function() {
			var self = this;
			this.basicView = new BasicInfoView({
				model : new BasicInfoModel(),
				template : basicInfoHtml,
				//scheme : this.scheme,
				name : "basic-info",
				destination : "#section-basics-prof-setting",
				user_id : self.id,
				id : self.id
			});

			this.scheme.push(this.basicView);
		},
		/*Set up Basic Info View*/
		setUpSentResumeView : function() {
			var self = this;
			this.sentResumeView = new SentResumeView({
				model : new ResumeModel(),
				template : sentResumeHtml,
				//scheme : this.scheme,
				name : "sent-resume",
				destination : "#section-sent-resume",
				user_id : self.id,
				id : self.id
			});

			this.scheme.push(this.sentResumeView);
			this.layout.render();
		},
		/*Set up Basic Info View*/
		setUpRdTreeView : function() {
			var self = this;
			this.rdTreeView = new RDTreeView({
				model : new RDTreeModel(),
				template : rdTreeHtml,
				//scheme : this.scheme,
				name : "rd-tree",
				destination : "#section-RD-Tree",
				user_id : self.id,
			});

			this.scheme.push(this.rdTreeView);
			this.layout.render();
		},
		/*Set up Basic Info View*/
		setUpAcademicView : function() {
			var self = this;
			this.academicView = new AcademicView({
				model : new GpaModel(),
				template : academicHtml,
				//scheme : this.scheme,
				name : "resume-academic",
				destination : "#section-academic",
				user_id : self.id,
			});

			this.scheme.push(this.academicView);
			this.layout.render();
		},
		
		/* Set  Up  User  Awards  View  View */
		setUpAwardsView : function() {
			var self = this;
			this.awardsView = new AwardsView({
				model : new AwardModel(),
				template : awardsHtml,
				name : "resume-awards",
				destination : "#section-awards",
				user_id : self.id,
			});

			this.scheme.push(this.awardsView);
			this.layout.render();
		},
		
		/* Set  Up  User Contacts  View  View */
		setUpContactsView : function() {
			var self = this;
			this.contactsView = new ContactsView({
				model : new ContactModel(),
				template : contactHtml,
				name : "resume-contacts",
				destination : "#section-contacts",
				user_id : self.id,
			});

			this.scheme.push(this.contactsView);
			this.layout.render();
		},
		
		/* Set  Up  User References  View  View */
		setUpReferenceView : function() {
			var self = this;
			this.referenceView = new ReferencesView({
				model : new ReferenceModel(),
				template : referenceHtml,
				name : "resume-references",
				destination : "#section-references",
				user_id : self.id,
			});

			this.scheme.push(this.referenceView);
			this.layout.render();
		}


	});
	return UserResumeController;

});

