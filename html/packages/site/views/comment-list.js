// The Comment List
// --------------

define(['facade','views', 'utils', 'site/views/comment-item', 'site/views/comment-form'], 
function(facade,  views,   utils,   CommentItemView,    CommentFormView) {

    var CommentListView, 
        CommentListAbstract,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    CommentListAbstract = CollectionView.extend(SectionView.prototype);

    CommentListView = CommentListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "comment-list",
        name: "Comment List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "comment",

        // Store constructor for the child views
        _view: CommentItemView,

        initialize: function(options) {
	        //this.limitResults(4);
	        //console.log("options herebb",this.collection);
	        //options = {collection: this.collection.first(3)};
            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("CommentListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            this.setupFormView();

        },

	    // Child views...
        childViews: {},

        // Event handlers...

        // Add Views
        setupFormView: function () {
            var listView = this,
                formView = new CommentFormView({collection: this.collection}),
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
            
            Channel('commentform:fetch').subscribe(callback);
        }

    });

    return CommentListView;
});
