// Fitness Basic List
// --------------

define(['facade','views', 'utils', 'user/views/fitnessbasic-item'], 
function(facade,  views,   utils,   FitnessBasicItemView) {

    var FitnessBasicListView, 
        FitnessBasicListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    FitnessBasicListAbstract = CollectionView.extend(SectionView.prototype);

    FitnessBasicListView = FitnessBasicListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "fitnessbasic-list",
        name: "Fitness Basic List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "fitnessbasic",

        // Store constructor for the child views
        _view: FitnessBasicItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("FitnessBasicListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return FitnessBasicListView;
});
