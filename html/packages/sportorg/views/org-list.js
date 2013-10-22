// Org List
// --------------

define(['facade','views', 'utils', 'sportorg/views/org-item','utils/storage','chrome/views/header'], 
function(facade,  views,   utils,   OrgItemView, Store,header) {
 
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
        	"click .add-game-h": "addGame",
        	'mouseover .team-info-h': 'showinfo',
	        'mouseout .team-info-h': 'showinfo'
        },
        
         showinfo: function(e) {
        	e.preventDefault();
        	if(!$(e.target).parents('.game-info').length) {
	        	
	        	if($(e.target).find('.game-info').hasClass('hide')) {
		        //	$('.game-info').addClass('hide');
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
