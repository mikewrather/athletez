// The Team Team List
// --------------

define(['facade','views', 'utils', 'team/views/team-item'], 
function(facade,  views,   utils,   TeamTeamItemView) {

    var TeamTeamListView, 
        TeamTeamListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    TeamTeamListAbstract = CollectionView.extend(SectionView.prototype);

    TeamTeamListView = TeamTeamListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "team-team-list",

        name: "Team Team List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "team-team",

        // Store constructor for the child views
        _view: TeamTeamItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("TeamTeamListView expected options.collection.");
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

    return TeamTeamListView;
});
