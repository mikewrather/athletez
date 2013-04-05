// Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {AddMediaView} constructor

define([
        'require', 
        'text!media/templates/add-media.html', 
        'profile/models/addmedia',
        'facade', 
        'views'
        ], 
function(require, addMediaTemplate) {

    var AddMediaView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    AddMediaView = SectionView.extend({

        id: 'add-media',

        template: addMediaTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("AddMediaView expects option with model property.");
            }            
        }
        
                
    });

    return AddMediaView;
});