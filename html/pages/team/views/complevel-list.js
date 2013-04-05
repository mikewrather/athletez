// Complevel List
// --------------

define(['facade','views', 'utils', 'team/views/complevel-item'], 
function(facade,  views,   utils,   ComplevelItemView) {

    var ComplevelListView, 
        ComplevelListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ComplevelListAbstract = CollectionView.extend(SectionView.prototype);

    ComplevelListView = ComplevelListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "complevel-list",
        name: "Complevel List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "complevel",

        // Store constructor for the child views
        _view: ComplevelItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ComplevelListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }        

    });

    return ComplevelListView;
});
