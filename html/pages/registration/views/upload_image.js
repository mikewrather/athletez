// Upload Image View
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationUploadImageView} constructor

define([
        'require', 
        'text!registration/templates/upload_image.html', 
        'facade', 
        'views',
        'utils',
        ], 
function(require, registrationUploadImageTemplate) {

    var RegistrationUploadImageView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView;
        

    RegistrationUploadImageView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "click .next": "nextStep"
        },

        template: registrationUploadImageTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
        nextStep: function(event) {
            event.preventDefault();
            Channel("registration-select-org").publish();
        }
        
    });

    return RegistrationUploadImageView;
});