// Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {ProfileAddMediaView} constructor

define([
        'require', 
        'text!media/templates/add-media.html',
        'profile/models/addmedia',
        'facade',
        'views'
        ], 
function(require, profileAddMediaTemplate) {

    var ProfileAddMediaView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    ProfileAddMediaView = SectionView.extend({

        id: 'add-media',

        template: profileAddMediaTemplate,
		
	    events: {
		   "click #addPhoto" : "openAddImagePopup"
          // "click #addVideo" : "openAddvideoPopup"
	    },
	
		
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ProfileAddMediaView expects option with model property.");
            }
			this.model.userid = options.userid;
        },

	    openAddImagePopup: function(event)
	    {
			 
             var id = $('.selected-sport-h').data('id'), url = "/api/user/addimage/" + this.model.userid,
			    attr = {
				    "sports_id" : id
			    };
		    Channel("add-image").publish(url,attr);
	    }
        
                
    });

    return ProfileAddMediaView;
});