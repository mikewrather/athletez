// The Profile CommentOn List
// --------------

define(['facade','views', 'utils', 'profile/views/commenton-item', 'profile/views/commenton-form'], 
function(facade,  views,   utils,   ProfileCommentOnItemView,       ProfileCommentOnFormView) {

    var ProfileCommentOnListView, 
        ProfileCommentOnListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileCommentOnListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileCommentOnListView = ProfileCommentOnListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-commenton-list",

        name: "Profile CommentOn List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-commenton",

        // Store constructor for the child views
        _view: ProfileCommentOnItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileCommentOnListView expected options.collection.");
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
            var commentOnListView = this,
                profileCommentFormView = new ProfileCommentOnFormView({collection: this.collection}),
                renderCommentFormView = this.addChildView(profileCommentFormView);

            this.childViews.form = profileCommentFormView;            
            this.callbacks.add(function () {
                renderCommentFormView();                
            });            
            
            function callback (data) {
                profileCommentFormView.model = data;
                profileCommentFormView.render();
                commentOnListView.$el.prepend(profileCommentFormView.el);                
            }
            Channel('profilecommentonform:fetch').subscribe(callback);                
        }

    });

    return ProfileCommentOnListView;
});
