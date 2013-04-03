// Org List
// --------------

define(['facade','views', 'utils', 'sportorg/views/org-item'], 
function(facade,  views,   utils,   OrgItemView) {

    var OrgListView, 
        OrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    OrgListAbstract = CollectionView.extend(SectionView.prototype);

    OrgListView = OrgListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "org-list",
        name: "Org List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "org",

        // Store constructor for the child views
        _view: OrgItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("OrgListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }        

    });

    return OrgListView;
});
