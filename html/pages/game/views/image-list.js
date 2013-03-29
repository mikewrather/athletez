// The Game Image List
// --------------

define(['facade','views', 'utils', 'game/views/image-item', 'game/views/addimage'], 
function(facade,  views,   utils,   GameImageItemView,      GameAddImageView) {

    var GameImageListView, 
        GameImageListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    GameImageListAbstract = CollectionView.extend(SectionView.prototype);

    GameImageListView = GameImageListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "game-image-list",

        name: "Game Image List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "game-image",

        // Store constructor for the child views
        _view: GameImageItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("GameImageListView expected options.collection.");
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
                addView = new GameAddImageView({collection: this.collection}),
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
            
            Channel('gameaddimage:fetch').subscribe(callback);
        }

    });

    return GameImageListView;
});
