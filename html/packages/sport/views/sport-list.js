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
            this.sports_id = options.sports_id || undefined;
            this.name = options.name || this.name;
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
        
        afterRender: function() {
        	//alert(this.sports_id);
        	if(this.sports_id) {
        		var $this = this.$el.find("a.sport-item-h[data-id="+this.sports_id+"]");
        		$('li.sport').removeClass('select');
        		$this.addClass('select');
				var interval = setInterval(function() {
					if($("#sport .sport-link-h .option-heading-h").length) {
						clearInterval(interval);
						if($this.text())
							$("#sport .sport-link-h .option-heading-h").html($this.text());
					}
				} , 2000);        			
        	}
        },
        
        // Child views...
        childViews: {},

        // Event handlers...
    });

    return SportListView;
});
