// Season List
// --------------

define(['facade','views', 'utils', 'team/views/season-item'], 
function(facade,  views,   utils,   SeasonItemView) {

    var SeasonListView, 
        SeasonListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    SeasonListAbstract = CollectionView.extend(SectionView.prototype);

    SeasonListView = SeasonListAbstract.extend({

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

    return SeasonListView;
});