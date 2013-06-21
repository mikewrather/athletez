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
        'jqueryui',
        'registration/collections/states',
        'registration/collections/sports'
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
        Channel = utils.lib.Channel,
        RegistrationStatesCollection = require('registration/collections/states'),
        RegistrationSportsCollection = require('registration/collections/sports');;

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
            "blur #states_id": "changeState",
            "blur #sports_id": "changeSport",
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
            
            var state = this.$('#states_id').val();
            var stateArr = [];
            
            if (state != '') {
                var stateList = new RegistrationStatesCollection();
                stateList.state_name = state;
                stateList.fetch();
                $.when(stateList.request).done(function() {
                	/*Don't Show Auto Complete In Case Of Error*/
                    if (stateList.isError())
                        return;
                    
                    var models = stateList.toJSON();
                    if (models == null  || models.length < 1)
                        self.$('#states_id').parent().find('.field-message').html('Data not exist').stop().fadeIn();
                    
                    self.states = [];
                    for (var key in models) {
                        self.states.push(models[key].payload);
                    }
                    debug.log("self.states", self.states);
                    self.states.forEach(function(value, index) {
                        stateArr.push(value['name']);
                    });
                    debug.log("stateArr",stateArr);
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

                if (value['name'] == state_name){
	                self.states_id = value['id'];
                }

            });
            this.keyupClub();            
        },
        /*Auto Complete For Sports Text Box*/        
        keyupSport: function(event) {
            var self = this;
            var user_model = self.model;
	        var gender = 'all';
	        if (user_model.get("payload")['gender']){
		        gender = user_model.get("payload")['gender'];
	        }
			var sport_name = this.$('#sports_id').val();
            var sportArr = [];
            
            if (sport_name != '') {
                var sportList = new RegistrationSportsCollection();
                sportList.sport_name = sport_name;
                sportList.gender = gender;
                sportList.fetch();
                $.when(sportList.request).done(function() {
                    if (sportList.isError())
                        return;
                    var models = sportList.toJSON();
                    console.log("Sports Model", models);
                    if (models == null  || models.length < 1)
                        self.$('#sports_id').parent().find('.field-message').html('Data not exist').stop().fadeIn();
                    self.sports = [];
                    
                    for (var key in models) {
                        self.sports.push(models[key].payload);
                    }
                    console.log("sports", self.sports);
                    self.sports.forEach(function(value, index) {
                        sportArr.push(value['sport_name']);
                    });
                    console.log("sportArr", sportArr);
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
                if (value['sport_name'] == sport_name){
                    self.sports_id = value['sport_id'];
                }
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
                    return '/api/org/search/?sports_club=1&states_id=' + self.states_id + '&sports_id=' + self.sports_id + '&org_name=' + club_name;
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