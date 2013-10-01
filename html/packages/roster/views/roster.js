//Vote View
//Vote and follow up button functionality

define([ 'require', 'text!roster/templates/roster.html','views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'roster/models/roster', 'roster/collections/roster' , 'roster/views/image-list'], function(require, rosterTemplate) {
	var RosterView,
		views = require('views'),
		facade = require('facade'),
		utils = require('utils'),
		SectionView = views.SectionView,
		$ = facade.$,
		_ = facade._,
		debug = utils.debug,
		vendor = require('vendor'),
        Mustache = vendor.Mustache,
        Channel = utils.lib.Channel,
        model = require('roster/models/roster'),
        ImageList = require('roster/views/image-list'),
        collection = require('roster/collections/roster');
	
	RosterView = SectionView.extend({
		template: rosterTemplate,
		events: {
		},
		
		initialize : function(options) {
			var _self = this;
			SectionView.prototype.initialize.call(this, options);
			_self.team_id = options.team_id;
			_self.team_name = options.team_name;
			_self.viewName = options.viewName || ("Image List" + Math.random());
			_.bindAll(this);
			if(_self.team_id) {
				_self.collection1 = new collection();
				_self.collection1.id = _self.team_id;
				_self.collection1.fetch();
				$.when(_self.collection1.request).done(function () {
					_self.setupTeamRosterListView();
				});
			}
		},
		
		setupTeamRosterListView: function() {
			var teamRosterListView;
			teamRosterListView = new ImageList({
				collection: this.collection1,
				name: this.viewName,
				model: new model()
			});
			this.$el.find(".roster-images-h").html(teamRosterListView.$el);
		},
		
		render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
            this.$el.find(".heading-h").html(this.team_name);
        }
		
	});
	
	return RosterView;
});