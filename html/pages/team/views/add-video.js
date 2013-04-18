// Add Video View
// ---------

// Requires define
// Returns {TeamAddVideoView} constructor

define(['require', 'team/models/addvideo', 'media/views/add-video'], 
function(require,  TeamAddVideoModel,          BaseAddVideoView) {

    var TeamAddVideoView;

    TeamAddVideoView = BaseAddVideoView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("TeamAddVideoView expected options.collection.");
            }
            if (!this.model) {
                this.model = new TeamAddVideoModel({id: this.collection.id, sport_id: this.collection.sport_id, complevel_id: this.collection.complevel_id, season_id: this.collection.season_id});                
                this.model.fetch();
            }            
        }
    });

    return TeamAddVideoView;
});