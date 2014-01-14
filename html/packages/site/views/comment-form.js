// CommentOn Form View
// ---------
// Input form to create site comments

// Package Site
// Requires define
// Returns {CommentFormView} constructor

define([
        'require', 
        "text!site/templates/comment-form.html",
        'facade', 
        'views', 
        'site/models/comment'
        ], function(require) {

    var CommentFormView,
	    commentFormTemplate = require("text!site/templates/comment-form.html"),
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
	        console.log("RENDER CALLED!!!!");
            BaseView.prototype.render.call(this);
            this.input = this.$("#new-comment");    
     /*        if(!this.model.length) {
		    	$(".add-comment-h").trigger("click");
		    }
       */     var payload = this.model.get('payload');
	        console.log("return payloady", payload);
            var self = this;
            if (payload) {
                var user_photo = payload.user_picture;
                var user_email = payload.email;
            }
	        return this;
        },
        
        checkForUser : function() {
			if (!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
		},

        submitHandler: function (e) {
        	e.preventDefault();
        	var _self = this, addToList = function(callback) {
            	this.createOnEnter(e);
            	//if(callback) callback();
          	};
            
            if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	addToList(function() {
			     		//if(callback) callback();
			     	});
			     });
	    	} else {
	    		addToList();
	    	}
	    },

        // If you hit return in the main input field, create new **CommentForm** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            var comment = this.input.val();
            if (comment != '') {                
                
                this.input.val('');
            }
        }


    });

    return CommentFormView;
});