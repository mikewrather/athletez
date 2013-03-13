// The Profile Team List
// --------------

define(['facade','views', 'utils', 'profile/views/team-item'], 
function(facade,  views,   utils,   ProfileTeamItemView) {

    var ProfileTeamListView, 
        ProfileOrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileTeamListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileTeamListView = ProfileTeamListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-team-list",

        name: "Profile Team List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-team",

        // Store constructor for the child views
        _view: ProfileTeamItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileTeamListView expected options.collection.");
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

    return ProfileTeamListView;
});
