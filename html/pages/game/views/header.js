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
		"media/views/image-item",
		"component/form",
		"vendor/plugins/dateformat"
        ], 
function(require, gameHeaderTemplate) {

    var GameHeaderView,
        facade = require('facade'),
        views = require('views'),
        scoreModel = require('game/models/score'),
        basicModel = require('game/models/basics'),
        voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow'),
        ImageItem = require("media/views/image-item"),
        LocationView = require('usercontrols/location/views/location'),
	    DropDownList = require('usercontrol/dropdown/view/dropdown'),
        verifyAddress = require('usercontrols/location/models/verify-adress'),
		saveLocation = require('usercontrols/location/models/save'),
	    FormComponent = require('component/forms'),
	    dateFormat = require('vendor/plugins/dateformat'),
		SectionView = views.SectionView;



	GameHeaderView = SectionView.extend({
        id: 'main-header',
        template: gameHeaderTemplate,
        events: {
        	'click .edit-score-h' : 'editScore',
        	'blur .edit-score-input-h': 'resumeEditScore',
        	'keyup .edit-score-input-h': 'adjustFont',        	
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
	        if(payload.teams){
		        if(payload.teams.length) {
			        try{
				        title = payload.teams[0].org_name +" VS "+ payload.teams[1].org_name;
				        title +=  " "+payload.shared.complevel;
			        }catch(e){
				        title = "Game Page";
			        }
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
			if(game_time != undefined) {
				try {
					var timeArr = game_time.split(' ');
					console.log(timeArr);
					if(timeArr.length){
						payload.game_hour = timeArr[0];
						payload.game_ampm = timeArr[1];
						console.log("full payload now",payload);
						this.model.set('payload',payload);
					}
				} catch(ex) { }
			}
		},
		
		// adjust font dynamically
		adjustFont: function(e) {
			var defaultFont = 2.2, l = $(e.target).val().length - 2, font = (l > 0)? (defaultFont - (.5 * l)):defaultFont -0;
			if(font > 0)			
				$(e.target).parents(".team-item").find(".game-score-el").css({"font-size": font+"em"});
		},

		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},
		
        openEditPopup: function() {
	        if(!this.checkForUser()) {
		        routing.trigger('showSignup');
		        return;
	        }
	        var options = {
		        height : "500px",
		        width : "500px",
		        html : '<div id="editGameForm"></div>',
		        title : "Edit Game Info"
	        };
	        routing.trigger('common-popup-open', options);
	        this.drawEditGameForm();
		//	$('#modalPopupGameEdit').modal();
		//	this.location.lon = this.model.get("payload").location.lon;
		//	this.location.lat = this.model.get("payload").location.lat;
        //	this.showLocation();
        },

		drawEditGameForm: function(){

			var _self = this,
				dateStr = _self.model.get("payload").time_as_int,
				gDate = new Date(dateStr);

			console.log(dateStr,gDate);

			var formData = new FormComponent({
					'date' : {
						form_values: {
							defaultValue : dateFormat(gDate,"mmm d, yy"),
							post_to_server	: false,
							serverKey : "game_date",
							serverDbField: 'gameDay',
							objectValuesToUpdate: ["game_datetime"],
							getValue: function() {
								return this.$el.val();
							}
						},
						fieldClass: "date-picker-field",
						type : 'Text',
						attr : {
							'placeholder' : 'Enter Date',
							'class' : "txt-game-date_h txtDate"
						},

						showLable : true,
						label: "Date and Time",
						//validators : [{type : 'required',
						//	message : 'Please select date.'}],
						bindDatePicker : true
					},
					'time' : {
						form_values: {
							defaultValue : dateFormat(gDate,"h:MM"),
							post_to_server	: false,
							serverDbField: 'gameTime',
							serverKey: "game_time",
							objectValuesToUpdate: ["game_datetime"]
						},

						type : 'Text',
						fieldClass: "time-picker-field",
						attr : {
							'placeholder' : 'Time',
							'class' : "txt-game-time_h hasDatepicker txtTime"
						},

						showLable : true,
						label: "&nbsp;",
						validators : [{
							type : 'required',
							message : 'Please enter a time'
						}, /^(0?[1-9]|1[012])(:[0-5]\d)?$/]
					},

					'Day_light' : {
						type : 'DropDown',
						fieldClass: "ampm-field",
						form_values : {
							post_to_server	: false,
							serverKey : "game_ampm",
							objectValuesToUpdate: ["game_datetime"],
							data : {
								records : [{
									payload : {
										name : "AM",
										value : "AM"
									}
								}, {
									payload : {
										name : "PM",
										value : "PM"
									}
								}],
								recordId : 'name',
								recordValue : 'value',
								selectedValue : dateFormat(gDate,"TT")
							},
							elementId : "hidden_time_value",
							callback : function(result) {
							}
						},
						showLable : true,
						label: "&nbsp;"
					},

					'game_datetime'	: {
						type: "Hidden",
						form_values : {
							serverDbField: 'game_datetime',
							valueBindings : ['date','time','Day_light'],
							serverKey: "game_datetime",
							post_to_server	: true
						}
					},

					'eventname' : {
						form_values: {
							defaultValue : _self.model.get("payload").event_name,
							post_to_server	: true,
							serverDbField: 'event_name',
							serverKey: "event_name"
						},

						type : 'Text',
						fieldClass: "",
						attr : {
							'placeholder' : 'Event Name',
							'class' : "txt-event-name"
						},

						showLable : true,
						label: "Event Name"

					},
					'Location' : {
						form_values: {
							defaultValue : _self.model.get("payload").location.full_address,
							serverKey : "locations_id",
							post_to_server	: true,
							serverDbField: 'locations_id'
						},
						longitude: _self.model.get("payload").location.lon,
						latitude : _self.model.get("payload").location.lat,
						locationId : _self.model.get("payload").location.id,
						type : 'Location',
						label: "Location",
						validators : [{type : 'required',
							message : 'Please select location and click the "Verify Address" button'}]
					},
					'users_id'	: {
						form_values: {
							serverKey: _self.users_id,
							post_to_server	: true,
							value: _self.user_id
						},
						type: "Hidden",
					},
					'submit' : {
						type : 'Submit',
						fieldClass: "button-field",
						attr : {
							'value' : 'Save Changes'
						},
						showLable : false,
						onSubmit : function(e) {
							var errors = form.commit();
							if (errors) {
								// auto scroll to focus element which has error
								for (var i in errors) {
									var $ob = $("*[name=" + i + "]"), $pos = $ob.position();
									$ob.parents(".common-modal #modalBody").animate({
										scrollTop : $pos.top
									}, '500', function() {
										$ob.addClass('focus-error-animation');
										setTimeout(function() {
											$ob.removeClass('focus-error-animation');
										}, 2000);
									});
									break;
								}
							} else {
								if(_self.formValues) {
									var formData = _self.formValues.getFormValues();
								} else {
									var formData = form.getValue();
								}

								var formData = _self.formValues.getFormValues(), self = _self;

								_self.model.set({
									game_datetime : formData.game_datetime,
									locations_id : formData['locations_id'],
									event_name : formData.event_name
								});

								console.log(self.model);
								self.model.save({});

								//window.formValues1.showServersErrors([{ key: "gameDay", message: "error_message" }]);
								$.when(self.model.request).done(function(res){
									_self.updateHeaderData(self.model.id);
									routing.trigger('common-popup-close');
								});

								$.when(self.model.request).fail(function(res) {
									var response = JSON.parse(res.responseText);
									var errorArray = response.exec_data.error_array;
									_self.formValues.showServersErrors(errorArray);
								});
							}
						}
					},
					'button' : {
						type : 'Button',
						fieldClass: "button-field",
						attr : {
							'value' : 'Cancel',
							'class' : 'cancel-btn'
						},
						onClick : function() {
							routing.trigger('common-popup-close');
						},
						showLable : false
					},
			}, $('#editGameForm'));

			var form = formData.form;
			this.formValues = formData.formValues;

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
        	   	        this.$el.find(".edit-score-input-h").trigger("keyup"); 
        	   	        
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
        	if(!this.checkForUser()) {
		  		
		  	   	routing.trigger('showSignup');	
		    	return;
	    	}
        	$(e.currentTarget).hide();
        	$(e.currentTarget).parents(".score-box-h").find(".edit-score-input-h").attr("type", "text").focus();
        	//this.$el.find(".edit-score-input-h")
        },
        
        checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
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
	        
	         // render image for image item view
            this.renderImage();
	        
		},
		
		  renderImage: function() {
        	this.headerImage = new ImageItem({
        		model: this.model
        	});
        	
        	this.headerImage.render();
        	this.$el.find(".image-outer-h").html(this.headerImage.$el);
        },
    });

    return GameHeaderView;
});