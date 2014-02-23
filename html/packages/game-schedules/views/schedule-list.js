// Games Schedule List
// --------------

define(['vendor','facade','views', 'utils', 'schedules/views/schedule-item','utils/storage',
	'text!schedules/templates/schedule-list.html','chrome/views/header', 'common/models/add',
	'sportorg/models/uslgamelink',
	"vendor/plugins/qtip/qtip", 'common/views/add-description'],
function(vendor, facade,  views,   utils,   ScheduleItemView, Store, ScheduleListTemplate,header, UserGames,UslGameLink) {

    var OrgListView, 
        OrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        AddDescription = require('common/views/add-description'),
         Mustache = vendor.Mustache,
         
        SectionView = views.SectionView;

    OrgListAbstract = CollectionView.extend(SectionView.prototype);

    OrgListView = OrgListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "schedule-list",
        name: "schedule List",
        tagName: "ul",
		currentSection: "games",
        // Tag for the child views
        _tagName: "li",
        _className: "org",
        // Store constructor for the child views
        _view: ScheduleItemView,


       // listView : ".schedule-list-h",
        
        events: {
        	"click .add-game-h": "addGame",
        	"click .add-event-h": "addEvent"
    //    	'mouseover .team-info-h': 'showinfo',
	//        'mouseout .team-info-h': 'showinfo'
        },
        
         showinfo: function(e) {
        	e.preventDefault();
        	if(!$(e.target).parents('.game-info').length) {
	        	if($(e.target).find('.game-info').hasClass('hide')) {
		        	$(e.target).find('.game-info').removeClass('hide');
		        } else {
		        	$('.game-info').addClass('hide');
		        }
        	}
        },
        
        checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
			
		getUserId: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn) return routing.loggedInUserId;
		},
		
		addRecordToCollection: function(data) {
			var newAddModel = new addModel();
			newAddModel.processItemFromPayload(participants.toJSON());
			_self.$el.find(".add-to-event").hide();
   			_self.collection.add(newAddModel);
		},
        
        addGame: function(e) {
         	var _self = this;
         	 if(!_self.checkForUser()) {
		  		routing.trigger('showSignup', function() {
		    		_self.openAddGamePopup(e);		  			
		  		});
	    	} else {
	    		_self.openAddGamePopup(e);
	    	}
        },
        
        openAddGamePopup: function(e) {
         	var _self = this;
        	if(!_.isUndefined(this.teamRecords) && this.teamRecords) {
	    		routing.trigger('add-game',0,$("#team-h").val(),$("#sports-h").val(), _self.controller.id, function(data) {
	    			if(_self.controller) _self.controller.getOrgData();
	    			//_self.addRecordToCollection(data);
	    			routing.trigger('common-popup-close');
	    		});
	    	} else {
	    		var sport_id = $(".selected-sport-h").data("id") || $("#sports-h").val();
	        	routing.trigger('add-game',0,$(e.currentTarget).data("team-id"),sport_id, _self.controller.id, function(data) {
	    			if(_self.controller) _self.controller.getOrgData();
	    			routing.trigger('common-popup-close');
	    			
	    		});
        	}
        },
        
        // Add an Event
        addEvent: function(e) {
        	var _self = this;
        	if(!this.checkForUser()) {
		  		$("#userlogin").trigger('click');
		    	return;
	    	}
	    	if(!_.isUndefined(this.teamRecords) && this.teamRecords) {
	    		routing.trigger('add-event',0,$("#sports-h").val(), _self.controller.id, function(data) {
	    			if(_self.controller) _self.controller.getOrgData();
	    			routing.trigger('popup-close');						    			
	    		});
	    	} else {
			    console.log($(".selected-sport-h").data("id"));
	        	routing.trigger('add-event',0,$(".selected-sport-h").data("id"), _self.controller.id, function(data) {
	    			if(_self.controller) _self.controller.getOrgData();
	    			routing.trigger('popup-close');
	    		});
        	}
        },

        initialize: function(options) {
        	var _self = this;

	        Channel('load:css').publish(["vendor/plugins/qtip/qtip.css"]);

        	_self.eventPage = options.eventPage || false;
        	_self.teamRecords = options.teamRecords;
        	_self.controller = options.controller || false;
        	if((!_.isUndefined(options.teamRecords) && options.teamRecords)) {
        		_self.renderTemplate();
        		_self.listView = ".schedule-list-h";
        		_self.singleView = true;
        	}

        	if(!_.isUndefined(options.eventPage) && options.eventPage) {
        		_self.renderTemplate(_self.eventPage);
        		_self.listView = ".schedule-list-h";
        		_self.eventView = true;
        	}
        	
            CollectionView.prototype.initialize.call(_self, options);
            if(!_self.collection) {
                throw new Error("Schedule expected options.collection.");
            }
            
            
            console.error(this.collection.toJSON());
            
            var len = this.collection.length;
             // show empty box
	        if(!len) {
	        	
	        	new AddDescription({
	        		page: this.currentSection,
	        		target: this.$el
	        	});
	        }
		            
            _.bindAll(_self);
            _self.addSubscribers();
			

        },

	    afterRender: function() {
		    var _self = this;
		    this.$el.find("a.team-info-h").each(function(){
			    var $self = $(this);
			    $(this).qtip({
				    content: $self.find('div.game-info').html(),
				    position: {
					    my: "bottom center",
					    at: "top center",
					    viewport : $(window)
				    },
				    style: {
					    classes: "tipsy game-info",
					    width: '360px'
				    },
				    hide : {
						fixed:true,
					    delay:1000
				    },
				    events : {
					    render: function(event,api) {
						    $(api.elements.tooltip).find('.add-score').on('click',_self.addScore);
					    }
				    }
			    });
		    });
	    },
	    addScore: function(e){
		    e.stopPropagation();
		    var uslgamelink_id = $(e.target).data('uslgamelink');
		    $(e.target)
			    .off('click',this.addScore)
			    .html(
				    '<input type="text" placeholder="00:00:00" data-uslgamelink="'+ uslgamelink_id +'" style="width:100px; margin:0px;" id="usl_result_time_' + uslgamelink_id + '" />' +
				    '<span id="save_result_time' + uslgamelink_id + '" style="margin-left:8px;">save</span>')
			    .find('#save_result_time' + uslgamelink_id).on('click',this.updateGameLink);
	    },

	    updateGameLink: function(e)
		{
			var $inputel = $(e.target).prev(),
				uslGameLink = new UslGameLink({
					id:$inputel.data('uslgamelink'),
					result_time:$inputel.val()
				});
			uslGameLink.save();
			$.when(uslGameLink.request).done(function(res){
				console.log(res);
				$inputel.parent().html(res.payload.result_time);
			});
		},
        
        renderTemplate: function (eventPage) {
            var markup = Mustache.to_html(ScheduleListTemplate, {data: this.collection.length, eventPage: eventPage});
            this.$el.html(markup);
            return this;
        }   


    });

    return OrgListView;
});
