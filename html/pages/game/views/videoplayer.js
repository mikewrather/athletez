// Game Video Player View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {GameVideoPlayerView} constructor

define([
        'require', 
        'text!game/templates/videoplayer.html', 
        'game/models/videoplayer',
        'facade', 
        'views'
        ], 
function(require, videoPlayerTemplate) {

    var GameVideoPlayerView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    GameVideoPlayerView = SectionView.extend({

        id: 'game-videoplayer',

        template: videoPlayerTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("GameVideoPlayerView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
        }
        
        
                
    });

    return GameVideoPlayerView;
});