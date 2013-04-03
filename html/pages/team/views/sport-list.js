// The Team Sport List
// --------------

define(['facade','views', 'utils', 'team/views/sport-item'], 
function(facade,  views,   utils,   TeamSportItemView) {

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

        id: "team-sport-list",

        name: "Team Sport List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "team-sport",

        // Store constructor for the child views
        _view: TeamSportItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamSportListView expected options.collection.");
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

    return TeamSportListView;
});
