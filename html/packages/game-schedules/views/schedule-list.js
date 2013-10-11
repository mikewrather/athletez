// Games Schedule List
// --------------

define(['vendor','facade','views', 'utils', 'schedules/views/schedule-item','utils/storage',  'text!schedules/templates/schedule-list.html'], 
function(vendor, facade,  views,   utils,   ScheduleItemView, Store, ScheduleListTemplate) {

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
        
         addGame: function(e) {
         	 if(!this.checkForUser()) {
		  		$(".signup-email").trigger('click');
		    	return;
	    	}
	        routing.trigger('add-game',0,$(e.currentTarget).data("team-id"),$(e.currentTarget).data("sport-id"));
        },

        initialize: function(options) {
        	if(!_.isUndefined(options.teamRecords) && options.teamRecords) {
        		var json = options.collection.toJSON();
        		if(json && !_.isUndefined(json[0]) && !_.isUndefined(json[0].payload) && !_.isUndefined(json[0].payload.teams) && json[0].payload.teams.length) {
        			this.renderTemplate();
        			this.singleView = true;
        			this.listView = ".schedule-list-h";
        		}
        	}
        	
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("Schedulr expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        },
        
        renderTemplate: function () {
        	var data = {};
        	data.data = this.collection.toJSON();
	        console.log("Schedule Data",data.data);
            var markup = Mustache.to_html(ScheduleListTemplate, data);
            this.$el.html(markup);
            return this;
        }   

    });

    return OrgListView;
});
