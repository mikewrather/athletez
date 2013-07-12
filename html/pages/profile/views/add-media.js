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
	            "click a": "mediaUploadClick"
	    },
		
		mediaUploadClick: function (event) {
			var url="/api/user/addimage/1";
			var attr={};
			if(event.currentTarget.innerHTML=="Photo")
			  Channel("add-image").publish(url,attr);
		},
		
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ProfileAddMediaView expects option with model property.");
            }            
        }
        
                
    });

    return ProfileAddMediaView;
});