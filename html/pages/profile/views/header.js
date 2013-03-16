// Profile Header View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {ProfileHeaderView} constructor

define([
        'require', 
        'text!profile/templates/header.html', 
        'text!profile/templates/sport-select.html',
        'user/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'user/collections/sports',
        'profile/views/sport-list'
        ], 
function(require, headerTemplate, selectSportTemplate) {

    var ProfileHeaderView,
        facade = require('facade'),
        views = require('views'),
        ProfileBasicsModel = require('user/models/basics'),
        SectionView = views.SectionView,
        ProfileSportListView = require('profile/views/sport-list'),
        ProfileSportList = require('user/collections/sports'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
        _ = facade._;
        

    ProfileHeaderView = SectionView.extend({

        id: 'profile-header',

        template: headerTemplate,
        
        selectSportTemplate: selectSportTemplate,
        
        events: {
            "change #select-sport": "selectSport"
        },

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);
            this.initSportList();            
        },
        
        initSportList: function () {
            var self = this;
            this.sports = new ProfileSportList();
            this.sports.id = this.model.id;
            this.sports.fetch();
            $.when(this.sports.request).done(function() {
                self.setupSportListView();
                Channel('profilesports:fetch').publish();
                self.select_sport = self.$('#select-sport');
                self.selectSport();                
            });
        },
        
        setupSportListView: function() {
            var self = this,
                sportListView = new ProfileSportListView({
                    collection: this.sports
                }),
                renderSportListView = this.addChildView(sportListView);

            this.childViews.sportListView = sportListView;
            this.callbacks.add(function () {
                renderSportListView();                
            });            
            
            function callback () {
                sportListView.render();
                self.$el.find('#sports-info').html(sportListView.el);
                var data = {"payload": []};
                var collection = sportListView.collection;
                if (collection.length) {
                    for (i = 0; i < collection.length; i++) {
                        data["payload"][i] = collection.at(i).get('payload');
                    }
                    var markup = Mustache.to_html(self.selectSportTemplate, data);                                
                    self.$el.find('#sports-info').prepend(markup);
                } else {
                    self.$el.find('#sports-info').html('');
                }                
            }
            Channel('profilesports:fetch').subscribe(callback);      
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("ProfileHeaderView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        },
        
        selectSport: function(event) {
            var sport_id = this.select_sport.val();
            this.$('.sport-info').stop().slideUp();
            this.$('.sport-info-' + sport_id).stop().slideDown();
            Channel('profilesports:select' + sport_id).publish();            
        }
        
                
    });

    return ProfileHeaderView;
});