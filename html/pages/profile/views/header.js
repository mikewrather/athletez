// Header View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!profile/templates/header.html', 
        'text!profile/templates/sport-select.html',
        'profile/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'profile/collections/sports',
        'profile/views/sport-list'
        ], 
function(require, headerTemplate, selectSportTemplate) {

    var HeaderView,
        facade = require('facade'),
        views = require('views'),
        BasicsModel = require('profile/models/basics'),
        SectionView = views.SectionView,
        SportListView = require('profile/views/sport-list'),
        SportList = require('profile/collections/sports'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
        _ = facade._;
        

    HeaderView = SectionView.extend({

        id: 'main-header',

        template: headerTemplate,
        
        selectSportTemplate: selectSportTemplate,
        
        events: {
            "change #select-sport": "selectSport"
        },

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);
            this.initSportList();            
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }            
        },
        
        // Child views...
        childViews: {},
        
        initSportList: function () {
            var self = this;
            this.sports = new SportList();
            this.sports.id = this.model.id;
            this.sports.fetch();
            $.when(this.sports.request).done(function() {
                self.setupSportListView();
                Channel('sports:fetch').publish();
                self.select_sport = self.$('#select-sport');
                self.selectSport();                
            });
        },
        
        setupSportListView: function() {
            var self = this,
                sportListView = new SportListView({
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
            Channel('sports:fetch').subscribe(callback);      
        },
        
        selectSport: function(event) {
            var sport_id = this.select_sport.val();
            this.$('.sport-info').stop().slideUp();
            this.$('.sport-info-' + sport_id).stop().slideDown();
            Channel('sports:select' + sport_id).publish();            
        }
        
                
    });

    return HeaderView;
});