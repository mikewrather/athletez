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
        'utils',
        'models/base',
        'jqueryui'
        ], 
function(require, findMyClubTemplate) {

    var RegistrationFindMyClubView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        BaseModel = require('models/base');
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
            "click .continue": "highSchoolView",
            "keyup #states_id": "keyupState",
            "keyup #sports_id": "keyupSport",
            "keyup #orgs_id": "keyupClub",
            "change #states_id": "changeState",
            "change #sports_id": "changeSport",
            "change #orgs_id": "changeClub"
        },
        
        states: [],
        states_id: '',
        sports: [],
        sports_id: '',
        clubs: [],
        clubs_id: '',
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("RegistrationFindMyClubView expected options.model.");
            }            
        },
        
        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options);            
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
        },
        
        keyUp: function(event) {
            switch (this.$(event.target).attr('id')) {
                case 'state': this.keyupState(event); break;
                case 'sport': this.keyupSport(event); break;
                case 'club': this.keyupClub(event); break;
            }            
        },        
        
        keyupState: function(event) {
            var self = this;
            
            var state_name = this.$('#states_id').val();
            var stateArr = [];
            
            if (state_name != '') {
                var stateList = new BaseModel();
                stateList.url = function() {
                    if (testpath)
                        return testpath + '/state_search';
                    return '/api/state/search/?state_name=' + state_name;
                }
                stateList.fetch();
                $.when(stateList.request).done(function() {
                    if (stateList.isError())
                        return;
                    var payload = stateList.get('payload');
                    if (payload == null)
                        self.$('#states_id').parent().find('.field-message').html('Data not exist').stop().fadeIn();
                    self.states = [];
                    for (var key in payload) {
                        self.states.push(payload[key]);
                    }
                    self.states.forEach(function(value, index) {
                        stateArr.push(value['name']);
                    });
                    self.$('#states_id').autocomplete({
                        source: stateArr
                    });
                });
            }
        },
        
        changeState: function(event) {
            var state_name = this.$('#states_id').val();
            var self = this;
            
            self.states_id = '';
            self.states.forEach(function(value, index) {
                if (value['name'] == state_name)
                    self.states_id = value['id'];
            });
            this.keyupClub();            
        },
        
        keyupSport: function(event) {
            var self = this;
            
            var sport_name = this.$('#sports_id').val();
            var sportArr = [];
            
            if (sport_name != '') {
                var sportList = new BaseModel();
                sportList.url = function() {
                    if (testpath)
                        return testpath + '/sport_search';
                    return '/api/sport/search/?sport_name=' + sport_name;
                }
                sportList.fetch();
                $.when(sportList.request).done(function() {
                    if (sportList.isError())
                        return;
                    var payload = sportList.get('payload');
                    if (payload == null)
                        self.$('#sports_id').parent().find('.field-message').html('Data not exist').stop().fadeIn();
                    self.sports = [];
                    for (var key in payload) {
                        self.sports.push(payload[key]);
                    }
                    self.sports.forEach(function(value, index) {
                        sportArr.push(value['sport_name']);
                    });
                    self.$('#sports_id').autocomplete({
                        source: sportArr
                    });
                });
            }
        },
        
        changeSport: function(event) {
            var sport_name = this.$('#sports_id').val();
            var self = this;
            
            self.sports_id = '';
            self.sports.forEach(function(value, index) {
                if (value['name'] == sport_name)
                    self.sports_id = value['id'];
            });
            this.keyupClub();
        },
        
        keyupClub: function(event) {
            var self = this;
            
            var club_name = this.$('#orgs_id').val();
            var clubArr = [];
            
            if (club_name != '') {
                var clubList = new BaseModel();
                clubList.url = function() {
                    if (testpath)
                        return testpath + '/club_search';
                    return '/api/org/search/?sports_club=1&states_id=' + self.states_id + '&sports_id' + self.sports_id;
                }
                clubList.fetch();
                $.when(clubList.request).done(function() {
                    if (clubList.isError())
                        return;
                    var payload = clubList.get('payload');
                    if (payload == null)
                        self.$('#orgs_id').parent().find('.field-message').html('Data not exist').stop().fadeIn();
                    self.clubs = [];
                    for (var key in payload) {
                        self.clubs.push(payload[key]);
                    }
                    self.clubs.forEach(function(value, index) {
                        clubArr.push(value['org_name']);
                    });
                    self.$('#orgs_id').autocomplete({
                        source: clubArr
                    });
                });
            }
        },
        
        changeClub: function(event) {
            var club_name = this.$('#orgs_id').val();
            var self = this;
            
            self.clubs_id = 0;
            self.clubs.forEach(function(value, index) {
                if (value['name'] == club_name)
                    self.clubs_id = value['id'];
            });            
        }
        
    });

    return RegistrationFindMyClubView;
});