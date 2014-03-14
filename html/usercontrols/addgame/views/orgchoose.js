/**
 * Created with JetBrains PhpStorm.
 * User: mike
 * Date: 2/24/14
 * Time: 4:16 PM
 * To change this template use File | Settings | File Templates.
 */
define(['require',
	'text!usercontrols/addgame/templates/orgchoose.html',
	'usercontrols/addgame/models/org_addteam',
	'facade',
	'views',
	'utils',
	'vendor'],
	function(require,
	         layoutTemplate) {

	var self,
		facade = require('facade'),
		views = require('views'),
		SectionView = views.SectionView,
		utils = require('utils'),
		Channel = utils.lib.Channel,
		vendor = require('vendor'),
		Mustache = vendor.Mustache,
		TeamModel = require('usercontrols/addgame/models/org_addteam'),
		$ = facade.$;

	var BaseView = views.BaseView,
		Backbone = facade.Backbone,
		_self;
	//Models

	return Backbone.View.extend({
		// template for dropdown
		template : layoutTemplate,
		// set to true if requires multiple selection
		/*Bind Events on controls present in current view template*/
		events : {
			"click li.add-team-to-org-h" : "addTeamToOrg",
			"click li.add-team-to-new-org-h" : "addTeamToNewOrg"
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			_self = this;

			console.log("ORG CHOOSE VIEW",options)
			_self.setOptions(options);
			_self.render();
		},

		addTeamToNewOrg:function(e){
			e.stopPropagation();
			e.preventDefault();

			if(this.parentView.addTeamToNewOrg && _.isFunction(this.parentView.addTeamToNewOrg)) {
				if(this.parentView.addTeamToNewOrg(e)){
					this.destroy_view();
				}
			}
		},
		addTeamToOrg:function(e){
			e.stopPropagation();
			e.preventDefault();
			$(e.currentTarget).off('click').addClass('region-loader');

			console.log(this.seasoninfo);

			var orgs_id = $(e.currentTarget).data('id'),
				self = this,
			teamModel = new TeamModel({
				orgs_id:orgs_id,
				complevels_id: this.seasoninfo.complevels_id,
				seasons_id: this.seasoninfo.seasons_id,
				year:this.seasoninfo.year,
				sports_id:this.seasoninfo.sports_id
			});

			teamModel.save();

			$.when(teamModel.request).done(function(res){
				if(self.parentView.setTeamTwoToNewTeam && _.isFunction(self.parentView.setTeamTwoToNewTeam)) {
					if(self.parentView.setTeamTwoToNewTeam(teamModel)){
						self.destroy_view();
					}
				}

			});
		},

		//render displays the view in browser
		render : function() {
		//	Backbone.View.prototype.render.call(this);
			var markup = _.template(this.template,{
				data:this.data,
				seasoninfo:this.seasoninfo,
				user_text:this.user_text
			});
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
