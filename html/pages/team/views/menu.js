// Menu View
// ---------
// Package Team
// Requires `define`, `require`
// Returns {MenuView} constructor

define([
        'require', 
        'text!team/templates/menu.html', 
        'text!team/templates/sport-select.html',
        
        'team/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'team/collections/sports',
        'team/views/sport-list',
        'usercontrol/dropdown/view/dropdown',
        'team/collections/seasonteams',
        'team/collections/complevels'
        ], 
function(require, headerTemplate, selectSportTemplate) {

    var facade = require('facade'),
        views = require('views'),
        TeamBasicsModel = require('team/models/basics'),
        SectionView = views.SectionView,
        TeamSportListView = require('team/views/sport-list'),
        TeamSportList = require('team/collections/sports'),
        DropDownList = require('usercontrol/dropdown/view/dropdown'), 
		SeasonTeams = require('team/collections/seasonteams'),
        CompLevels = require('team/collections/complevels'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
        _ = facade._;
        

    return  SectionView.extend({
        template: headerTemplate,
        selectSportTemplate: selectSportTemplate,
        
        events: {
        },

        initialize: function (options) {
        	this.headerView = options.headerView;
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
        
        // update header data
        updateHeaderData: function(id) {
        	if(this.model.id != id) {
        		this.headerView.updateHeaderData(id);
        	}
        	//var _self = this;
        	//if(_self.model.id != id) {
	        //	_self.model.id = id;
	        //	_self.model.fetch();
	        //	$.when(_self.model.request).done(function() {
	        		//_self.render();
	        		//_self.initSportList();
	        //	});
        	//}
        },
        
        getTeam: function() {
        	 var self = this;
            this.season = new SeasonTeams();
            this.season.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.season.sport_id = $("#sports-h").val();
            this.season.complevel_id = $("#season-h").val();
            this.season.fetch();
            
            $.when(this.season.request).done(function() {
                var data = {};
               data.records = self.season.toJSON();
               data.recordId = 'id';
			   data.recordValue = 'season_label';
               var DropDown = new DropDownList({
					data: data,
					title: "Team",
					elementId: "team-h",
					destination: '.team-h',
					selectedValue: self.model.id,
					targetView: self,
					callback: function(result) {
						self.updateHeaderData($("#team-h").val());
						self.showAllTeamData();
					}
				});
            });
        },
        
        showAllTeamData: function() {
        	routing.trigger('refresh-teampage', $("#sports-h").val(), $("#team-h").val(), this.season.id);
        },
        
        getComplevels: function() {
        	 var self = this;
            this.complevel = new CompLevels();
            this.complevel.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.complevel.sport_id = $("#sports-h").val();
            this.complevel.fetch();
            $.when(this.complevel.request).done(function() {
               var data = {};
               data.records = self.complevel.toJSON();
               data.recordId = 'complevel_id';
			   data.recordValue = 'complevel_name';
               var DropDown = new DropDownList({
					data: data,
					title: "Season",
					elementId: "season-h",
					destination: '.season-h',
					selectedValue: self.model.get("payload").complevels_obj.complevel_id,
					targetView: self,
					callback: function(result) {
						self.getTeam();
					}
				});
            });
        },
        
        initSportList: function () {       	
            var self = this;
            this.sports = new TeamSportList();
            this.sports.id = this.model.get("payload").org_sport_link_obj.orgs_id;
            this.sports.fetch();
            $.when(this.sports.request).done(function() {
               var data = {};
               data.records = self.sports.toJSON();
               data.recordId = 'sport_id';
			   data.recordValue = 'sport_name';
               var DropDown = new DropDownList({
					data: data,
					elementId: "sports-h",
					title: "Sport",
					selectedValue: self.model.get("payload").org_sport_link_obj.sports_id,
					destination: '.sports-h',
					targetView: self,
					callback: function(result) {
						self.getComplevels();
					}
				});
             });
        },
        
        
        insertOption: function($target, data) {
        	var html = '', len = data.length;
        	for(var i = 0; i < len; i++) {
        		html += '<option value="'+data[i].payload.sport_id+'">'+data[i].payload.sport_name+'</option>';
        	}
        	$target.html(html);
        },
        
        
        setupSportListView: function() {
            var self = this,

                sportListView = new TeamSportListView({
                    collection: this.sports
                }),
                renderSportListView = this.addChildView(sportListView);

	    //    console.log("SPORTS LIST",this.sports);

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
        }         
    });
});