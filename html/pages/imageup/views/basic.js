// Header View
// ---------
// Package Game
// Requires `define`, `require`
// Returns {GameHeaderView} constructor

define([
        'require', 
        'text!game/templates/basic.html', 
        'facade', 
        'views'
        ], 
function(require, imageBasicTemplate) {

    var ImageBasicView,
        facade = require('facade'),
        views = require('views'),
        SectionView = views.SectionView;

	console.log("SectionView: ",SectionView);


    ImageBasicView = SectionView.extend({

        id: 'main-header',

        template: imageBasicTemplate,
        events: {
	            "click #imageup": "imageUpload",
	    },
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        imageUpload: function(event) {
            event.preventDefault();
            Channel("imageup-add-image").publish();
        }
                
    });

	console.log(ImageBasicView);

    return ImageBasicView;
});