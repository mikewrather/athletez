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
        'usercontrols/location/views/location',
        'usercontrols/location/models/verify-adress',
        'usercontrols/location/models/save'
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
        verifyAddress = require('usercontrols/location/models/verify-adress'),
		saveLocation = require('usercontrols/location/models/save'),
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
	        "submit .update-date-time-h": "updateDateTime",
	        "click .game-edit-btn-h": "openEditPopup",
	        'click .verify-address-h': 'verifyAddress',
	        'blur .address-h': 'verifyAddress'
        },
        
        location: {lat: undefined, lon: undefined},
        
        initialize: function (options) {
          SectionView.prototype.initialize.call(this, options); 
        	var payload = this.model.get("payload"), title;
        	if(payload.teams.length) {
		        try{
			        title = payload.teams[0].org_name +" VS "+ payload.teams[1].org_name;
			        title +=  " "+payload.shared.complevel;
		        }catch(e){
			        title = "Game Page";
		        }


        	} else {
        		title = payload.event_name;
        	}
        	title += " | "+ payload.shared.sport +" | "+ payload.game_day;
        	document.title = title;        	
        },
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},
        openEditPopup: function() {
	        if(!this.checkForUser()) {
		        $(".signup-email").trigger('click');
		        return;
	        }
			$('#modalPopupGameEdit').modal();
			this.location.lon = this.model.get("payload").location.lon;
			this.location.lat = this.model.get("payload").location.lat;
        	this.showLocation();
        },
        
        
        showLocation: function() {
        	routing.trigger('show_location', this.location.lat, this.location.lon, '.view-map-h', function() {
        		//_self.updateHeaderData(_self.model.id);
        	});
        },
        
        setLocation: function(e) {
			var r = confirm("Are you sure want to set new address?");
			if(r) {
				if(this.locationId) {
					var model = new saveLocation();
					model.id = this.game_id;
					model.set({locations_id: this.locationId, id: this.game_id});
					model.save();
					$.when(model.request).done(function(){		
						routing.trigger("popup-close");
					});
				}
			}
		},
        
        verifyAddress: function() {
			var _self = this, address = _self.$el.find('.address-h').val();
			_self.adressModel = new verifyAddress();
			_self.adressModel.address = address;
			_self.adressModel.url();
			_self.adressModel.set({address: address});
			_self.adressModel.showError = function(model, error) {
				try {
					_self.$el.find('.set-address-h').addClass('link-disabled');
					_self.$el.find('.address-error-status-h').removeClass('hide').html(error.responseJSON.exec_data.error_array[0].error);
				} catch(e) {}
				_self.$el.find('.address-h').addClass('address-field-error').removeClass('address-verified');
			};
			_self.adressModel.save({dataType:"json"});
			_self.$el.find('.address-h').removeClass('address-verified');
			$.when(_self.adressModel.request).done(function() {
				console.log(_self.adressModel.toJSON());
				_self.locationId = _self.adressModel.get("payload").id;
				if(_self.locationId) {
					_self.$el.find('.address-error-status-h').addClass('hide');
					_self.$el.find('.address-h').removeClass('address-field-error').addClass('address-verified');
					_self.location.lon = _self.adressModel.get("payload").lon;
					_self.location.lat = _self.adressModel.get("payload").lat;
					_self.showLocation();
					_self.$el.find('.set-address-h').removeClass('link-disabled');
				}
			});
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
        	e.preventDefault();
        	var _self = this, val = this.$el.find('.date-time-h').val(), model = new saveLocation();
			model.id = this.model.id;
			model.set({'game_datetime': val, 'locations_id': this.locationId, id: this.model.id});
			model.save();
    	
        	$.when(model.request).done(function() {
        		_self.updateHeaderData(model.id);
        	});
        },
        
        // update header data
        updateHeaderData: function(id) {
        	var _self = this;
        	_self.model.id = id;
        	_self.model.fetch();
        	$.when(_self.model.request).done(function() {
        		console.error(_self.model.toJSON());
        		$('#modalPopupGameEdit').modal('hide');
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
        	score.set({'id': $(e.target).data("id"), 'games_teams_link_id': $(e.target).data("id"), 'score': $(e.target).val()});
        	score.save();
        	this.$el.find(".edit-score-input-h").attr("type", "hidden");
   		    this.$el.find('.edit-score-h').show();
			$.when(score.request).done(function() {
	        	$(e.currentTarget).parents('.score-box-h').find(".edit-score-h span").html(score.get("score"));
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