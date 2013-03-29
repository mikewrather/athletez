// The Game Video Thumb List
// --------------

define(['facade','views', 'utils', 'game/views/videothumb-item', 'game/views/addvideo'], 
function(facade,  views,   utils,   GameVideoThumbItemView,      GameAddVideoView) {

    var GameVideoThumbListView, 
        GameVideoThumbListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    GameVideoThumbListAbstract = CollectionView.extend(SectionView.prototype);

    GameVideoThumbListView = GameVideoThumbListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "game-videothumb-list",

        name: "Game Video Thumb List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "game-videothumb",

        // Store constructor for the child views
        _view: GameVideoThumbItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("GameVideoThumbListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupAddView();
        },

        render: function () {
            SectionView.prototype.render.call(this);
            _.delay(this.handleListDisplay, 250);
            return this;
        },

        handleListDisplay: function () {
            var main = $(this.destination);

            if (this.collection.length) {
                main.show();
            } else {
                main.hide();
            }
        },

        // Child views...
        childViews: {},

        // Event handlers...

        addSubscribers: function () {
            this.collection.on('add remove reset sync toggleAllComplete clearCompleted', this.handleListDisplay); 
        },

        removeSubscribers: function () {
            this.collection.off('add remove reset sync toggleAllComplete clearCompleted', this.handleListDisplay);
        },
        
        setupAddView: function() {
            var listView = this,
                addView = new GameAddVideoView({collection: this.collection}),
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
            
            Channel('gameaddvideo:fetch').subscribe(callback);
        }

    });

    return GameVideoThumbListView;
});
