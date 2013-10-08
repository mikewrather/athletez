// Team List
// --------------

define(['vendor', 'facade','views', 'utils', 'sportorg/views/team-item','sportorg/collections/games'],
function(vendor, facade,  views,   utils,  TeamItemView,GamesCollection) {

    var TeamListView, 
        TeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        Mustache = vendor.Mustache;
        SectionView = views.SectionView;

    TeamListAbstract = CollectionView.extend(SectionView.prototype);

    TeamListView = SectionView.extend({

        __super__: CollectionView.prototype,

        //id: "team-list",
        name: "Team List",
        //tagName: "ul",

        initialize: function(options) {

	        console.log("TeamListView",options);
	        this.collection =
	        this.createChildViews()
            console.log(this.collection);
            _.bindAll(this);

            this.addSubscribers();
        },

	    createChildViews:function()
	    {
		    $.each(this.collection,function(){
			    var thisTeamView = new TeamItemView({
				    'team':this,
				    'team_id':this.id
			    });
			    thisTeamView.render();
		    });
	    }
    });

    return TeamListView;
});
