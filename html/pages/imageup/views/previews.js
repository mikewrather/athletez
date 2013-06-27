// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/preview_template.html', 
		"imageup/collections/previews",
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
		pcollection = require("imageup/collections/previews"),
        CollectionView = views.CollectionView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;


    PreviewBasicView = CollectionView.extend({
	
        _tagName: 'imgpreview',
		_decorator: 'imgpreview',

        template: previewBasicTemplate,
		_view:  function (options) {},
		
		collection:pcollection,

        initialize: function (options) {
            CollectionView.prototype.initialize.call(this, options);   
			debug.log("preview view");                
        }	
                
    });


    return PreviewBasicView;
});