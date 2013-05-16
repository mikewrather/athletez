// CommentOn Form View
// ---------
// Input form to create site comments

// Package Site
// Requires define
// Returns {CommentFormView} constructor

define([
        'require', 
        'text!site/templates/comment-form.html', 
        'facade', 
        'views', 
        'site/models/comment'
        ], function(require, commentFormTemplate) {

    var CommentFormView,
        facade = require('facade'),
        views = require('views'),
        CommentModel = require('site/models/comment'),
        BaseView = views.BaseView;

    CommentFormView = BaseView.extend({

        tagName: "li",

        template: commentFormTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #comment-submit": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("CommentFormView expected options.collection.");
            }
            if (!this.model) {
                //this.model = new CommentModel({id: this.collection.id});
                //this.model.fetch();
            }            
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#new-comment");            
            
            var payload = this.model.get('payload');
            var self = this;
            if (payload) {
                var user_photo = payload['user_picture'];
                var user_email = payload['email'];
                if (!user_photo && user_email) {
                    self.$('.user-photo img').attr("src","http://www.gravatar.com/avatar/" + MD5(user_email) + "&s=29");
                }
            }
        },

        submitHandler: function (e) {
            e.preventDefault();
            this.createOnEnter(e);
        },

        // If you hit return in the main input field, create new **CommentForm** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            var comment = this.input.val();
            if (comment != '') {                
                
                date = new Date();
                
                var payload = this.model.get('payload');
                payload['comment'] = this.input.val();
                payload['comment_date'] = date.toDateString();
                this.model.set('payload', payload);
                
                this.model.save();
                
                var new_comment = this.model.clone();
                new_comment.id = Math.ceil(Math.random() * 100000);
                this.collection.push(new_comment);
                
                this.input.val('');
            }
        }

    });

    return CommentFormView;
});