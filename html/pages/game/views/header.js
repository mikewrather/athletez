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
        'game/models/basics',
        'votes/models/vote',
        'votes/models/follow',
        'usercontrols/location/views/location'
        ], 
function(require, gameHeaderTemplate) {

    var GameHeaderView,
        facade = require('facade'),
        views = require('views'),
        scoreModel = require('game/models/score'),
        basicModel = require('game/models/basics'),
        voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow'),
        LocationView = require('usercontrols/location/views/location'),
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
	        "click .game-edit-btn-h" : "gameEditBtn",
	        "submit .update-date-time-h": "updateDateTime",
	        "click .cancel-time-edit-h" : "cancelDateTimeBtn",
	        "click .address-info-h": "openLocationPopup"
        	//'keyup .edit-score-input-h': 'resumeEditScore'
        },
        
        initialize: function (options) {
          SectionView.prototype.initialize.call(this, options);           
        },
        
        openLocationPopup: function() {
        	console.log(this.model);
        	var location = { latitude : this.model.get("payload").location.lat, longitude : this.model.get("payload").location.lon}; 
        	routing.trigger('location_popup_open', LocationView, location);
        },
        
        editObject: function() {
        	alert("Coming soon");
        },
        
        deleteObject: function() {
        	alert("Coming soon");
        },
        
        gameEditBtn: function() {
        	this.$el.find('.update-date-time-h').removeClass('hide');
        },
        
        updateDateTime: function(e) {
        	console.log(this.model);
        	e.preventDefault();
        	this.$el.find('.update-date-time-h').addClass('hide');
        	var _self = this, val = this.$el.find('.date-time-h').val(), basic = new basicModel();
        	basic.id = this.model.id;
        	basic.set({'game_datetime': val, 'id1': basic.id});
        	basic.save();
        	$.when(basic.request).done(function() {
        		_self.updateHeaderData(basic.id);
        	});
        },
        
        // update header data
        updateHeaderData: function(id) {
        	var _self = this;
        	_self.model.id = id;
        	_self.model.fetch();
        	$.when(_self.model.request).done(function() {
        		_self.render();
        	});
        },
        
        cancelDateTimeBtn: function() {
        	this.$el.find('.update-date-time-h').addClass('hide');
        },
        
        
        afterRender: function() {
        	
        	this.$el.find('.image-outer-h').mouseover(function() {
				$(this).find('.action-block').css({
					opacity : 90
				});
			}).mouseout(function() {
				$(this).find('.action-block').css({
					opacity : 0
				});
			});
			
			this.$el.find(".date-time-h").datetimepicker({
				timeFormat : 'hh:mm:ss',
				dateFormat : 'yy-mm-dd',
				showTimezone : true,
				changeMonth : true,
				changeYear : true
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
        	score.teams_id = $(e.currentTarget).data("id");
        	score.score = $(e.target).val();
        	score.gameId = this.model.id;
        	score.set({'id': $(e.target).data("id"), 'teams_id': $(e.target).data("id"), 'score': $(e.target).val()});
        	score.save();
        	this.$el.find(".edit-score-input-h").attr("type", "hidden");
   		    this.$el.find('.edit-score-h').show();
			$.when(score.request).done(function() {
	        	
			});
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        },
    });

    return GameHeaderView;
});