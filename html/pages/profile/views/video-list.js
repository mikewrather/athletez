// The Profile Video List
// --------------

define(['facade','views', 'utils', 'profile/views/video-item'], 
function(facade,  views,   utils,   ProfileVideoItemView) {

    var ProfileVideoListView, 
        ProfileVideoListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileVideoListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileVideoListView = ProfileVideoListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-video-list",

        name: "Profile Video List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-video",

        // Store constructor for the child views
        _view: ProfileVideoItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileVideoListView expected options.collection.");
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

    return ProfileVideoListView;
});
