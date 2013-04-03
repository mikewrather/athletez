// Add Image View
// ---------

// Package Game
// Requires define
// Returns {AddImageView} constructor

define(['require', 'game/models/addimage', 'media/views/add-image'], 
function(require,  AddImageModel,          BaseAddImageView) {

    var AddImageView;

    AddImageView = BaseAddImageView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("AddImageView expected options.collection.");
            }
            if (!this.model) {
                this.model = new AddImageModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
    });

    return AddImageView;
});