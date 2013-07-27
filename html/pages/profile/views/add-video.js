// Add Video View
// ---------

// Requires define
// Returns {ProfileAddVideoView} constructor

define(['require', 'profile/models/addvideo', 'media/views/add-video'], 
function(require,   ProfileAddVideoModel,      BaseAddVideoView) {

    var ProfileAddVideoView;

    ProfileAddVideoView = BaseAddVideoView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("ProfileAddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new ProfileAddVideoModel({id: this.collection.id, sport_id: this.collection.sport_id});                
            //    this.model.fetch();
            }            
        }
    });

    return ProfileAddVideoView;
});