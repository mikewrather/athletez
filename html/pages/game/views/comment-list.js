// The Game Comment List
// --------------

define(['facade','views', 'utils', 'game/views/comment-item', 'game/views/comment-form'], 
function(facade,  views,   utils,   GameCommentItemView,    GameCommentFormView) {

    var GameCommentListView, 
        GameCommentListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    GameCommentListAbstract = CollectionView.extend(SectionView.prototype);

    GameCommentListView = GameCommentListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "game-comment-list",

        name: "Game Comment List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "game-comment",

        // Store constructor for the child views
        _view: GameCommentItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("GameCommentListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupFormView();
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
        
        setupFormView: function () {
            var listView = this,
                formView = new GameCommentFormView({collection: this.collection}),
                renderAddView = this.addChildView(formView);
            
            this.childViews.form = formView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                formView.model = data;
                formView.render();
                listView.$el.prepend(formView.el);
            }
            
            Channel('gamecommentform:fetch').subscribe(callback);
        }

    });

    return GameCommentListView;
});
