/* // RDTREE View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {RDTREEVIEW} constructor
 */
define(['require', 'text!userresume/templates/academic.html',
 'facade', 'views', 'utils', 'vendor', 'userresume/collections/gpa'], function(require, academicTemplate) {

	var self, facade = require('facade'), views = require('views'), 
	SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, 
	vendor = require('vendor'), Mustache = vendor.Mustache, 
	$ = facade.$, GPACollection = require('userresume/collections/rdtree'), AcedemicView = SectionView.extend({

		template : academicTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			// Buttons
			// Containers
			// TEXTBOXES
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExistGPA : "Data Not Exists For GPA TESTS."
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
		},

		/*initialize must be a wrapper so any function definitions and calles must be called in init*/
		init : function() {
			self.setupView();
		},
		setupView : function() {
			self.setUpGpaView();
		},
		/*Set complete view like template rendering, default data bindings*/
		setUpGpaView : function() {
			var self = this;
			var payload = {
				user_id : self.user_id
			};
			var Collection = new GPACollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				var models = Collection.toJSON();
				console.log("models for gpa are ",models);
				// if (models.length) {
					// var d = [];
// 
					// $.each(models, function(index, load) {
						// var temp = {
							// title : load.payload.name
						// }
						// var data = [];
						// for (var key in load.payload.data) {
							// var t = load.payload.data[key];
							// var obj = {
								// name : t.name,
								// id : t.id,
								// type : t.type,
								// val : t.val || ""
							// }
							// data.push(obj);
						// }
						// temp.data = data;
// 
						// d.push(temp);
					// });
// 
					// self.Tree = d;
					// console.log("d", d);
					// var markup = Mustache.to_html(self.template, {
						// rdtrees : d
					// });
					// $(self.el).html(markup);
				// } else {
					// $(self.el).html(self.messages.dataNotExist);
// 
				// }

			});
			// this.scheme.push(this.basicView);
		}
	});

	return AcademicView;
});
