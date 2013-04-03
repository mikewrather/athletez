// Video Player View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {VideoPlayerView} constructor

define([
        'require', 
        'text!media/templates/videoplayer.html', 
        'facade', 
        'views'
        ], 
function(require, videoPlayerTemplate) {

    var VideoPlayerView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView,
        _ = facade._;

    VideoPlayerView = SectionView.extend({

        id: 'videoplayer',

        template: videoPlayerTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("VideoPlayerView expects option with model property.");
            }            
        }
               
    });

    return VideoPlayerView;
});