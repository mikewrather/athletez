// Profile Add Media View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {ProfileAddMediaView} constructor

define([
        'require', 
        'text!game/templates/add-media.html', 
        'game/models/addmedia',
        'facade', 
        'views'
        ], 
function(require, addMediaTemplate) {

    var GameAddMediaView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    GameAddMediaView = SectionView.extend({

        id: 'add-media',

        template: addMediaTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("GameAddMediaView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
        }
        
        
                
    });

    return GameAddMediaView;
});