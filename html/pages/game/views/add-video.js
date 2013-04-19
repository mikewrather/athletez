// Add Video View
// ---------

// Package Game
// Requires define
// Returns {GameAddVideoView} constructor

define(['require', 'game/models/addvideo', 'media/views/add-video'], 
function(require,   GameAddVideoModel,      BaseAddVideoView) {

    var GameAddVideoView;

    GameAddVideoView = BaseAddVideoView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("GameAddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new GameAddVideoModel({id: this.collection.id});
                this.model.fetch();
            }            
        }
    });

    return GameAddVideoView;
});