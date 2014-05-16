// Image Board View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {ImageBoardView} constructor

define([
        'require', 
        'text!media/templates/image-board.html', 
        'facade', 
        'views'
        ], 
function(require, imageBoardTemplate) {

    var ImageBoardView,
        facade = require('facade'),
        views = require('views'),
        BaseView = views.BaseView,
        _ = facade._;

    ImageBoardView = BaseView.extend({

        tagName: "li",
        
        className: "image-board",

        template: imageBoardTemplate,

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ImageBoardView expected options.model.");
            }            
        },

        render: function ()
        {

            BaseView.prototype.render.call(this);            
        }
        
    });

    return ImageBoardView;
});