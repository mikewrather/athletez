// Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {TeamAddMediaView} constructor

define([
        'require', 
        'text!media/templates/add-media.html', 
        'profile/models/addmedia',
        'facade', 
        'views'
        ], 
function(require, teamAddMediaTemplate) {

    var TeamAddMediaView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    TeamAddMediaView = SectionView.extend({

        id: 'add-media',

        template: teamAddMediaTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("TeamAddMediaView expects option with model property.");
            }            
        }
        
                
    });

    return TeamAddMediaView;
});