// Add Video View
// ---------
// Input form to add video

// Package Game
// Requires define
// Returns {GameAddVideoView} constructor

define([
        'require', 
        'text!media/templates/add-video.html', 
        'facade', 
        'views', 
        'media/models/video'
        ], function(require, addVideoTemplate) {

    var AddVideoView,
        facade = require('facade'),
        views = require('views'),
        AddVideoModel = require('media/models/video'),
        BaseView = views.BaseView,
        _ = facade._;

    AddVideoView = BaseView.extend({

        tagName: "li",

        template: addVideoTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #addvideo": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("AddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new AddVideoModel({id: this.collection.id});
                this.model.fetch();
            }
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#title");            
        },

        submitHandler: function (e) {
            alert("AddVideoView");
            e.preventDefault();
            this.createOnEnter(e);
        },

        // If you hit return in the main input field, create new **AddVideo** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            var videotitle = this.input.val();
            if (videotitle != '') {                
                
                var payload = this.model.get('payload');
                payload['video_title'] = this.input.val();
                
                this.model.save();
                
                var new_video = this.model.clone();
                new_video.id = Math.ceil(Math.random() * 100000);
                this.collection.push(new_video);
                
                this.input.val('');
            }
        }

    });

    return AddVideoView;
});