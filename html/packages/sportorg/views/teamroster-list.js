// The Team Roster List
// --------------

define(['facade','views', 'utils', 'sportorg/views/teamroster-item'], 
function(facade,  views,   utils,   TeamRosterItemView) {

    var TeamRosterListView, 
        TeamRosterListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    TeamRosterListAbstract = CollectionView.extend(SectionView.prototype);

    TeamRosterListView = TeamRosterListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "teamroster-list",
        name: "Team Roster List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "teamroster",

        // Store constructor for the child views
        _view: TeamRosterItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamRosterListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

        // Event handlers...

        
    });

    return TeamRosterListView;
});
