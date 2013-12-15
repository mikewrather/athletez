// Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {ProfileAddMediaView} constructor

define([
        'require', 
        'text!media/templates/add-media.html',
		'application',
		'profile/models/addmedia',
        'facade',
        'views'
        ], 
function(require, profileAddMediaTemplate,application) {

    var ProfileAddMediaView,
        facade = require('facade'),
        views = require('views'),
		
        SectionView = views.SectionView,
        _ = facade._;

    ProfileAddMediaView = SectionView.extend({

        id: 'add-media',
		tagName: "ul",
        template: profileAddMediaTemplate,
		
	    events: {
		   "click #addPhoto" : "openAddImagePopup",
           "click #addVideo" : "openAddvideoPopup",
           "click #addGame" : "openAddGamePopup"
	    },
	
		
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ProfileAddMediaView expects option with model property.");
            }
			this.model.userid = options.userid;
        },
        
        openAddGamePopup: function() {
	        ga('send', 'event', 'Open-Add-Popup', 'Game', 'User opened game adder', this.model.userid);
        	routing.trigger('add-game', this.model.userid);
        },

	    openAddImagePopup: function(event)
	    {
		    ga('send', 'event', 'Open-Add-Popup', 'Image', 'User opened image uploader', this.model.userid);
             var id = $('.selected-sport-h').data('id'), url = "/api/user/addimage/" + this.model.userid,
                url = "/api/user/addimage/" + this.model.userid,
			    attr = {
				    "sports_id" : id
			    };
			
			routing.trigger('add-image', url, attr);
		    //Channel("add-image").publish(url,attr);
	    },
		openAddvideoPopup: function(event){
			
			//** firing the call back list

			ga('send', 'event', 'Open-Add-Popup', 'Video', 'User opened video uploader', this.model.userid);
			var url = "/api/user/addvideo/" + this.model.userid;
			
			Channel('add-video').publish(url);
			
		}
        
                
    });

    return ProfileAddMediaView;
});