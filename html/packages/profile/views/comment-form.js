// Comment Form View
// ---------
// Input form to create Profile comments

// Package Profile
// Requires define
// Returns {ProfileCommentFormView} constructor

define([
        'require', 
        'text!profile/templates/comment-form.html', 
        'facade', 
        'views', 
        'profile/models/comment-form'
        ], function(require, profileCommentFormTemplate) {

    var ProfileCommentFormView,
        facade = require('facade'),
        views = require('views'),
        ProfileCommentFormModel = require('profile/models/comment-form'),
        BaseView = views.BaseView,
        _ = facade._;

    ProfileCommentFormView = BaseView.extend({

        tagName: "li",

        template: profileCommentFormTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #comment-submit": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileCommentFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new ProfileCommentFormModel();
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

        // If you hit return in the main input field, create new **ProfileComment** model,
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

    return ProfileCommentFormView;
});