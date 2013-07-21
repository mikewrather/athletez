/* // RDTREE View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {RDTREEVIEW} constructor
 */
define(['require', 'text!userresume/templates/rdtree.html', 'facade', 'views', 'utils', 'vendor', 'userresume/collections/rdtree'], function(require, rdTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, RDTreeCollection = require('userresume/collections/rdtree'), RDTREEVIEW = SectionView.extend({

		template : rdTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"click .btn-edit-rdtree_h" : "MarkEdit",
			"click .btn-Finish-RdTree_h" : "FinishEdit"
		},

		/*Holds */
		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			// Buttons
			btnEditRdTree : ".btn-edit-rdtree_h",
			btnFinishRdTree : ".btn-Finish-RdTree_h",
			// Containers
			sectionRdTreeItems : ".section-rdtree-items_h",
			// TEXTBOXES
			txtRdTree : ".txtRdTrees_h",
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Not Exists For RD Trees."
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

		/*Set complete view like template rendering, default data bindings*/
		setupView : function() {
			var self = this;
			var payload = {
				user_id : self.user_id
			};
			var Collection = new RDTreeCollection(payload);
			Collection.user_id = self.user_id;
			Collection.fetch();

			$.when(Collection.request).done(function() {
				if (Collection.isError())
					return;

				var models = Collection.toJSON();
				if (models.length) {
					var d = [];

					$.each(models, function(index, load) {
						var temp = {
							title : load.payload.name
						}
						var data = [];
						for (var key in load.payload.data) {
							var t = load.payload.data[key];
							var obj = {
								name : t.name,
								id : t.id,
								type : t.type,
								val : t.val || ""
							}
							data.push(obj);
						}
						temp.data = data;

						d.push(temp);
					});

					self.Tree = d;
					console.log("d", d);
					var markup = Mustache.to_html(self.template, {
						rdtrees : d
					});
					$(self.el).html(markup);
				} else {
					$(self.el).html(self.messages.dataNotExist);

				}

			});
			// this.scheme.push(this.basicView);
		},

		MarkEdit : function(e) {
			$(e.target).fadeOut();
		$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.txtRdTree).removeAttr('disabled');
		$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.btnFinishRdTree).fadeIn();
		},
		FinishEdit : function(e){
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.txtRdTree).attr('disabled','disabled');
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.btnEditRdTree).fadeIn();
			
		}
	});

	return RDTREEVIEW;
});
