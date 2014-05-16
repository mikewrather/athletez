// The Roster List
// --------------

define(['facade','views', 'utils', 'sportorg/views/roster-item'], 
function(facade,  views,   utils,   RosterItemView) {

    var RosterListView, 
        RosterListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    RosterListAbstract = CollectionView.extend(SectionView.prototype);

    RosterListView = RosterListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "roster-list",
        name: "Roster List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "roster",

        // Store constructor for the child views
        _view: RosterItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("RosterListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

        // Event handlers...

        
    });

    return RosterListView;
});
