// Buttons View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {RegistrationPicButtonsView} constructor

define([
        'require', 
        'text!registration/templates/picture_buttons.html', 
        'vendor', 
        'facade', 
        'views',
        'utils'
        ], 
function(require, buttonsTemplate) {

    var RegistrationPicButtonsView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        BaseView = views.BaseView,
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        Mustache = vendor.Mustache;

    RegistrationPicButtonsView = BaseView.extend({

        tagName: "div",
        
        className: "picture-buttons clearfix",

        template: buttonsTemplate,
        
        // Events
        events: {
            "click .use_image": "clickUseImage",
            "click .upload_image": "clickUploadImage"
        },
        
        render: function () {
            var markup = Mustache.to_html(this.template);
            this.$el.html(markup);
                
            return this;
        },
        
        clickUseImage: function(event) {
            event.preventDefault();
            Channel("registration-use-image").publish();
        },
        
        clickUploadImage: function(event) {
            event.preventDefault();
            Channel("registration-upload-image").publish();
        }
                
    });

    return RegistrationPicButtonsView;
});