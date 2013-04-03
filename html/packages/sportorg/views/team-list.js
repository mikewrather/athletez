// Team List
// --------------

define(['facade','views', 'utils', 'sportorg/views/team-item'], 
function(facade,  views,   utils,   TeamItemView) {

    var TeamListView, 
        TeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    TeamListAbstract = CollectionView.extend(SectionView.prototype);

    TeamListView = TeamListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "team-list",
        name: "Team List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "team",

        // Store constructor for the child views
        _view: TeamItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return TeamListView;
});
