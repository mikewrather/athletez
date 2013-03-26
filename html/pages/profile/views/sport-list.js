// The Profile Sport List
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

        id: "profile-sport-list",

        name: "Profile Sport List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-sport",

        // Store constructor for the child views
        _view: ProfileSportItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileSportListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        },

        render: function () {
            SectionView.prototype.render.call(this);
            _.delay(this.handleListDisplay, 250);
            return this;
        },

        handleListDisplay: function () {
            var main = $(this.destination);

            if (this.collection.length) {
                main.show();
            } else {
                main.hide();
            }            
        },

        // Child views...
        childViews: {},

        // Event handlers...

        addSubscribers: function () {
            this.collection.on('add remove reset sync toggleAllComplete clearCompleted', this.handleListDisplay); 
        },

        removeSubscribers: function () {
            this.collection.off('add remove reset sync toggleAllComplete clearCompleted', this.handleListDisplay);
        }

    });

    return ProfileSportListView;
});
