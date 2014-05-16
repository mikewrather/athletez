// The State List
// --------------

define(['facade','views', 'utils', 'packages/location/views/state-item'], 
function(facade,  views,   utils,   StateItemView) {

    var StateListView, 
        StateListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    StateListAbstract = CollectionView.extend(SectionView.prototype);

    StateListView = StateListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "state-list",
        name: "State List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "state",

        // Store constructor for the child views
        _view: StateItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("StateListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        },

        // Child views...
        childViews: {}

        // Event handlers...

        
    });

    return StateListView;
});
