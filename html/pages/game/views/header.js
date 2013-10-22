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
        'usercontrols/location/models/save',
		'chrome/views/header',
		'usercontrol/dropdown/view/dropdown',
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
	    DropDownList = require('usercontrol/dropdown/view/dropdown'),
        verifyAddress = require('usercontrols/location/models/verify-adress'),
		saveLocation = require('usercontrols/location/models/save'),
		header = require('chrome/views/header'),
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
		messages : {
			dataNotExist : "Data does not exist . ",
			selectDateAndTime : "Please select date and time",
			selectTeam : "Please select team",
			selectScore : "Please enter score",
			selectLocation : "Please select location",
			selectLocationType : "Please select location type",
			gameFound : "Sweet ! This Event Already Exists ! ",
			enterEventName : "Please enter event name",
			selectSport : "Please select sport",
			selectValidTime : "Please enter valid time in format hh:mm (12 hours)"
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

	        this.setDateFields();
        },

		setDateFields: function(){
			var payload = this.model.get('payload');
			var game_time = payload.game_time;
			console.log(game_time);
			if(game_time != undefined)
			{
				try{
					var timeArr = game_time.split(' ');
					console.log(timeArr);
					if(timeArr.length){
						payload.game_hour = timeArr[0];
						payload.game_ampm = timeArr[1];
						console.log("full payload now",payload);
						this.model.set('payload',payload);
					}
				}catch(ex){}
			}
		},

		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},
        openEditPopup: function() {
	        if(!this.checkForUser()) {
		        this.signup = new header();
			    try{
		  			
		  			this.signup.signupUser();
		  			//$(".signup-email").trigger('click');
		    		}
		    	catch(e){
		    		try{
						console.log(e);
					}
					catch(e){
						console={},
						console.log=function(e){}
		
					}
		    	}
				//$(".signup-email").trigger('click');
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

		tags : {
			rgxTime : /^(0?[1-9]|1[012])(:[0-5]\d)$/,
			rgxTimeWhole : /^(0?[1-9]|1[012])$/
		},

		formatDate: function(date,time,ampm)
		{
			var newDate = $.datepicker.formatDate('yy-mm-dd',date);
			try{
				var array = time.split(':');

				console.log(array);
				if(array.length==1) time += ":00";
				time += " " + ampm;

				newDate += " " + time;
				return newDate;

			}catch(ex){
				return false;
			}
		},

        updateDateTime: function(e) {
        	e.preventDefault();

	        var isDataValid = true,
		        self=this,
	            date = $(this.el).find('.txt-game-date_h').datepicker('getDate'),
		        timeText = $(this.el).find('.txtTime').val(),
	            ampm = $(this.el).find('#hdn_time-period_h').val();

	        var isDataValid=true;
	        if (!date || !timeText) {
		        $(self.destination).find(".section-game-date_h").find('.field-message_h').html("Please Se").fadeIn();
		        isDataValid = false;
	        }else{
		        var validTime = timeText.match(self.tags.rgxTime) || timeText.match(self.tags.rgxTimeWhole);
		        console.log("orginal date",date);
		        console.log("orginal time",timeText);
		        console.log("ampm",ampm);
		        if(!validTime){
			        console.log("NOT VALID");
			        $(self.el).find(".section-game-date_h").find('.field-message_h').html(self.messages.selectValidTime).fadeIn();
			        isDataValid = false;
		        }else{
			        $(self.el).find(".section-game-date_h").find('.field-message_h').html('').fadeOut();
			        date = this.formatDate(date,timeText,ampm);
			        if(!date) isDataValid = false;
		        }
	        }
	        console.log("new date",date);

        	var _self = this, model = new saveLocation();
			model.id = this.model.id;
			model.set({'game_datetime': date, 'locations_id': this.locationId, id: this.model.id});
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
		        _self.setDateFields();
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
	        $(this.el).find('.txt-game-date_h').datepicker({
		        dateFormat: 'yy-mm-dd',
		        changeMonth : true,
		        changeYear : true
	        });


	        var records = [{
		        payload : {
			        name : "AM",
			        value : "AM"
		        }
	        },
		        {
			        payload : {
				        name : "PM",
				        value : "PM"
			        }
		        }];

	        var data = {};
	        data.records = records;
	        data.recordId = 'name';
	        data.recordValue = 'value';
			var self = this;

	        var DropDown = new DropDownList({
		        data: data,
		        elementId: "hdn_time-period_h",
		        destination: ".spn-ddl-time-period_h",
		        targetView: self,
		        selectedValue : this.model.get('payload').game_ampm,
		        callback: function(result) {
		        }
	        });
		}
    });

    return GameHeaderView;
});