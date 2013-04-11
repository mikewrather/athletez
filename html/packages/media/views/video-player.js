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
        BaseView = views.BaseView,
        _ = facade._;

    VideoPlayerView = BaseView.extend({

        tagName: "li",
        
        className: "video-player",

        template: videoPlayerTemplate,

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("VideoPlayerView expected options.model.");
            }            
        },

        render: function () {
            BaseView.prototype.render.call(this);            
        }
        
    });

    return VideoPlayerView;
});