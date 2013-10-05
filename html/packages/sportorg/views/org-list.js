// Org List
// --------------

define(['facade','views', 'utils', 'sportorg/views/org-item','utils/storage'], 
function(facade,  views,   utils,   OrgItemView, Store) {

    var OrgListView, 
        OrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    OrgListAbstract = CollectionView.extend(SectionView.prototype);

    OrgListView = OrgListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "org-list",
        name: "Org List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "org",

        // Store constructor for the child views
        _view: OrgItemView,
        
        events: {
        	'click .team-info-h': 'showinfo',
        	"click .add-game-h": "addGame"
        },
        
         showinfo: function(e) {
        	e.preventDefault();
        	if(!$(e.target).parents('.org-popup').length) {
	        	
	        	if($(e.target).find('.org-popup').hasClass('hide')) {
		        	$('.org-popup').addClass('hide');
		        	$(e.target).find('.org-popup').removeClass('hide');
		        } else {
		        	$('.org-popup').addClass('hide');
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
		  		$("#userlogin").trigger('click');
		    	return;
	    	}
	        	routing.trigger('add-game',0,$(e.currentTarget).data("team-id"),$(e.currentTarget).data("sport-id"));
        },

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("OrgListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }        

    });

    return OrgListView;
});
