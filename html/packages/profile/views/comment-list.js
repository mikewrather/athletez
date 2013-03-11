// The Profile Comment List
// --------------

define(['facade','views', 'utils', 'profile/views/comment-item', 'profile/views/comment-form'], 
function(facade,  views,   utils,   ProfileCommentItemView,       ProfileCommentFormView) {

    var ProfileCommentListView, 
        ProfileOrgListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ProfileCommentListAbstract = CollectionView.extend(SectionView.prototype);

    ProfileCommentListView = ProfileCommentListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "profile-comment-list",

        name: "Profile Comment List",

        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "profile-comment",

        // Store constructor for the child views
        _view: ProfileCommentItemView,

        initialize: function(options) {
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ProfileCommentListView expected options.collection.");
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
            var commentListView = this,
                profileCommentFormView = new ProfileCommentFormView({collection: this.collection}),
                renderCommentFormView = this.addChildView(profileCommentFormView);

            this.childViews.form = profileCommentFormView;            
            this.callbacks.add(function () {
                renderCommentFormView();
                //commentListView.$el.prepend(profileCommentFormView.el);
            });            
            
            function callback (data) {
                profileCommentFormView.model = data;
                profileCommentFormView.render();
                commentListView.$el.prepend(profileCommentFormView.el);                
            }
            Channel('profilecommentform:fetch').subscribe(callback);                
        }

    });

    return ProfileCommentListView;
});
