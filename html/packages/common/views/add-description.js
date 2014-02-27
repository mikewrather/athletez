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
        	console.error(options);
        	for(var i in options) {
        		this[i] = options[i];
        	}
        	//alert(this.teamName +"------"+this.page);
        	this.initializeData();
        	this.render();
        },
        
       
        
        targetElement: function(e) {

	        console.log(e,this.page);

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

		        case 'participants':
			        console.log($(".participants-add-icons-h").find("."+$(e.target).attr("data-target")));
			        $(".participants-add-icons-h").find("."+$(e.target).attr("data-target")).trigger("click");
			        break;
        		
        		
        	}
        },
        
        
        initializeData: function() {
        
	        this.messages =  {
		        fans: {left: "Become a fan and gt notified whenever there's any activity for "+this.teamName+". Get notifications for new games or game changes, photos, videos, new team members or new messages.", "btn1": "Click here to add yourself to the fan's list and receive notifications.", btn2: "Click here to invite friends from facebook to receive notifications."},
	            media: {left: "The Photo/Video section displays all media that "+this.teamName+" is tagged in. There are currently no photos to show in this section. Use the buttons above to upload new photos or videos.", "btn1": "Click here to upload photos of this team.", "btn2": "Click here to upload videos of team."},
	            games: {"left": "The game timeline shows all of the scheduled games for this team. Each dot is a game. You can hover over the dot to get a preview, or click on the dot to go to game page. Click the 'add game' Button to add a new game to the timeline.", btn1: "Click here to add a game to this team's calendar. All team members will be notified of this new game."},
	            rosters: {"left": "This section is a team roster and it lists all registered users for "+this.teamName+". You can add yourself to this roster or invite friends from facebook who play for this team.'", btn1: "Click here to add yourself to this team's roster.'", btn2: "Click here to invite friends from facebook that play for this team."},
		        participants: {"left": "This section lists all participants competing in this event.  Click the 'Add Me' button to add yourself as a participant.", btn1: "Click here to add me as a participant in this event", btn2: "Invite a friend from facebook to participate in this event"}
	        };

		},

		btnClasses: {
			fans: {btn1: "add-to-list-h", btn2: "invite-fans-from-fb-h", mainDiv:"fans"},
			media: {btn1: "add-image-h", btn2: "add-video-h", mainDiv:"media"},
			games: {btn1: "game-adder-h", mainDiv:"games"},
			rosters: {btn1: "add-to-roster-list-h", btn2: "invite-roster-from-fb-h", mainDiv:"roster"},
			participants: {btn1: "add-to-participants-list-h", btn2: "invite-participant-from-fb-h", mainDiv:"participants"}
		},

        render: function () {
        	var _self = this, data = {};
        	data.message = this.messages[this.page];
        	data.className = this.btnClasses[this.page];
        	data.page = this.page;
        	var _self = this, markup = Mustache.to_html(addDescriptionTemplate, {data: data});

	        console.log(markup);
            
            if($(this.target).is("ul")) {
            	setTimeout(function(){
            		var $parent = $(_self.target).parent();
            		$(_self.target).replaceWith("<div></div>");
            		_self.$el.html(markup);
        			_self.el = _self.$el;
            $parent.html(_self.$el);
            

            	}, 500);
            } else {
            
            
	            this.$el.html(markup);
	            this.el = this.$el;

		        console.log(this.el);

	            this.target.html(this.$el);
            }
        }
    });

    return AddImageView;
});