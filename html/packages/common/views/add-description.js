// Add Image View
// ---------
// Input form to add image

// Package Media
// Requires define
// Returns {AddImageView} constructor

define([
        'require', 
        "text!common/templates/add-description.html",
        'facade', 
        'views',
        ], function(require, addDescriptionTemplate) {

    var AddImageView,
        facade = require('facade'),
        views = require('views'),
        addView = facade.Backbone.View.extend({}),
        BaseView = views.BaseView;

    AddImageView = BaseView.extend({
        className: "", 
         events: {
        	 "click .btn1": "targetElement",
        	 "click .btn2": "targetElement"        	       	
        },       
        initialize: function(options) {
        	//console.error(options);
        	for(var i in options) {
        		this[i] = options[i];
        	}
        	this.render();
        },
        
       
        
        targetElement: function(e) {
        	switch(this.page) {
        		case 'fans':
        			$(".fans-add-icons-h").find("."+$(e.target).attr("data-target")).trigger("click");
        		break;
        		
        		case 'media':
        			$(".media-add-icons-h").find("."+$(e.target).attr("data-target")).trigger("click");
        		break;
        		
        		case 'games':
        			$(".media-add-icons-h").find("."+$(e.target).attr("data-target")).trigger("click");        		
        		break;
        		
        		case 'rosters':
        			$(e.target).parents("#roster-wrap").find("."+$(e.target).attr("data-target")).trigger("click");        		
        		break;
        		
        		
        	}
        },
        
        
        messages: {fans: {left: "Become a fan and gt notified whenever there's any activity for Crossroads School Varsity Baseketball 2014. Get notifications for new games or game changes, photos, videos, new team members or new messages.", "btn1": "Click here to add yourself to the fan's list and receive notifications.", btn2: "Click here to invite friends from facebook to receive notifications."},
        media: {left: "The Photo/Video section displays all media that Crossroads School Varsity Basketball Academic year'14 is tagged in. There are currently no photos to show in this section. Use the buttons above to upload new photos or videos.", "btn1": "Click here to upload photos of this team.", "btn2": "Click here to upload videos of team."},
        games: {"left": "The game timeline shows all of the scheduled games for this team. Each dot is a game. You can hover over the dot to get a preview, or click on the dot to go to game page. Click the 'add game' Button to add a new game to the timeline.", btn1: "Click here to add a game to this team's calendar. All team members will be notified of this new game."},
        rosters: {"left": "This section is a team roster and it lists all registered users for Crossroads school varsity Academin year'14. You can add yourself to this roster or invite friends from facebook who play for this team.'", btn1: "Click here to add yourself to this team's roster.'", btn2: "Click here to invite friends from facebook that play for this team."}},

		btnClasses: {
			fans: {btn1: "add-to-list-h", btn2: "invite-fans-from-fb-h"},
			media: {btn1: "add-image-h", btn2: "add-video-h"},
			games: {btn1: "game-adder-h"},
			rosters: {btn1: "add-to-roster-list-h", btn2: "invite-roster-from-fb-h"}
		},

        render: function () {
        	var data = {};
        	data.message = this.messages[this.page];
        	data.className = this.btnClasses[this.page];
        	data.page = this.page;
        	var _self = this, markup = Mustache.to_html(addDescriptionTemplate, {data: data});
        	
        	//if(this.target.parent("ul")) {
            //	this.target.parent("ul").remove();
            //}
        	this.$el.html(markup);
        	this.el = this.$el;
            this.target.html(this.$el);
            
           // return this.el;
        }
    });

    return AddImageView;
});