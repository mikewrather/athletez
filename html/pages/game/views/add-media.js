// Add Media View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {AddMediaView} constructor

define([
        'require', 
        'text!media/templates/add-media.html', 
        'game/models/addmedia',
        'facade', 
        'views'
        ], 
function(require, gameAddMediaTemplate) {

    var AddMediaView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    GameAddMediaView = SectionView.extend({

        id: 'add-media',

        template: gameAddMediaTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("AddMediaView expects option with model property.");
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