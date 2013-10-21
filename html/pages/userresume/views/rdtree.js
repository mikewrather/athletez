/* // RDTREE View
 // ---------
 // Pages
 // Requires `define`, `require`
 // Returns {RDTREEVIEW} constructor
 */
define(['require', 'text!userresume/templates/rdtree.html', 'facade', 'views', 'utils', 'vendor', 'userresume/collections/rdtree', 'userresume/models/rdtree'], function(require, rdTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Mustache = vendor.Mustache, $ = facade.$, RDTreeCollection = require('userresume/collections/rdtree'), RDTreeModel = require('userresume/models/rdtree'), RDTREEVIEW = SectionView.extend({

		template : rdTemplate,

		/*Bind Events on controls present in current view template*/
		events : {
			"click .btn-edit-rdtree_h" : "MarkEdit",
			"click .txtRdTrees_h" : "MakeEdit",
			"click .btn-Finish-RdTree_h" : "FinishEdit",
			"blur .txtRdTrees_h" : "SaveResumeData"
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
			txtRdTree : ".txtRdTrees_h"
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
			dataNotExist : "Data Not Exists For RD Trees."
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

				self.Tree = Collection.parseAsRequired();
				console.log("d", self.Tree);

				var markup = Mustache.to_html(self.template, {
					rdtrees : self.Tree
				});
				$(self.el).html(markup);

			});
		},

		MarkEdit : function(e) {
			console.log(e);
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.txtRdTree).removeAttr('disabled');
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.btnFinishRdTree).fadeIn();
		},
		MarkEdit : function(e) {
			console.log(e);
			$(e.target).fadeOut();
			$(e.target).removeAttr('disabled');
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.btnFinishRdTree).fadeIn();
		},
		FinishEdit : function(e) {
			$(e.target).fadeOut();
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.txtRdTree).attr('disabled', 'disabled');
			$(e.target).parents(self.controls.sectionRdTreeItems).find(self.controls.btnEditRdTree).fadeIn();

		},
		SaveResumeData : function(e) {
			var id = $(e.target).attr('treeId');
			var rdId = $(e.target).attr('resumeDataId');
			var value = $(e.target).val();

			var payload = {
				treeId : id,
				user_id : self.user_id,
				resume_data_id : rdId,
				user_value : value
			}

			var rdModel = new RDTreeModel(payload);
			rdModel.treeId = id;
			rdModel.user_id = self.user_id;
			rdModel.target = $(e.target);
			if (id > 0) {
				rdModel.action = "update";
				rdModel.save({
					id1 : id
				});
			} else {
				rdModel.action = "save";
				rdModel.save();
			}

			$.when(rdModel.request).done(function(response) {
				console.log("response",response);
				if(response.payload != null){
					if(response.payload.id > 0){
						console.log(response.payload);
						$(e.target).attr('treeId',response.payload.id);
					}
				}
				$('.txtRdTrees_h[resumedataid="'+ response.payload.resume_data_id +'"]').val(response.payload.user_value)
				$(e.target).parent().find(".error_h").html('').fadeOut();
				$(e.target).parent().find(".success_h").html('').fadeOut();
			});
		}
	});

	return RDTREEVIEW;
});
