// Team List
// --------------

define(['vendor', 'facade','views', 'utils', 'sportorg/views/team-item', 'text!sportorg/templates/team-list.html','utils/storage'], 
function(vendor, facade,  views,   utils,   TeamItemView, TeamListViewTemplate, Store) {

    var TeamListView, 
        TeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        Mustache = vendor.Mustache;
        SectionView = views.SectionView;

    TeamListAbstract = CollectionView.extend(SectionView.prototype);

    TeamListView = TeamListAbstract.extend({

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
		template: TeamListViewTemplate,
        // Store constructor for the child views
        _view: TeamItemView,
		listView : ".team-list-h",
        initialize: function(options) {
	        this.renderTemplate();
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamListView expected options.collection.");
            }
            
            _.bindAll(this);
            this.addSubscribers();
        },
        
        addGame: function() {
        	var appStates = new Store("user","localStorage");
        	console.log(appStates.data);
        	var user = 0;
        	if(appStates.data) {
 	  	     	for(var userId in appStates.data) {
 	  	     		user = userId;
 	  	     		break;		
 	  	     	}
        	}
        	if(user)	
	        	routing.trigger('add-game', user);
        },
        
        renderTemplate: function () {
        	var data = {};
        	data.data = this.collection.toJSON();
	        console.log("Schedule Data",data.data);
            var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
            return this;
        }  

    });

    return TeamListView;
});
