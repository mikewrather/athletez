// CommentOn Form View
// ---------
// Input form to create Profile comments

// Page Profile
// Requires define
// Returns {CommentOnFormView} constructor

define(['require',  'text!site/templates/comment-form.html', 'profile/models/commentonform', 'site/views/comment-form', 'models/base',  'views', 'vendor/plugins/dateformat'],
function(require, commentFormTemplate,    ProfileCommentFormModel,        BaseCommentFormView,      BaseModel) {

    var CommentOnFormView;
	var  views = require('views'),
		dateFormat = require('vendor/plugins/dateformat'),
		BaseView = views.BaseView;

    CommentOnFormView = BaseView.extend({
	    initialize: function (options) {
	    	console.error(options);
             _.bindAll(this);
             this.setOptions();
             BaseView.prototype.initialize.call(this, options);
         },
	    el: "#comment_div",
	    template: commentFormTemplate,
	    events: {
		    "click #comment-submit": "submitHandler",
		    'click .add-comment-h': 'showCommentBox'
	    },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileCommentOnFormView expected options.collection.");
            }
            if (!this.model) {
	            console.log("this.collection.id =", this.collection.id);
                this.model = new ProfileCommentFormModel({id: this.collection.id});
                console.log(this.model.toJSON());
                this.model.fetch();
            }
        },

	    submitHandler: function (e) {
		    e.preventDefault();
		    if(!this.checkForUser()) {
			   routing.trigger('showSignup');
			    return;
		    }
		    this.createOnEnter(e);
	    },

	    showCommentBox: function (e) {
		    var $formDiv = this.$el.find('.add-comment-form-h');
		    if ($formDiv.hasClass('hide')) {
			    $(e.target).html('Hide');
			    $formDiv.removeClass('hide');
		    }
		    else {
			    $(e.target).html('Comment');
			    $formDiv.addClass('hide');
		    }
	    },

	    refreshComments: function(e) {
		    //console.log("yyyy=", this.collection);
		    this.$("#new-comment").val("");
		},
	    checkForUser: function() {
		    if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
			    return true;
		    else
			    return false;
	    },
	    
	    dateFormat: function(date) {
		    date = new Date(date);
		    return dateFormat(date,"mmm d, h:MM TT")
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
                payload['subject_type_id'] = this.collection.subject_entity_type;
                payload['subject_id'] = this.model.get("id");
                var saveInfo = new BaseModel(payload);
                saveInfo.url = function() {
	                if(!_.isUndefined(self.collection.savePath))
	                	return 'api'+self.collection.savePath;
	                
                    if (testpath)
                        return testpath + '/user/comment/add';
                    return '/api/comment/add/';
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
	                console.error(payload);
		            payload.poster = payload.name;
		            payload.poster_picture = payload.user_picture;
		            var d = self.dateFormat(date);
		            payload.comment_date = d;	
		            payload.timePosted = d;
		            payload.poster_email = payload.email;
		            console.error(model);
	                self.collection.push(model);
	                self.refreshComments();
	                routing.on('profilecommentonlist:refresh', self.collection);
                };
	            saveInfo.save();
            }
        },

	    render: function () {
		    BaseView.prototype.render.call(this);
		    this.input = this.$("#new-comment");
		    if(!this.collection.length) {
	    		if(routing.mobile)
	    			$(".mobile-link.add-comment-h").trigger("click");
	    		else
	    			$(".desktop-link.add-comment-h").trigger("click");	
		    }
		    console.log("run here now", this.el);
		    return this;
	    }
    });

    return CommentOnFormView;
});