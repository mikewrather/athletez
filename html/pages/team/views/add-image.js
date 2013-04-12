// Add Image View
// ---------

// Requires define
// Returns {AddImageView} constructor

define(['require', 'team/models/addimage', 'media/views/add-image'], 
function(require,  AddImageModel,          BaseAddImageView) {

    var AddImageView;

    AddImageView = BaseAddImageView.extend({

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.collection) {
                throw new Error("AddImageView expected options.collection.");
            }
            if (!this.model) {
                this.model = new AddImageModel({id: this.collection.id, sport_id: this.collection.sport_id, complevel_id: this.collection.complevel_id, season_id: this.collection.season_id});                
                this.model.fetch();
            }            
        }
    });

    return AddImageView;
});