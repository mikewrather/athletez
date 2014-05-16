// Sport List
// --------------

define(['facade','views', 'utils', 'team/views/sport-item'], 
function(facade,  views,   utils,   SportItemView) {

    var TeamSportListView, 
        TeamSportListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    TeamSportListAbstract = CollectionView.extend(SectionView.prototype);

    TeamSportListView = TeamSportListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "sport-list",
        name: "Sport List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "sport",

        // Store constructor for the child views
        _view: SportItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("SportListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return TeamSportListView;
});
