// Team List
// --------------

define(['vendor', 'facade','views', 'utils', 'sportorg/views/game-item', 'text!sportorg/templates/team-item.html','sportorg/collections/games'],
function(vendor, facade,  views,   utils,  GameItemView, TeamItemViewTemplate, GamesCollection) {

    var TeamItemView, 
        TeamItemAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        Mustache = vendor.Mustache;
        SectionView = views.SectionView;

    TeamItemAbstract = CollectionView.extend(SectionView.prototype);

    TeamItemView = TeamItemAbstract.extend({

        __super__: CollectionView.prototype,

        //id: "team-list",
        name: "Team List",
        //tagName: "ul",

		events: {
			"click .add-game-h": "addGame"
		},
		
        // Tag for the child views
        _tagName: "li",
        _className: "team",
		template: TeamItemViewTemplate,
        // Store constructor for the child views
        _view: GameItemView,

		listView : ".team-list-h",
        initialize: function(options) {
	        console.log("TeamItemView",options);
	        if(options.team) this.team = options.team;
	        if(!options.collection){
		        options.collection = new GamesCollection({teams_id:options.team.id})
	        }
	        this.renderTemplate();
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamItemView expected options.collection.");
            }
            
            _.bindAll(this);
            this.addSubscribers();
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
        
        renderTemplate: function () {
        	var data = {};
        	data.data = this.collection.toJSON();
	        data.team = this.team.get('payload');
	        console.log("Schedule Data",data);
            var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
            return this;
        }  

    });

    return TeamItemView;
});
