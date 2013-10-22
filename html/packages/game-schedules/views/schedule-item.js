// Schedule-item.js  
// -------  
// Requires `define`

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!schedules/templates/schedule-item.html',
        'text!schedules/templates/schedule-single-item.html',
        'text!schedules/templates/schedule-event-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        ScheduleItemTemplate,
        ScheduleSingleItemTemplate,
        EventItemTemplate
        ) {

    var $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      return BaseView.extend({
        tagName: "li",
        className: "org",
        events: {
            "change #select-team": "selectTeam"
        },

        initialize: function (options) {
        	//$("body").click(function(e) {
        		//e.preventDefault();
        	//	if(!$(e.target).hasClass('team-info-h') && !$(e.target).hasClass('org-popup') && $(e.target).parents('.org-popup').length === 0) {
        	//		$('.org-popup').addClass('hide');
        	//	}
        	//});
        	if(options.teamView) this.teamView = options.teamView;
        	if(options.eventView) this.eventView = options.eventView;
        },

        render: function () {
        	// var string_to_use = this.createOpponentString();
            //var markup = Mustache.to_html(this.template, {data: this.model.toJSON(), id:this.mpay.id,summary:string_to_use});
            
            if(this.teamView) {
            	 this.mpay = this.model.get('payload');
			     this.template = ScheduleSingleItemTemplate;
			     var string_to_use = this.createOpponentString();
            	 var markup = Mustache.to_html(this.template, {id:this.mpay.id,summary:string_to_use});
        	 } else if (this.eventView) {
	            this.template = EventItemTemplate;
	            var markup = Mustache.to_html(this.template, this.model.toJSON());        	 	
        	 } else {
	            this.template = ScheduleItemTemplate;
	            var markup = Mustache.to_html(this.template, this.model.toJSON());
	         }
	                        
            
            this.$el.html(markup);
            this.select_team = this.$('#select-team');
            this.selectTeam();
            return this;
        },
        
         createOpponentString: function()
	    {
		    var str = this.mpay.game_day + " | ";
		    console.log("Game info",this.mpay);
		    $.each(this.mpay.teams,function(){
				if(this.id > 0 && this.id != this.teams_id) str += " VS. " + this.org_name;
		    });
		    return str;
	    },
        
        selectTeam: function(event) {
            var team_id = this.select_team.val();
            this.$('.team-info').stop().slideUp();
            this.$('.team-info-' + team_id).stop().slideDown();
        }

      });

    return OrgItemView;
});