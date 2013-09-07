//Vote View
//Vote and follow up button functionality

define([ 'require', 'text!votes/templates/vote.html','views', 'vendor', 'facade', 'utils', 'jqueryui', 'controller', 'votes/models/vote', 'votes/models/follow'], function(require, voteTemplate) {
	var VoteView,
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
        voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow')
	
	VoteView = SectionView.extend({
		template: voteTemplate,
		events: {
			'click .team-action-h': 'voteClick',
			'click .follow-action-h': 'followClick'
		},
		
		vote: function() {
			//this.voteModel.save();
			alert("vote click ");
		},
		
		follow: function() {
			//this.followModel.save();
			alert(this.id);
		},
		
		
		initialize : function(options) {
			var _self = this;
			var payload = this.model.get('payload');
			SectionView.prototype.initialize.call(this, options);
			this.voteModel = new voteModel({id: this.id, entity_id: payload.enttypes_id});
			this.followModel = new followModel({id: this.id, entity_id: payload.enttypes_id});
			// $(document).off('click', '.team-action-h');
			// $(document).off('click', '.follow-action-h');
			// $(document).on('click', '.team-action-h', function() {
				// _self.vote();
			// });
// 			
			// $(document).on('click', '.follow-action-h', function() {
				// _self.follow();
			// });		},
		
		render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        	//this.initVoteView();  
        }
		
	});
	
	return VoteView;
});