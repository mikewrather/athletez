// Select Registration Type View
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationSelectTypeView} constructor

define([
        'require', 
        'text!registration/templates/select_type.html', 
        'facade', 
        'views',
        'utils',
        ], 
function(require, registrationSelectTypeTemplate) {

    var RegistrationSelectTypeView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView;
        

    RegistrationSelectTypeView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "click .register_facebook": "registerWithFacebook",
            "click .register_email": "registerWithEmail"
        },

        template: registrationSelectTypeTemplate,
        
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

    return RegistrationSelectTypeView;
});