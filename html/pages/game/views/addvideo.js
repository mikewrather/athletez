// Add Video View
// ---------
// Input form to add game video

// Package Game
// Requires define
// Returns {GameAddVideoView} constructor

define([
        'require', 
        'text!game/templates/addvideo.html', 
        'facade', 
        'views', 
        'game/models/addvideo'
        ], function(require, gameAddVideoTemplate) {

    var GameAddVideoView,
        facade = require('facade'),
        views = require('views'),
        GameAddVideoModel = require('game/models/addvideo'),
        BaseView = views.BaseView,
        _ = facade._;

    GameAddVideoView = BaseView.extend({

        tagName: "li",

        template: gameAddVideoTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #addvideo": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameAddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameAddVideoModel({id: this.collection.id});
                this.model.fetch();
            }
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#title");            
        },

        dataDecorator: function (data) {
            data.tooltip = "Press Enter to save this comment";
            return data;
        },

        submitHandler: function (e) {
            e.preventDefault();
            this.createOnEnter(e);
        },

        // If you hit return in the main input field, create new **GameAddVideo** model,
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

    return GameAddVideoView;
});