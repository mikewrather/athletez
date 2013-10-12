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
        'usercontrol/dropdown/view/dropdown',
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
        DropDownList = require('usercontrol/dropdown/view/dropdown'), 
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
        },

        initialize: function (options) {
            this.controllerObject = options.controllerObject;
            SectionView.prototype.initialize.call(this, options);
            _.bindAll(this);
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
        	var _self = this;
        	if(_self.model.id != id) {
	        	_self.model.id = id;
	        	_self.model.fetch();
	        	$.when(_self.model.request).done(function() {
	        		_self.render();
	        		var payload = _self.model.get("payload"), id = payload.id,
		 			name = payload.org_sport_link_obj.org.name;
	        		_self.controllerObject.setupRosterView(id, name);
	        	});
        	}
        },
        
        
        showAllTeamData: function() {
        	routing.trigger('refresh-teampage', $("#sports-h").val(), $("#team-h").val(), this.season.id);
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
        
        // get user name by id
        getName: function() {
        	console.error(this.model.get("payload"));
        	var title = this.model.get("payload").org_name;
        	
        	if(this.model.get("payload").complevels_obj.complevel_name)
	        	title += " | "+ this.model.get("payload").complevels_obj.complevel_name;
	        	
	        if(this.model.get("payload").org_sport_link_obj.sport.sport_name)
	        	title += " | "+ this.model.get("payload").org_sport_link_obj.sport.sport_name;	
	        	
	        if(this.model.get("payload").seasons_obj.season_name)
	        	title += " | "+ this.model.get("payload").seasons_obj.season_name;
	        	
	       if(this.model.get("payload").year)
	        	title += " | "+ this.model.get("payload").year;	
	        	
	       return title; 	
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
        	document.title = this.getName();
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        },
        
       
        
                
    });

    return TeamHeaderView;
});