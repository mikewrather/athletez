// CommentOn Form View
// ---------
// Input form to create comments

// Package Team
// Requires define
// Returns {CommentFormView} constructor

define(['require', 'team/models/commentform', 'site/views/comment-form'], 
function(require,  CommentFormModel,          BaseCommentFormView) {

    var CommentFormView;

    CommentFormView = BaseCommentFormView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("CommentFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new CommentFormModel({id: this.collection.id, sport_id: this.collection.sport_id, complevel_id: this.collection.complevel_id, season_id: this.collection.season_id});
                this.model.fetch();
            }            
        }
    });

    return CommentFormView;
});