/* // RDTREE View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {RDTREEVIEW} constructor
 */
define(['require', 'text!userresume/templates/academic.html', 'text!userresume/templates/gpa.html', 'text!userresume/templates/test.html', 'text!userresume/templates/testtopics.html', 'text!userresume/templates/testlist.html', 'facade', 'views', 'utils', 'vendor', 'userresume/collections/gpa', 'userresume/collections/tests', 'userresume/collections/academictests'], function(require, academicTemplate, templateGpa, templateTests, templateTestTopics, templateTestsListAll) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, GPACollection = require('userresume/collections/gpa'), TestCollection = require('userresume/collections/tests'), AcademicTestsCollection = require("userresume/collections/academictests"), AcademicView = SectionView.extend({

		template : academicTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"click .edit-gpa" : "EditGpa",
			"click .edit-test" : "EditTest",
			"click .btn-Add-test" : "OpenTestPopUp",
			"change .chk-test-Standardized_h" : "AddStandardTest",
			"change .chk-test-AP_h" : "AddAPTest",
			"click .btn-finish-test-topic_h" : "FinishTest"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			// Buttons
			BtnFinishTestTopics : ".btn-finish-test-topic_h",
			BtnEditTest : ".edit-test",
			// Containers
			ContainerGpa : "#container-academic-gpa",
			ContainerStandard : "#container-StandardizedTest",
			ContainerAP : "#container-ApTest",
			SectionModalTests : ".section-modal-academic-tests_h",
			SectionTestTopics : ".section-test-topics_h",
			ItemTestTopic : ".item-test-topic_h",

			// TEXTBOXES
			TxtScore : ".txtTestScore_h",
			ModalBox : ".tests-modal_h"

		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistGPA : "Data Does Not Exists For GPA TESTS.",
			dataNotExistTests : "Data Does Not Exist For Tests."
		},
		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			//	debugger;
			SectionView.prototype.initialize.call(this, options);
			self = this;
			self.setOptions(options);
			//debugger;

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
			self.setUpGpaView();
			self.setUpStandardTestView();
			self.setUpAPTestView();
		},
		setUpMainView : function() {
			$(self.el).html(self.template);
		},
		/*Set complete view like template rendering, default data bindings*/
		setUpGpaView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new GPACollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.gpa = Collection.parseAsRequired();
				console.log("self.gpa",self.gpa);
				if (self.gpa.length > 0) {
					var markup = Mustache.to_html(templateGpa, {
						data : self.gpa
					});
					$(self.el).find(self.controls.ContainerGpa).html(markup);
				} else {
					self.$el(self.controls.ContainerGpa).html(self.messages.dataNotExistGPA);

				}

			});
		},
		EditGpa : function() {
			alert("Edit GPA");
		},

		/*Set Test Views*/
		setUpStandardTestView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new TestCollection(payload);
			Collection.user_id = self.user_id;
			Collection.includeStandard = 1;
			Collection.includeAp = 0;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.standardTests = Collection.parseAsRequired();
				console.log("standard test", self.standardTests);
				var testIds = "";
				$.each(self.standardTests, function(index, test) {
					testIds += test.id + ",";
				});

				var markup = Mustache.to_html(templateTests, {
					Test_Type : "Standardized",
					TestIds : testIds
				});
				$(self.el).find(self.controls.ContainerStandard).html(markup);

				var topicsHtml = Mustache.to_html(templateTestTopics, {
					Test_Type : "Standardized",
					data : self.standardTests
				});
				$(self.el).find(self.controls.ContainerStandard).find(self.controls.SectionTestTopics).html(topicsHtml);

				// Call function to fill all tests in pop up
				self.setUpStandardTestListAllView();
			});
		},
		/*Set Test Views*/
		setUpStandardTestListAllView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new AcademicTestsCollection(payload);
			Collection.user_id = self.user_id;
			Collection.includeStandard = 1;
			Collection.includeAp = 0;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.standardTestsListAll = Collection.parseAsRequired();

				console.log("standard test list all", self.standardTestsListAll);
				if (self.standardTestsListAll.length > 0) {
					var markup = Mustache.to_html(templateTestsListAll, {
						Test_Type : "Standardized",
						data : self.standardTestsListAll
					});
					$(self.el).find(self.controls.ContainerStandard).find(self.controls.SectionModalTests).html(markup);
				} else {
					self.$el(self.controls.ContainerStandard).find(self.controls.SectionModalTests).html(self.messages.dataNotExistTests);
				}

			});
		},
		AddStandardTest : function(e) {

			var testid = $(e.target).attr('testid');
			if ($(e.target).is(':checked')) {
				var d = [];
				$.each(self.standardTestsListAll, function(index, load) {

					if (load.id == testid) {
						d.push(load);
					}
				});

				var topicsHtml = Mustache.to_html(templateTestTopics, {
					Test_Type : "Standardized",
					data : d
				});
				$(self.el).find(self.controls.ContainerStandard).find(self.controls.SectionTestTopics).append(topicsHtml);
			}else{
				
				$(self.el).find(self.controls.ContainerStandard).find(".item-test-" + testid).remove();
			}
		},

		/*AP TEST SECTION STARTS*/
		/*Set Test Views*/
		setUpAPTestView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new TestCollection(payload);
			Collection.user_id = self.user_id;
			Collection.includeStandard = 0;
			Collection.includeAp = 1;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.apTests = Collection.parseAsRequired();
				console.log("ap test", self.apTests);
				var testIds = "";
				$.each(self.apTests, function(index, test) {
					testIds += test.id + ",";
				});
				var markup = Mustache.to_html(templateTests, {
					Test_Type : "AP",
					TestIds : testIds
				});
				$(self.el).find(self.controls.ContainerAP).html(markup);

				var topicsHtml = Mustache.to_html(templateTestTopics, {
					Test_Type : "AP",
					data : self.apTests
				});

				$(self.el).find(self.controls.ContainerAP).find(self.controls.SectionTestTopics).html(topicsHtml);
				self.setUpAPTestListAllView();

			});
		},
		/*Set Test Views*/
		setUpAPTestListAllView : function() {
			var payload = {
				user_id : self.user_id
			};
			var Collection = new AcademicTestsCollection(payload);
			Collection.user_id = self.user_id;
			Collection.includeStandard = 0;
			Collection.includeAp = 1;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				self.apTestsListAll = Collection.parseAsRequired();

				console.log("ap test list all", self.apTestsListAll);
				if (self.apTestsListAll.length > 0) {
					var markup = Mustache.to_html(templateTestsListAll, {
						Test_Type : "AP",
						data : self.apTestsListAll
					});
					$(self.el).find(self.controls.ContainerAP).find(self.controls.SectionModalTests).html(markup);
				} else {
					self.$el(self.controls.ContainerAP).find(self.controls.SectionModalTests).html(self.messages.dataNotExistTests);
				}

			});
		},
		AddAPTest : function(e) {

			var testid = $(e.target).attr('testid');
			if ($(e.target).is(':checked')) {
				var d = [];
				$.each(self.apTestsListAll, function(index, load) {

					if (load.id == testid) {
						d.push(load);
					}
				});

				var topicsHtml = Mustache.to_html(templateTestTopics, {
					Test_Type : "Standardized",
					data : d
				});
				$(self.el).find(self.controls.ContainerAP).find(self.controls.SectionTestTopics).append(topicsHtml);
			}else{
				
				$(self.el).find(self.controls.ContainerAP).find(".item-test-" + testid).remove();
			}
		},
		EditTest : function(e) {
			$(e.target).parents(self.controls.ItemTestTopic).find(self.controls.TxtScore).removeAttr('disabled');
			$(e.target).parents(self.controls.ItemTestTopic).find(self.controls.BtnFinishTestTopics).fadeIn();
			$(e.target).fadeOut();
			//TxtScore
			//ItemTestTopic
		},
		FinishTest : function(e) {
			$(e.target).parents(self.controls.ItemTestTopic).find(self.controls.TxtScore).attr('disabled', 'disabled');
			$(e.target).parents(self.controls.ItemTestTopic).find(self.controls.BtnEditTest).fadeIn();
			$(e.target).fadeOut();
		},
		OpenTestPopUp : function(e) {
			var ids = $(e.target).attr('testids');
			var array = ids.split(',');
			$.each(array,function(index,id){
				self.$(e.target).parent().find(self.controls.ModalBox).find(".chk-"+ id).attr('checked','checked');
			});
			
			self.$(e.target).parent().find(self.controls.ModalBox).modal('show');
		}
	});

	return AcademicView;
});
