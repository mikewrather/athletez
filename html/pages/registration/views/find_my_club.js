// Find My Club View
// ---------
// Package Media
// Requires `define`, `require`
// Returns {RegistrationFindMyClubView} constructor

define([
        'require', 
        'text!registration/templates/find_my_club.html', 
        'facade', 
        'views',
        'utils'
        ], 
function(require, findMyClubTemplate) {

    var RegistrationFindMyClubView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        BaseView = views.BaseView,
        _ = facade._,
        $ = facade.$,
        Channel = utils.lib.Channel;

    RegistrationFindMyClubView = BaseView.extend({

        id: "find-my-club",
        
        tagName: "div",
        
        className: "find-my-club",

        template: findMyClubTemplate,
        
        events: {
            "click .back": "closeView",
            "click .not-find": "notFind",
            "click .continue": "highSchoolView"
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("RegistrationFindMyClubView expected options.model.");
            }            
        },

        render: function () {
            var self = this;
            
            BaseView.prototype.render.call(this);            
        },
        
        closeView: function(event) {
            event.preventDefault();
            Channel('registration-close-clubview').publish();
        },
        
        notFind: function(event) {
            event.preventDefault();
        },
        
        highSchoolView: function(event) {
            event.preventDefault();
        }
        
    });

    return RegistrationFindMyClubView;
});