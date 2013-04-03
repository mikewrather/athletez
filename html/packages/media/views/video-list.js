// Video List
// --------------

define(['facade','views', 'utils', 'media/views/video-item'], 
function(facade,  views,   utils,   VideoItemView) {

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
        }

    });

    return VideoListView;
});
