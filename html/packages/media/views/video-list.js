// Video List
// --------------

define(['facade','views', 'utils', 'media/views/video-item', 'media/views/video-player', 'media/views/add-video'], 
function(facade,  views,   utils,   VideoItemView,            VideoPlayerView,            AddVideoView) {

    var VideoListView, 
        VideoListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    VideoListAbstract = CollectionView.extend(SectionView.prototype);

    VideoListView = VideoListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "video-list",
        name: "Video List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "video",

        // Store constructor for the child views
        _view: VideoItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("VideoListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupPlayerView();
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
        },
        
        setupPlayerView: function() {
            if (this.collection.size() == 0)
                return;
                
            var listView = this,
                addView = new VideoPlayerView({collection: this.collection, model: this.collection.at(0)}),
                renderAddView = this.addChildView(addView);
            
            this.childViews.player = addView;
            this.callbacks.add(function() {
                renderAddView();
                addView.render();
                listView.$el.prepend(addView.el);
            });
            
            function changeVideo(data) {
                addView.model = data;
                addView.render();
            }
            
            Channel('changevideo' + this.collection.id).subscribe(changeVideo);
        }

    });

    return VideoListView;
});
