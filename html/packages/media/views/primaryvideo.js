// Primary Video View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {PrimaryVideoView} constructor

define([
        'require', 
        'text!media/templates/primaryvideo.html', 
        'facade', 
        'views'
        ], 
function(require, primaryVideoTemplate) {

    var PrimaryVideoView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView;

    PrimaryVideoView = SectionView.extend({

        id: 'primaryvideo',

        template: primaryVideoTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("PrimaryVideoView expects option with model property.");
            }            
        }        
                
    });

    return PrimaryVideoView;
});