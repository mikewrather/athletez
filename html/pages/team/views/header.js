// Header View
// ---------
// Package Team
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!team/templates/header.html', 
        'text!team/templates/sport-select.html',
        
        'team/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'team/collections/sports',
        'team/views/sport-list',
        'team/collections/seasonteams',
        'team/collections/complevels'
        
        ], 
function(require, headerTemplate, selectSportTemplate) {

    var TeamHeaderView,
        facade = require('facade'),
        views = require('views'),
        TeamBasicsModel = require('team/models/basics'),
        SectionView = views.SectionView,
        TeamSportListView = require('team/views/sport-list'),
        TeamSportList = require('team/collections/sports'),
         
		SeasonTeams = require('team/collections/seasonteams'),
        CompLevels = require('team/collections/complevels'),
        
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
        _ = facade._;
        

    TeamHeaderView = SectionView.extend({

        template: headerTemplate,
        
        selectSportTemplate: selectSportTemplate,
        
        events: {
            "change .sports-h": "getComplevels",
            "change .team-h": "getSeason"
        },

        initialize: function (options) {
        	console.log(options);
            SectionView.prototype.initialize.call(this, options);
            this.initSportList();   
                   
        },
        
         selectSport: function(event) {
        	self.select_sport = self.$('#select-sport');
            var sport_id = this.select_sport.val();
            //this.$('.sport-info').stop().slideUp();
            //this.$('.sport-info-' + sport_id).stop().slideDown();
            //Channel('teamsports:select' + sport_id).publish();            
        },
        
        getSeason: function() {
        	 var self = this;
            this.season = new SeasonTeams();
            this.season.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.season.sport_id = $(".sports-h").val();
            this.season.complevel_id = $(".complevels-h").val();
            
            this.season.fetch();
            $.when(this.season.request).done(function() {
               
               console.error(self.season.toJSON());
               //self.insertOption($(".season-h"), self.season.toJSON());
               var html = '', data = self.season.toJSON(), len = data.length;
	        	for(var i = 0; i < len; i++) {
	        		html += '<option value="'+data[i].payload.id+'">'+data[i].payload.team_name+'</option>;'
	        	}
	        	$(".team-h").html(html);
	        	
	        	// get all team page data by triggring the vent
	        	self.showAllTeamData();
	        	
              // self.getSeasons();
               // self.setupSportListView();
                //Channel('teamsports:fetch').publish();
                
                //self.selectSport();
            });
        },
        
        showAllTeamData: function() {
        	routing.trigger('refresh-teampage', $(".sports-h").val(), $(".team-h").val());
        },
        
        getComplevels: function() {
        	 var self = this;
            this.complevel = new CompLevels();
            this.complevel.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.complevel.sport_id = $(".sports-h").val();
            this.complevel.fetch();
            $.when(this.complevel.request).done(function() {
               console.error(self.complevel.toJSON());
                var html = '', data = self.complevel.toJSON(), len = data.length;
	        	for(var i = 0; i < len; i++) {
	        		html += '<option value="'+data[i].payload.complevel_id+'">'+data[i].payload.complevel_name+'</option>;'
	        	}
	        	$(".season-h").html(html);
                self.getSeason();
               // self.setupSportListView();
                //Channel('teamsports:fetch').publish();
                
                //self.selectSport();
            });
        },
        
        initSportList: function () {
            var self = this;
            this.sports = new TeamSportList();
            this.sports.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.sports.fetch();
            $.when(this.sports.request).done(function() {
               
               console.error(self.sports.toJSON());
               var html = '', data = self.sports.toJSON(), len = data.length;
	        	for(var i = 0; i < len; i++) {
	        		html += '<option value="'+data[i].payload.sport_id+'">'+data[i].payload.sport_name+'</option>;'
	        	}
	        	$(".sports-h").html(html);
               
               //self.insertOption($(".sports-h"), self.sports.toJSON());
               self.getComplevels();
               // self.setupSportListView();
                //Channel('teamsports:fetch').publish();
                
                //self.selectSport();
            });
        },
        
        
        insertOption: function($target, data) {
        	var html = '', len = data.length;
        	for(var i = 0; i < len; i++) {
        		html += '<option value="'+data[i].payload.sport_id+'">'+data[i].payload.sport_name+'</option>;'
        	}
        	$target.html(html);
        },
        
        
        setupSportListView: function() {
            var self = this,
                sportListView = new TeamSportListView({
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
            Channel('teamsports:fetch').subscribe(callback);      
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
        	//this.initVoteView();  
        },
        
       
        
                
    });

    return TeamHeaderView;
});