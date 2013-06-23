/* // Basic Information View
 // ---------
 // Pages profilesetting
 // Requires `define`, `require`
 // Returns {basic_info} constructor
 */
define(['require', 'text!profilesetting/templates/positions.html', 'facade', 'views', 'utils', 'vendor', 'profilesetting/collections/positions'], function(require, template) {

	var self, HighSchoolView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), Collection = require('profilesetting/collections/positions'), Mustache = vendor.Mustache, $ = facade.$, HighSchoolView = SectionView.extend({

		template : template,

		/*Bind Events on controls present in current view template*/
		events : {
		},

		/*Holds */

		/*Controls Holds all the html controls used in the view and template*/
		/*Jquery Selectors {#,. etc} must be preixed so that it could be directly used with $ Sign*/
		controls : {
			spnPositionTitle : '.spn-position-title_h'
		},

		/*Messages Holds the messages, warning, alerts, errors, information variables*/
		/*In Case of similar message create only one object and key*/
		messages : {
		},

		/*Contains all the properties and variables used in current view */
		properties : {
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			console.log("Positions options", options);
			self = this;
			self.setOptions(options);
			self.BindPositions();
			self.bindEvents();
		},
		/*function used to bind events on controls not present in current $el
		 Always use on so that dynamic creation of controls could be handled
		 * */
		bindEvents : function() {
			$(self.controls.spnPositionTitle).unbind('click');
			$(self.controls.spnPositionTitle).on('click',function() {
				self.MarkPosition(this);

			});

		},

		/*Mark Selected Position as Active ot inactive*/
		MarkPosition : function(control) {
			console.log("Mark Active In Position");
			if ($(control).hasClass('active')) {
				$(control).addClass('active');
			} else {
				$(control).removeClass('active');
			}
		},
		/*Set All the Options set at the time of creating instance*/
		setOptions : function(options) {
			console.log("Set Options in Season", options);
			if (!options.sport_id)
				throw new Error("Sport_id is missing for Positions View", options);
			else {
				this.destination = options.destination;
				this.sport_id = options.sport_id;
				this.el = options.destination;
			}
		},

		/*Returns the consolidated data to bind with template */
		BindPositions : function() {
			console.log(self.sport_id);
			if (self.sport_id) {
				var List = new Collection();
				List.sport_id = self.sport_id;
				List.fetch();

				$.when(List.request).done(function() {
					if (List.isError())
						return;

					var models = List.toJSON();
					console.log("Models", models);
					self.positions = [];
					if (models != null && models.length) {

						self.positions = [];
						for (var key in models) {
							self.positions.push(models[key].payload);
						}
						console.log("Positions", self.positions);

					} else {
						self.positions = [];
					}

					/*Bind Data within modal div*/
					self.render();
				});
			}
		},
		/* Displays the data view*/
		render : function() {

			var markup = Mustache.to_html(self.template, {
				Data : self.positions || []
			});
			console.log(self.destination);
			$(self.destination).html(markup);
		}
	});

	return HighSchoolView;
});
