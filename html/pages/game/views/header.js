// Header View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {GameHeaderView} constructor

define([
        'require', 
        'text!game/templates/header.html', 
        'facade', 
        'views',
        'game/models/score',
        'votes/models/vote',
        'votes/models/follow'
        ], 
function(require, gameHeaderTemplate) {

    var GameHeaderView,
        facade = require('facade'),
        views = require('views'),
        scoreModel = require('game/models/score'),
         voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow'),
        SectionView = views.SectionView;

	GameHeaderView = SectionView.extend({

        id: 'main-header',

        template: gameHeaderTemplate,
        
        events: {
        	'click .edit-score-h' : 'editScore',
        	'blur .edit-score-input-h': 'resumeEditScore',
        	"click .vote": "vote",
	        "click .follow": "follow",
	        "click .object-edit-h": "editObject",
	        "click .object-delete-h": "deleteObject",
        	//'keyup .edit-score-input-h': 'resumeEditScore'
        },
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
        editObject: function() {
        	alert("Coming soon");
        },
        
        deleteObject: function() {
        	alert("Coming soon");
        },
        
        
        afterRender: function() {
        	this.$el.find('.image-outer-h').mouseover(function() {
				$(this).find('.action-block').css({
					opacity : 90
				});
			});
			
        },
        
        vote: function(e) {
		    e.preventDefault();
		    console.log(this.model);
		    var voteModelOb = new voteModel();
			voteModelOb.userId = this.model.id;
			voteModelOb.entity_id = this.model.get("payload").enttypes_id;
			voteModelOb.setData();
			voteModelOb.save();
	    },

	    follow: function(e) {
		    e.preventDefault();
		    console.log(e.target);
		    var followModelOb = new followModel();
			followModelOb.userId = this.model.id;
			followModelOb.entity_id = this.model.get("payload").enttypes_id;
			followModelOb.save();
	    },
        
        editScore: function(e) {
        	//alert("sdsd");
        	$(e.currentTarget).hide();
        	$(e.currentTarget).parents(".score-box-h").find(".edit-score-input-h").attr("type", "text").focus();
        	//this.$el.find(".edit-score-input-h")
        },
        
        resumeEditScore: function(e) {
        	var score = new scoreModel();
        	score.set({'teams_id': $(e.target).data("id"), 'score': $(e.target).val()});
        	score.save();
			$.when(score.request).done(function() {
	        	this.$el.find(".edit-score-input-h").attr("type", "hidden");
   		     	this.$el.find('.edit-score-h').show();
			});
        }
        
                
    });

    return GameHeaderView;
});