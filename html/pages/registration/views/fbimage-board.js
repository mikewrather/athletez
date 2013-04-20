// Facebook Image Board View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {RegistrationFBImageBoardView} constructor

define([
        'require', 
        'text!registration/templates/fbimage-board.html', 
        'facade', 
        'views',
        'utils',
        'jquery.imgareaselect'
        ], 
function(require, imageBoardTemplate) {

    var RegistrationFBImageBoardView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        BaseView = views.BaseView,
        _ = facade._,
        Channel = utils.lib.Channel;

    RegistrationFBImageBoardView = BaseView.extend({

        tagName: "li",
        
        className: "image-board",

        template: imageBoardTemplate,
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ImageBoardView expected options.model.");
            }            
        },

        render: function () {
            var self = this;
            
            BaseView.prototype.render.call(this);            
        },
        
        selectArea: function(img, selection) {
            $('#x1').val(selection.x1);
            $('#y1').val(selection.y1);
            $('#x2').val(selection.x2);
            $('#y2').val(selection.y2);
            $('#w').val(selection.width);
            $('#h').val(selection.height);
        },
        
        initCropView: function() {
            $('#image-select').imgAreaSelect({ aspectRatio: '1:1', handles: true, onSelectChange: this.selectArea });            
        },
        
        removeCropView: function() {
            $('#image-select').imgAreaSelect({remove: true});
        }
        
    });

    return RegistrationFBImageBoardView;
});