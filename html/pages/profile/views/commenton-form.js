// CommentOn Form View
// ---------
// Input form to create Profile comments

// Page Profile
// Requires define
// Returns {CommentOnFormView} constructor

define(['require', 'profile/models/commentonform', 'site/views/comment-form'], 
function(require,   ProfileCommentFormModel,        BaseCommentFormView) {

    var CommentOnFormView;
        
    CommentOnFormView = BaseCommentFormView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileCommentOnFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new ProfileCommentFormModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
        
    });

    return CommentOnFormView;
});