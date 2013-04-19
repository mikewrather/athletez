// Register with Email Address
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationEmailView} constructor

define([
        'require', 
        'text!registration/templates/register_email.html', 
        'facade', 
        'views',
        'utils',
        ], 
function(require, registrationEmailTemplate) {

    var RegistrationEmailView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView;
        

    RegistrationEmailView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "click .register_facebook": "registerWithFacebook",
            "click .register_email": "registerWithEmail"
        },

        template: registrationEmailTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
        registerWithFacebook: function() {                                
            Channel('registration-with-facebook').publish();
            return false;
        },
        
        registerWithEmail: function() {                                
            Channel('registration-with-email').publish();
            return false;
        }
                
    });

    return RegistrationEmailView;
});