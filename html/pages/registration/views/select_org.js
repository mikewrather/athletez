// Select Registration Org View
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationSelectOrgView} constructor

define([
        'require', 
        'text!registration/templates/select_org.html', 
        'facade', 
        'views',
        'utils',
        'registration/models/my_club',
        'registration/views/find_my_club'
        ], 
function(require, registrationSelectOrgTemplate) {

    var RegistrationSelectOrgView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        $ = facade.$,
        Channel = utils.lib.Channel,
        SectionView = views.SectionView,
        RegistrationMyClubModel = require('registration/models/my_club'),
        RegistrationFindMyClubView = require('registration/views/find_my_club');
        

    RegistrationSelectOrgView = SectionView.extend({

        id: 'main-content',
        
        step: 1,
        
        events: {
            "click .find_club": "findMyClub",
            "click .high_school": "highSchoolLocator",
            "click .indiv_sports": "individualSports",
            "click .next": "nextStep"
        },

        template: registrationSelectOrgTemplate,
        
        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);                        
        },
        
        childViews: [],
        
        findMyClub: function(event) {
            event.preventDefault();

	        if (this.step != 1)
                return;
                
            var self = this;
	        if (!this.myclub) {
	            this.myclub = new RegistrationMyClubModel();
                this.myclub.fetch();
                $.when(this.myclub.request).done(function() {
                    self.setupFindMyClub();
                });
            } else {
	            this.myclub.fetch();
                this.findMyClubView.render();
                $('#' + this.findMyClubView.id).dialog({
                    width: '80%',
                    close: self.removeMyClubView
                });
            }
        },
        
        setupFindMyClub: function() {
            var self = this;
            
            this.findMyClubView = new RegistrationFindMyClubView({
                model: this.myclub
            });
            var renderMyClubView = this.addChildView(this.findMyClubView);

            this.childViews.findMyClubView = this.findMyClubView;
            this.callbacks.add(function () {
                renderMyClubView();                
            });
            
            this.findMyClubView.render();                
            this.$el.append(self.findMyClubView.el);
            $('#' + self.findMyClubView.id).dialog({
                width: '80%',
                close: self.removeMyClubView
            });
            
            function closeWindow() {
                $('#' + self.findMyClubView.id).dialog('close');
            }
            
            Channel('registration-close-clubview').subscribe(closeWindow);            
        },
        
        removeMyClubView: function() {
            
        },        
        
        highSchoolLocator: function(event) {
            event.preventDefault();
            
            if (this.step != 2)
                return;
        },
        
        individualSports: function(event) {
            event.preventDefault();
            
            if (this.step != 3)
                return;
        },
        
        nextStep: function(event) {
            event.preventDefault();
            
            if (this.step != 4)
                return;
        }
                
    });

    return RegistrationSelectOrgView;
});