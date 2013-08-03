// Add Media View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {AddMediaView} constructor

define([
	'require',
	'text!media/templates/add-media.html',
	'game/models/addmedia',
	'facade',
	'views',
	'sportorg/models/team'
],
	function (require, gameAddMediaTemplate) {

		var AddMediaView,
			facade = require('facade'),
			views = require('views'),
			SectionView = views.SectionView,
			SportorgTeamModel = require('sportorg/models/team'),
			_ = facade._;

		GameAddMediaView = SectionView.extend({

			id: 'add-media',

			template: gameAddMediaTemplate,

			events: {
				"click #addPhoto": "openAddImagePopup"
			},

			game_model: {},

			initialize: function (options) {
				SectionView.prototype.initialize.call(this, options);
			},

			// **Method** `setOptions` - called by BaseView's initialize method
			setOptions: function (options) {
				if (!this.model) {
					throw new Error("AddMediaView expects option with model property.");
				}
			},

			// Child views...
			childViews: {},

			render: function (domInsertion, dataDecorator, partials) {
				SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);
			},

			openAddImagePopup: function (event)
			{
				// create a team using the ID from the first team in the game
				var teamModel = new SportorgTeamModel({
					id: this.game_model.attributes.payload.teams[0].id
				});

				// get data for team
				teamModel.fetch();

				// stash as variable for deferred function
				var self = this;

				// wait for fetch to finish to create the data for the popup
				$.when(teamModel.request).done(function()
				{
					var url = "/api/game/addimage/" + self.game_model.attributes.id,
						attr = {
							"sports_id" : teamModel.attributes.payload.org_sport_link.sports_id
						};
					// open the popup
					Channel("add-image").publish(url, attr);
				});
			}



		});

		return GameAddMediaView;
	});