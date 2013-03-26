// The Profile Related List
// --------------

define(['facade','views', 'utils', 'profile/views/related-item'], 
function(facade,  views,   utils,   ProfileRelatedItemView) {

    var ProfileRelatedListView, 
        ProfileRelatedListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileRelatedListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileRelatedListView = ProfileRelatedListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-related-list",

        name: "Profile Related List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-related",

        // Store constructor for the child views
        _view: ProfileRelatedItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileRelatedListView expected options.collection.");
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

    return ProfileRelatedListView;
});
