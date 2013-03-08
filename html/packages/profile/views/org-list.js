// The Profile Org List
// --------------

define(['facade','views', 'utils', 'profile/views/org-item'], 
function(facade,  views,   utils,   ProfileOrgItemView) {

    var ProfileOrgListView, 
        ProfileOrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileOrgListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileOrgListView = ProfileOrgListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-org-list",

        name: "Profile Org List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",

        // Store constructor for the child views
        _view: ProfileOrgItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileOrgListView expected options.collection.");
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

    return ProfileOrgListView;
});
