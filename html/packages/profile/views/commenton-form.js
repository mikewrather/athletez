// CommentOn Form View
// ---------
// Input form to create Profile comments

// Package Profile
// Requires define
// Returns {ProfileCommentOnFormView} constructor

define([
        'require', 
        'text!profile/templates/commenton-form.html', 
        'facade', 
        'views', 
        'profile/models/commentonform'
        ], function(require, profileCommentOnFormTemplate) {

    var ProfileCommentOnFormView,
        facade = require('facade'),
        views = require('views'),
        ProfileCommentOnFormModel = require('profile/models/commentonform'),
        BaseView = views.BaseView,
        _ = facade._;

    ProfileCommentOnFormView = BaseView.extend({

        tagName: "li",

        template: profileCommentOnFormTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #comment-submit": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileCommentOnFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new ProfileCommentOnFormModel();
            }            
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#new-comment");            
        },

        dataDecorator: function (data) {
            data.tooltip = "Press Enter to save this comment";
            return data;
        },

        submitHandler: function (e) {
            e.preventDefault();
            this.createOnEnter(e);
        },

        // If you hit return in the main input field, create new **ProfileCommentOn** model,
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
                
                this.collection.add(this.model.toJSON());
                this.input.val('');
            }
        }

    });

    return ProfileCommentOnFormView;
});