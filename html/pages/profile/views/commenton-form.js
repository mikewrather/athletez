// CommentOn Form View
// ---------
// Input form to create Profile comments

// Page Profile
// Requires define
// Returns {CommentOnFormView} constructor

define(['require',  'text!site/templates/comment-form.html', 'profile/models/commentonform', 'site/views/comment-form', 'models/base',  'views'],
function(require, commentFormTemplate,    ProfileCommentFormModel,        BaseCommentFormView,      BaseModel) {

    var CommentOnFormView;
	var  views = require('views'),
		BaseView = views.BaseView;

    CommentOnFormView = BaseView.extend({
	    initialize: function (options) {
             _.bindAll(this);
             this.setOptions();
             BaseView.prototype.initialize.call(this, options);
         },
	    el: "#comment_div",
	    template: commentFormTemplate,

	    events: {
		    "click #comment-submit": "submitHandler"
	    },

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

	    submitHandler: function (e) {
		    e.preventDefault();
		    this.createOnEnter(e);
	    },

	    refreshComments: function(e) {
		    //this.collection.on('change', this.render, this);
		    console.log("yyyy", this.render);
		    this.$("#new-comment").val("");
		},
        
        // If you hit return in the main input field, create new **CommentForm** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
	        var comment = this.$el.find("#new-comment").val();
            var self = this;

            self.$('.submit-result').stop().fadeOut();
            if (comment != '') {                
                date = new Date();
                var payload = new Array;
                payload['comment'] = comment;
                payload['comment_date'] = date.toDateString();
                                
                var saveInfo = new BaseModel(payload);
                saveInfo.url = function() {
	                debug.log(self);
                    if (testpath)
                        return testpath + '/user/addcomment';
                    return '/api/user/addcomment';
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
	                //set the value to fit the page variable.
		            payload.poster = payload.name;
		            payload.poster_picture = payload.user_picture;
		            payload.poster_email = payload.email;
	                console.log('thiszz = ', model);
	                //this.model = model;
	                self.collection.push(model);
	                self.refreshComments();
	                //Channel('profilecommentonform:fetch').publish();
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
        },

	    render: function () {
		    BaseView.prototype.render.call(this);
		    this.input = this.$("#new-comment");
		    console.log("run here now", this.el);
		    return this;
	    }
        
    });

    return CommentOnFormView;
});