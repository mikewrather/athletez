// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/preview_template.html', 
        'facade', 
        'views',
        'utils',
        'vendor'
        ], 
function(require, previewBasicTemplate) {

    var PreviewBasicView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        SectionView = views.SectionView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;


    PreviewBasicView = SectionView.extend({
	
        id: 'imgpreview',

        template: previewBasicTemplate,
		events: {
	            "click .rotate": "imageRotate"
	    },
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);   
			debug.log("preview view");     
			this.degree=0;       
        },	
		imageRotate: function (event) {
			this.degree=this.degree+90;
			id=event.currentTarget.id;
			val=event.currentTarget.value;
			if(this.degree>360)  this.degree=0;
			$("#"+id).css({
			                        '-webkit-transform': 'rotate(' + this.degree + 'deg)',
			                        '-moz-transform': 'rotate(' + this.degree + 'deg)',
			                        '-ms-transform': 'rotate(' + this.degree + 'deg)',
			                        '-o-transform': 'rotate(' + this.degree + 'deg)',
			                        'transform': 'rotate(' + this.degree + 'deg)',
			                        'zoom': 1
			           });
			$("#"+val+"rotang").val(this.degree)
		}
                
    });


    return PreviewBasicView;
});