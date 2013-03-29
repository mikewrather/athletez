// CommentOn Form View
// ---------
// Input form to create Game comments

// Package Game
// Requires define
// Returns {GameCommentFormView} constructor

define([
        'require', 
        'text!game/templates/comment-form.html', 
        'facade', 
        'views', 
        'game/models/commentform'
        ], function(require, gameCommentFormTemplate) {

    var GameCommentFormView,
        facade = require('facade'),
        views = require('views'),
        GameCommentFormModel = require('game/models/commentform'),
        BaseView = views.BaseView,
        _ = facade._;

    GameCommentFormView = BaseView.extend({

        tagName: "li",

        template: gameCommentFormTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #comment-submit": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameCommentFormView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameCommentFormModel({id: this.collection.id});
                this.model.fetch();
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

        // If you hit return in the main input field, create new **GameCommentForm** model,
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

    return GameCommentFormView;
});