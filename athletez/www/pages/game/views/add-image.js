// Add Image View
// ---------

// Package Game
// Requires define
// Returns {GameAddImageView} constructor

define(['require', 'game/models/addimage', 'media/views/add-image'], 
function(require,   GameAddImageModel,      BaseAddImageView) {

    var GameAddImageView;

    GameAddImageView = BaseAddImageView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameAddImageView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameAddImageModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
    });

    return GameAddImageView;
});