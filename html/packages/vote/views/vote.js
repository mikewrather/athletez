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
			'click .team-action-h': 'vote',
			'click .follow-action-h': 'follow'
		},
		
		vote: function() {
			this.voteModelOb.save();
		},
		
		follow: function() {
			this.followModelOb.save();
		},
		
		initialize : function(options) {
			var _self = this;
			
			console.log(options);
			
			_.bindAll(this);
			SectionView.prototype.initialize.call(this, options);
			var payload = this.model.get('payload');
			console.log(payload);
			this.voteModelOb = new voteModel();
			this.voteModelOb.id = options.userId;
			this.voteModelOb.entity_id = payload.enttypes_id;
			
			this.followModelOb = new followModel();
			this.followModelOb.id = options.userId;
			this.followModelOb.entity_id = payload.enttypes_id;
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
        }
		
	});
	
	return VoteView;
});