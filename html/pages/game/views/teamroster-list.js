// The Game Team Roster List
// --------------

define(['facade','views', 'utils', 'game/views/teamroster-item'], 
function(facade,  views,   utils,   GameTeamRosterItemView) {

    var GameTeamRosterListView, 
        GameTeamRosterListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    GameTeamRosterListAbstract = CollectionView.extend(SectionView.prototype);

    GameTeamRosterListView = GameTeamRosterListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "game-teamroster-list",

        name: "Game Team Roster List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "game-teamroster",

        // Store constructor for the child views
        _view: GameTeamRosterItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("GameTeamRosterListView expected options.collection.");
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

    return GameTeamRosterListView;
});
