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
	        console.log(options);
	        if(options.model) if(options.model.collection) this.teams_id = options.model.collection.id;
        	if(options.teamView) this.teamView = options.teamView;
        	if(options.eventView) this.eventView = options.eventView;
        },

        render: function () {
        	// var string_to_use = this.createOpponentString();
            //var markup = Mustache.to_html(this.template, {data: this.model.toJSON(), id:this.mpay.id,summary:string_to_use});
            
            if(this.teamView) {
            	 this.mpay = this.model.get('payload');
			     this.template = ScheduleSingleItemTemplate;
            	 var markup = Mustache.to_html(this.template, {payload:this.mpay,teams_id:this.teams_id});
	             $(this.el).attr('data-team-id',this.teams_id);
        	 } else if (this.eventView && this.eventView != '') {
	            delete this.teams_id;
	            this.template = EventItemTemplate;
	            var markup = Mustache.to_html(this.template, this.model.toJSON());        	 	
        	 } else {
	            delete this.teams_id;
	            this.template = ScheduleItemTemplate;
	            var markup = Mustache.to_html(this.template, this.model.toJSON());
	         }

            this.$el.html(markup);

            this.select_team = this.$('#select-team');
	        console.log(this.select_team);
            this.selectTeam();

	        this.setWins();
            return this;
        },

	      setWins: function () {
		      var team_id = this.teams_id != undefined ? this.teams_id : $(this.el).find('div.org-name a.add-game-h').attr('data-team-id'),
			      self = this;

		      console.log(team_id);
		      var $loopEls = $(this.el).attr("data-team-id") ? $(this.el) : $(this.el).find('ul li');
		      console.log("Loop",$loopEls);
		      $loopEls.each(function () {
			      console.log(this);
			 //     console.log($(this).find('span.team-name[data-team-id="' + team_id + '"][data-winner="true"]').length);
			      if($(this).find('span.team-name[data-team-id="' + team_id + '"][data-winner="true"]').length){
				     $(this).find('a.team-info-h').addClass('win').removeClass('background-blue');
			      }
			      if(!$(this).find('span.team-name[data-winner="true"]').length){
				      $(this).find('a.team-info-h').addClass('noscore').removeClass('background-blue');
			      }
			      $(this).find('span.team-name[data-team-id="' + team_id + '"]').hide();
		      });
	      },
        
        selectTeam: function(event) {
            var team_id = this.select_team.val();
            this.$('.team-info').stop().slideUp();
            this.$('.team-info-' + team_id).stop().slideDown();
	        console.log(team_id);
        }

      });

    return OrgItemView;
});