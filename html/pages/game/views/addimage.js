// Add Image View
// ---------
// Input form to add game image

// Package Game
// Requires define
// Returns {GameAddImageView} constructor

define([
        'require', 
        'text!game/templates/addimage.html', 
        'facade', 
        'views', 
        'game/models/addimage'
        ], function(require, gameAddImageTemplate) {

    var GameAddImageView,
        facade = require('facade'),
        views = require('views'),
        GameAddImageModel = require('game/models/addimage'),
        BaseView = views.BaseView,
        _ = facade._;

    GameAddImageView = BaseView.extend({

        tagName: "li",

        template: gameAddImageTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #addimage": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameAddImageView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameAddImageModel({id: this.collection.id});
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

        // If you hit return in the main input field, create new **GameAddImage** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            var imagetitle = this.input.val();
            if (imagetitle != '') {                
                
                var payload = this.model.get('payload');
                payload['image_title'] = this.input.val();
                
                this.model.save();
                
                var new_image = this.model.clone();
                new_image.id = Math.ceil(Math.random() * 100000);
                this.collection.push(new_image);
                
                this.input.val('');
            }
        }

    });

    return GameAddImageView;
});