// Related List
// --------------

define(['facade','views', 'utils', 'user/views/related-item'], 
function(facade,  views,   utils,   RelatedItemView) {

    var RelatedListView, 
        RelatedListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    RelatedListAbstract = CollectionView.extend(SectionView.prototype);

    RelatedListView = RelatedListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "related-list",
        name: "Related List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "related",

        // Store constructor for the child views
        _view: RelatedItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("RelatedListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
        }

    });

    return RelatedListView;
});
