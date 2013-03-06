// Header View
// ---------
// (chrome) header with form to create todos

// Package Todos
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!profile/templates/header.html', 
        'profile/models/user',
        'facade', 
        'views'
        ], 
function(require, headerTemplate) {

    var ProfileHeaderView,
        facade = require('facade'),
        views = require('views'),
        ProfileUserModel = require('profile/models/user'),
        SectionView = views.SectionView,
        _ = facade._;

    ProfileHeaderView = SectionView.extend({

        id: 'profile-header',

        template: headerTemplate,

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
                
    });

    return ProfileHeaderView;
});