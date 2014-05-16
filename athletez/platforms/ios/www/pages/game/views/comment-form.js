// CommentOn Form View
// ---------
// Input form to create comments

// Package Game
// Requires define
// Returns {GameCommentFormView} constructor

define(['require', 'game/models/commentform', 'site/views/comment-form'], 
function(require,   GameCommentFormModel,      BaseCommentFormView) {

    var GameCommentFormView;

    GameCommentFormView = BaseCommentFormView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameCommentFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameCommentFormModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
    });

    return GameCommentFormView;
});