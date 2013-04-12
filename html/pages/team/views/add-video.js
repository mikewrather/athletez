// Add Video View
// ---------

// Requires define
// Returns {AddVideoView} constructor

define(['require', 'team/models/addvideo', 'media/views/add-video'], 
function(require,  AddVideoModel,          BaseAddVideoView) {

    var AddVideoView;

    AddVideoView = BaseAddVideoView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("AddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new AddVideoModel({id: this.collection.id, sport_id: this.collection.sport_id, complevel_id: this.collection.complevel_id, season_id: this.collection.season_id});                
                this.model.fetch();
            }            
        }
    });

    return AddVideoView;
});