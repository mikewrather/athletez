// The Image List
// --------------

define(['facade','views', 'utils', 'media/views/image-item', 'media/views/add-image'], 
function(facade,  views,   utils,   ImageItemView,      AddImageView) {

    var ImageListView, 
        ImageListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ImageListAbstract = CollectionView.extend(SectionView.prototype);

    ImageListView = ImageListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "image-list",
        name: "Image List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "image",

        // Store constructor for the child views
        _view: ImageItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ImageListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupAddView();
        },

        // Child views...
        childViews: {},

        // Event handlers...

        // Add Views
        setupAddView: function() {
            var listView = this,
                addView = new AddImageView({collection: this.collection}),
                renderAddView = this.addChildView(addView);
            
            this.childViews.form = addView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                addView.model = data;
                addView.render();
                listView.$el.append(addView.el);
            }
            
            Channel('addimage:fetch').subscribe(callback);
        }

    });

    return ImageListView;
});
