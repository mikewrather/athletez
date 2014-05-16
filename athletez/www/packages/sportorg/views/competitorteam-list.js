// Competitor Team List
// --------------

define(['facade','views', 'utils', 'sportorg/views/competitorteam-item'], 
function(facade,  views,   utils,   CompetitorTeamItemView) {

    var CompetitorTeamListView, 
        CompetitorTeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    CompetitorTeamListAbstract = CollectionView.extend(SectionView.prototype);

    CompetitorTeamListView = CompetitorTeamListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "team-list",
        name: "Team List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "team",

        // Store constructor for the child views
        _view: CompetitorTeamItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("CompetitorTeamListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return CompetitorTeamListView;
});
