// Games Schedule List
// --------------

define(['vendor','facade','views', 'utils', 'schedules/views/schedule-item','utils/storage',  'text!schedules/templates/schedule-list.html','chrome/views/header', 'common/models/add'], 
function(vendor, facade,  views,   utils,   ScheduleItemView, Store, ScheduleListTemplate,header, UserGames) {

    var OrgListView, 
        OrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
         Mustache = vendor.Mustache,
         
        SectionView = views.SectionView;

    OrgListAbstract = CollectionView.extend(SectionView.prototype);

    OrgListView = OrgListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "schedule-list",
        name: "schedule List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "org",
        // Store constructor for the child views
        _view: ScheduleItemView,
        
       // listView : ".schedule-list-h",
        
        events: {
        	"click .add-game-h": "addGame",
        	"click .add-event-h": "addEvent",
        	'mouseover .team-info-h': 'showinfo',
	        'mouseout .team-info-h': 'showinfo'
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
         	 if(!this.checkForUser()) {
		  		 routing.trigger('showSignup');
		    	return;
	    	}
	    	
	    	if(!_.isUndefined(this.teamRecords) && this.teamRecords) {
	    		routing.trigger('add-game',0,$("#team-h").val(),$("#sports-h").val(), _self.controller.id, function(data) {
	    			_self.addRecordToCollection(data);
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
	        console.log("OPTIONS",options);
        	_self.eventPage = options.eventPage || false;
        	_self.teamRecords = options.teamRecords;
        	_self.controller = options.controller || false;
        	if((!_.isUndefined(options.teamRecords) && options.teamRecords)) {
        		//var json = options.collection.toJSON();
		        console.log("Team Records",options.teamRecords,options);
        		_self.renderTemplate();
        		_self.listView = ".schedule-list-h";
        		_self.singleView = true;
        	}

        	if(!_.isUndefined(options.eventPage) && options.eventPage) {
        		//var json = options.collection.toJSON();
        		_self.renderTemplate(_self.eventPage);
        		_self.listView = ".schedule-list-h";
        		_self.eventView = true;
        	}
        	
            CollectionView.prototype.initialize.call(_self, options);
            if(!_self.collection) {
                throw new Error("Schedule expected options.collection.");
            }
		            
            _.bindAll(_self);
            _self.addSubscribers();
            console.error(_self.collection);
			

        },

	    afterRender: function() {
		 //   $(this.el).attr('data-team-id',this.teams_id);
	    },
        
        renderTemplate: function (eventPage) {
            var markup = Mustache.to_html(ScheduleListTemplate, {data: this.collection.length, eventPage: eventPage});
            console.error(markup);
            this.$el.html(markup);
            return this;
        }   

    });

    return OrgListView;
});
