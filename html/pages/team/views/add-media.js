// Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {TeamAddMediaView} constructor

define(['require', 'text!media/templates/add-media.html', 'profile/models/addmedia', 'facade', 'views'], function(require, teamAddMediaTemplate) {

	var TeamAddMediaView, facade = require('facade'), views = require('views'), SectionView = views.SectionView, _ = facade._;

	TeamAddMediaView = SectionView.extend({

		//id: 'add-media',
		template : teamAddMediaTemplate,
		tagName : "div",
		id : "add-media",

		events : {
			"click #addPhoto" : "openAddImagePopup",
			"click #addVideo" : "openAddvideoPopup",
			"click #addGame" : "openAddGamePopup",
			"mouseover a" : "showText",
			"mouseout a" : "showicon"
		},

		// show text
		showText : function(e) {
			$(e.target).parent().find("span").removeClass("hide");
		},

		// shoe icon
		showicon : function(e) {
			$(e.target).parent().find("span").addClass("hide");
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			if (!this.model) {
				throw new Error("ProfileAddMediaView expects option with model property.");
			}
			this.model.userid = options.userid;
		},

		afterRender : function() {
			var _self = this;
			$ele = this.$el.find(".character-limit-h");
			$ele.each(function() {
				_self.adJustFontDynamically($(this));
			});
		},

		openAddGamePopup : function() {
			routing.trigger('add-game', this.model.userid);
		},

		openAddImagePopup : function(event) {
			var sport_id = $('#sports-h').val(), id = $("#team-h").val(), url = "/api/team/addimage/" + id, url = "/api/team/addimage/" + id, attr = {
				"sports_id" : sport_id
			};
			routing.trigger('add-image', url, attr);
		},
		openAddvideoPopup : function(event) {

			//** firing the call back list

			var url = "/api/user/addvideo/" + this.model.id;

			Channel('add-video').publish(url);

		}
	});

	return TeamAddMediaView;
}); 