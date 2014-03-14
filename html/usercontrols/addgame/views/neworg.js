/**
 * Created with JetBrains PhpStorm.
 * User: mike
 * Date: 2/24/14
 * Time: 4:16 PM
 * To change this template use File | Settings | File Templates.
 */
define(['require',
	'text!usercontrol/addgame/templates/neworg.html',
	'facade',
	'views',
	'utils',
	'vendor'],
	function(require,newOrgTemplate) {

	var self,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		$ = facade.$;

	var BaseView = views.BaseView,
		Backbone = facade.Backbone,
		_self;
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : newOrgTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click #add_team_2-h":"createNewOrg"
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;

			console.log(this.$el);

			_self.setOptions(options);
			_self.render();
		},

		createNewOrg: function(e){
			e.stopPropagation();
			e.preventDefault();
			this.parentView.addTeamToNewOrg(e);
		},

		//render displays the view in browser
		render : function() {
		//	Backbone.View.prototype.render.call(this);

			var markup = _.template(this.template,{search_text:this.search_text});
			console.log(markup);
			this.$el.html(markup);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			for (var i in options) {
				this[i] = options[i];
			}
		},

		destroy_view: function() {

			//COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();

			this.$el.removeData().unbind();

			//Remove view from DOM
			this.remove();
			Backbone.View.prototype.remove.call(this);

		}
	});
});
