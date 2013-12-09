// Header View
// ---------
// Package Profile
// Requires `define`, `require`
// Returns {HeaderView} constructor

define([
        'require', 
        'text!profile/templates/header.html', 
        'text!profile/templates/sports.html',
        'profile/models/basics',
        'facade', 
        'views',
        'utils',
        'vendor',
        'profile/collections/sports',
        'profile/views/sport-list',
        "utils/storage",
        "media/views/image-item"
        ],
function(require, profileHeaderTemplate, selectSportTemplate) {

    var ProfileHeaderView,
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
        Store = require("utils/storage"),
        ImageItem = require("media/views/image-item"),
        $ = facade.$;
        

    ProfileHeaderView = SectionView.extend({

        id: 'main-header',

        template: profileHeaderTemplate,
        
        selectSportTemplate: selectSportTemplate,
        
        events: {
            //"change #select-sport": "selectSport",
            'click .sports-icon-h' : 'selectSport'
        },

        initialize: function (options) {
            SectionView.prototype.initialize.call(this, options);
	        this.sports_id = options.sports_id; //we have to set the sports_id because if somebody comes back to the profile page we don't need to reload everything.
            this.initSportList();            
        },
        
        initSportList: function () {
            var self = this;
            this.sports = new SportList();
            this.sports.id = this.model.id;
            this.sports.fetch();
            $.when(this.sports.request).done(function() {
                self.setupSportListView();
	            console.log(self.sports);
	            self.selectSport(); //this will signify it's the first viewing of the profile page.
            });
        },
        
        setupSportListView: function() {

            var self = this,
                sportListView = new SportListView({
                    collection: this.sports
                }),
                renderSportListView = this.addChildView(sportListView);

	        console.log("SPORTS LIST VIEW",sportListView.el);



	        this.childViews.sportListView = sportListView;
            this.callbacks.add(function () {
                renderSportListView();                
            });
            
            self.$el.find('#sports-info').html(sportListView.el);
            var data = {"payload": []};
            var collection = sportListView.collection;
            if (collection.length)
            {
                for (i = 0; i < collection.length; i++) {
                    data["payload"][i] = collection.at(i).get('payload');
                }
                var markup = Mustache.to_html(self.selectSportTemplate, data);                                
                //self.$el.find('#sports-info').prepend(markup);
                self.$el.find('.sports-h').html(markup);
            } else {
                self.$el.find('#sports-info').html('');
            }                
            sportListView.render();
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
            // render image for image item view
            this.renderImage();
        },
        
        renderImage: function() {
        	this.headerImage = new ImageItem({
        		model: this.model
        	});
        	
        	this.headerImage.render();
        	this.$el.find(".image-outer-h").html(this.headerImage.$el);
        },
        
        // get user name by id
        getUserName: function() {
        	return this.model.get("payload").label;
        },
        
        selectSport: function(e) {
            var sport_id = (!e)?((this.sports_id)?this.sports_id:$(".sports-h img:first-child").data("id")):$(e.target).data("id");
            var sport_name = (!e)?$(".sports-h img:first-child").data("name"):$(e.target).data("name");
	        ga('send', 'event', 'Profile-Action', 'Sport-Change', sport_name, sport_id);
            //this.select_sport.val();
            $(".sports-icon-h.selected-sport-h").each(function(){
	            console.log(this);
	            var srcNoExt = String($(this).attr('src')).split("_selected.png")[0];
	            srcNoExt = srcNoExt.split('.png')[0] + ".png";
	            $(this).attr('src',srcNoExt).removeClass("selected-sport-h");
            });
            
            $(".sports-icon-h[data-id="+sport_id+"]").addClass('selected-sport-h');
	        var srcNoExt = String($(".sports-icon-h[data-id="+sport_id+"]").attr('src')).split(".png")[0] + "_selected.png";
	        $(".sports-icon-h[data-id="+sport_id+"]").attr('src',srcNoExt);

            var title = this.getUserName();
            
            if(sport_id) {
            	title += " | "+ sport_name;
	            this.$('.sport-info').stop().slideUp();
	            this.$('.sport-info-' + sport_id).stop().slideDown();
	            routing.trigger("showTwmList", sport_id);
	            //Channel('gamesports:select' + sport_id).publish();            
        	} else {
        	//	Channel('refresh-profilepage').publish();
        	}
        	
        	//if(this.loadFirstTime) {
				// creating URL for sport
				var currentHashUrl = window.location.hash;
				if(currentHashUrl.match(/\/sport\/(.*)[0-9]\//i)) {
					currentHashUrl = currentHashUrl.replace(/\/sport\/(.*)[0-9]\//i,'/sport/'+sport_id+"/");					
				} else if(currentHashUrl.match(/\/sport\/(.*)[0-9]/i)) {
					currentHashUrl = currentHashUrl.replace(/\/sport\/(.*)[0-9]/i,'/sport/'+sport_id);					
				} else {
					currentHashUrl = currentHashUrl+"/sport/"+sport_id;
				}
				routing.navigate(currentHashUrl, {trigger: false});
			//} else
			//	this.loadFirstTime = true;
        	
        	
        	document.title = title;
        }
        
                
    });

    return ProfileHeaderView;
});