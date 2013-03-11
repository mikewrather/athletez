// Profile Primary Video View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {ProfilePrimaryVideoView} constructor

define([
        'require', 
        'text!profile/templates/primaryvideo.html', 
        'profile/models/primaryvideo',
        'facade', 
        'views'
        ], 
function(require, primaryVideoTemplate) {

    var ProfilePrimaryVideoView,
        facade = require('facade'),
        views = require('views'),
        ProfileHeaderModel = require('profile/models/header'),
        SectionView = views.SectionView,
        _ = facade._;

    ProfilePrimaryVideoView = SectionView.extend({

        id: 'profile-primaryvideo',

        template: primaryVideoTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ProfilePrimaryVideoView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
        },
        
        
                
    });

    return ProfilePrimaryVideoView;
});