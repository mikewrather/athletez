// Games Schedule List
// --------------

define(['vendor','facade','views', 'utils', 'schedules/views/schedule-item','utils/storage',  'text!schedules/templates/schedule-list.html','chrome/views/header'], 
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
        
         addGame: function(e) {
         	var _self = this;
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
        
                    }
                }
                //$(".signup-email").trigger('click');
		    	return;
	    	}
	    	if(!_.isUndefined(this.teamRecords) && this.teamRecords) {
	    		routing.trigger('add-game',0,$("#team-h").val(),$("#sports-h").val(), function(data) {
	    			_self.collection.add(data);
	    			routing.trigger('popup-close');
	    		});
	    	} else {
	        	routing.trigger('add-game',0,$(e.currentTarget).data("team-id"),$(e.currentTarget).data("sport-id"), function(data) {
	    			_self.collection.add(data);
	    			routing.trigger('popup-close');
	    		});
        	}
        },
        
        // Add an Event
        addEvent: function(e) {
        	var _self = this;
        	if(!this.checkForUser()) {
		  		$(".signup-email").trigger('click');
		    	return;
	    	}
	    	if(!_.isUndefined(this.teamRecords) && this.teamRecords) {
	    		routing.trigger('add-event',0,$("#sports-h").val(), this.getUserId(), function(data) {
	    			_self.collection.add(data);
	    			routing.trigger('popup-close');						    			
	    		});
	    	} else {
	        	routing.trigger('add-event',0,$(".selected-sport-h").data("id"), this.getUserId(), function(data) {
	    			_self.collection.add(data);
	    			routing.trigger('popup-close');
	    		});
        	}
        },

        initialize: function(options) {
        	var _self = this;
        	_self.eventPage = options.eventPage || false;
        	_self.teamRecords = options.teamRecords;
        	if((!_.isUndefined(options.teamRecords) && options.teamRecords)) {
        		//var json = options.collection.toJSON();
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
            if (!_self.collection) {
                throw new Error("Schedulr expected options.collection.");
            }
		            
            _.bindAll(_self);          
            _self.addSubscribers();   
            


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
