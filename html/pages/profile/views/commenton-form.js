// CommentOn Form View
// ---------
// Input form to create Profile comments

// Page Profile
// Requires define
// Returns {CommentOnFormView} constructor

define(['require', 'profile/models/commentonform', 'site/views/comment-form', 'models/base'], 
function(require,   ProfileCommentFormModel,        BaseCommentFormView,      BaseModel) {

    var CommentOnFormView;
        
    CommentOnFormView = BaseCommentFormView.extend({
		/*
	    initialize : function(options){

		    console.log("initializing xxxcomments list view");
		    //
		    //this.collection.on('add', this.render, this);
		    //this.collection.on('reset', this.render, this);
		    //this.setupFormView();
		    // /CollectionView.prototype.initialize.call(this, options);
	    },*/

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileCommentOnFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new ProfileCommentFormModel({id: this.collection.id});
                this.model.fetch();
            }            
        },

	    refreshComments: function(e) {
		    this.model.on('change', this.render, this);
		    this.$("#new-comment").val("");
		},
        
        // If you hit return in the main input field, create new **CommentForm** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            var comment = this.input.val();
            var self = this;
            
            self.$('.submit-result').stop().fadeOut();
            if (comment != '') {                
                date = new Date();
                var payload = new Array;
                payload['comment'] = this.input.val();
                payload['comment_date'] = date.toDateString();
                                
                var saveInfo = new BaseModel(payload);
                saveInfo.url = function() {
	                debug.log(self);
                    if (testpath)
                        return testpath + '/user/addcomment' + self.model.id;
                    return '/api/user/addcomment/' + self.model.id;
                };

            saveInfo.saveSuccess = function(model, response) {
	                BaseModel.prototype.saveSuccess.call(this, model, response);
                    var exec_data = model.get('exec_data');
                    var payload = model.get('payload');
                    var desc = model.get('desc');
                    if (!exec_data['exec_error']) {
                        $('.global-alert').addClass('alert-info').html(desc).stop().fadeIn();
                    } else {
                        $('.global-alert').addClass('alert-error').html(desc).stop().fadeIn();
                    }
	                self.collection.push(model);
	                //this.model.set('payload', payload);
	                //this.model.set('exec_data', exec_data);
	                //this.model.set('desc', desc);
	                //this.collection.add(model);
	                self.collection.on('add', self.render, self);
	                this.refreshComments();
	                Channel('profilecommentonform:fetch').publish();
                };

	            saveInfo.save();

                //this.model.set('payload', payload);
                //this.model.save();
/*
                var new_comment = this.model.clone();
                new_comment.id = Math.ceil(Math.random() * 100000);
                this.collection.push(new_comment);

 */

            }
        }
        
    });

    return CommentOnFormView;
});