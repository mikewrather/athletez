// Profile Header View
// ---------
// (chrome) header with form to create todos

// Package Profile
// Requires `define`, `require`
// Returns {ProfileHeaderView} constructor

define([
        'require', 
        'text!profile/templates/header.html', 
        'profile/models/header',
        'facade', 
        'views'
        ], 
function(require, headerTemplate) {

    var ProfileHeaderView,
        facade = require('facade'),
        views = require('views'),
        ProfileHeaderModel = require('profile/models/header'),
        SectionView = views.SectionView,
        _ = facade._;

    ProfileHeaderView = SectionView.extend({

        id: 'profile-header',

        template: headerTemplate,
        
        events: {
            "change #select-sport": "selectSport"
        },

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
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
            this.select_sport = this.$('#select-sport');
            this.selectSport();
        },
        
        selectSport: function(event) {
            var sport_id = this.select_sport.val();
            this.$('.sport-info').stop().slideUp();
            this.$('.sport-info-' + sport_id).stop().slideDown();
        }
        
                
    });

    return ProfileHeaderView;
});