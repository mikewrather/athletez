// The Sport List
// --------------

define(['facade','views', 'utils', 'sport/views/sport-item', "jqueryui", "jquery.slimscroll"], 
function(facade,  views,   utils,   SportItemView) {

    var SportListView, 
        SportListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        debug = utils.debug;
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    SportListAbstract = CollectionView.extend(SectionView.prototype);

    SportListView = SportListAbstract.extend({

        __super__: CollectionView.prototype,

        className: "sport-list",
        name: "Sport List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "sport",

        // Store constructor for the child views
        _view: SportItemView,

        initialize: function(options) {
        	SportListAbstract.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("SportListView expected options.collection.");
            }
            _.bindAll(this);
            this.name = options.name || this.name;
            this.id = options.id || this.id;
            this._tagName = options._tagName || this._tagName;
            this.tagName = options.tagName || this.tagName;
            this._className = options._className || this._className;
            this._view = options._view || this._view;
            this.addSubscribers();
        },
        
        initScroll : function() {
        	$('.'+this.className).slimScroll({
        		height : '200px'
        	});
        },
        
        addSubscribers : function() {
        	var view = this;
        	Channel('layout:ready').subscribe(view.initScroll);
        },
        // Child views...
        childViews: {},

        // Event handlers...
    });

    return SportListView;
});
