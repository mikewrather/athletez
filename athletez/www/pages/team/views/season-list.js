// Season List
// --------------

define(['facade','views', 'utils', 'team/views/season-item'], 
function(facade,  views,   utils,   SeasonItemView) {

    var TeamSeasonListView, 
        TeamSeasonListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    TeamSeasonListAbstract = CollectionView.extend(SectionView.prototype);

    TeamSeasonListView = TeamSeasonListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "season-list",
        name: "Season List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "season",

        // Store constructor for the child views
        _view: SeasonItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("SeasonListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }        

    });

    return TeamSeasonListView;
});
