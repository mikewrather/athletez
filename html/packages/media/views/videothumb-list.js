// The Video Thumb List
// --------------

define(['facade','views', 'utils', 'media/views/videothumb-item', 'media/views/add-video'], 
function(facade,  views,   utils,   VideoThumbItemView,           AddVideoView) {

    var VideoThumbListView, 
        VideoThumbListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    VideoThumbListAbstract = CollectionView.extend(SectionView.prototype);

    VideoThumbListView = VideoThumbListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "videothumb-list",
        name: "Video Thumb List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "videothumb",

        // Store constructor for the child views
        _view: VideoThumbItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("VideoThumbListView expected options.collection.");
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
                addView = new AddVideoView({collection: this.collection}),
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
            
            Channel('addvideo:fetch').subscribe(callback);
        }

    });

    return VideoThumbListView;
});
