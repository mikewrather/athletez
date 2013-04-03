// CommentOn Form View
// ---------
// Input form to create comments

// Package Game
// Requires define
// Returns {CommentFormView} constructor

define(['require', 'game/models/commentform', 'site/views/comment-form'], 
function(require,  CommentFormModel,          BaseCommentFormView) {

    var CommentFormView;

    CommentFormView = BaseCommentFormView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("CommentFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new CommentFormModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
    });

    return CommentFormView;
});