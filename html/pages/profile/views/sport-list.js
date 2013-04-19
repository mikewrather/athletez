// Sport List
// --------------

define(['facade','views', 'utils', 'profile/views/sport-item'], 
function(facade,  views,   utils,   ProfileSportItemView) {

    var ProfileSportListView, 
        ProfileSportListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileSportListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileSportListView = ProfileSportListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "sport-list",
        name: "Sport List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "sport",

        // Store constructor for the child views
        _view: ProfileSportItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("SportListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }
    });

    return ProfileSportListView;
});
