// Add Image View
// ---------
// Input form to add image

// Package Media
// Requires define
// Returns {AddImageView} constructor

define([
        'require', 
        'text!media/templates/add-image.html', 
        'facade', 
        'views', 
        'media/models/image'
        ], function(require, addImageTemplate) {

    var AddImageView,
        facade = require('facade'),
        views = require('views'),
        AddImageModel = require('media/models/image'),
        BaseView = views.BaseView;

    AddImageView = BaseView.extend({

        tagName: "li",

        template: addImageTemplate,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #addimage": "submitHandler"
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("AddImageView expected options.collection.");
            }
            if (!this.model) {
                //this.model = new AddImageModel({id: this.collection.id});
                //this.model.fetch();
            }
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#title");            
        },

        submitHandler: function (e) {
            e.preventDefault();
            this.createOnEnter(e);
        },

        // If you hit return in the main input field, create new **AddImage** model,
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

    return AddImageView;
});