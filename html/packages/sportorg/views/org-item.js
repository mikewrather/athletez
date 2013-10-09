// org-item.js  
// -------  
// Requires `define`
// Return {OrgListItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/org-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        orgItemTemplate
        ) {

    var OrgItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      OrgItemView = BaseView.extend({

        tagName: "li",

        className: "org",
          
        events: {
            "change #select-team": "selectTeam"
        },
       

        initialize: function (options) {
        	$("body").click(function(e) {
        		//e.preventDefault();
        		if(!$(e.target).hasClass('team-info-h') && !$(e.target).hasClass('org-popup') && $(e.target).parents('.org-popup').length === 0) {
        			$('.org-popup').addClass('hide');
        		}
        	});
            this.template = orgItemTemplate;
        },

        render: function () {
        	// var string_to_use = this.createOpponentString();

            //var markup = Mustache.to_html(this.template, {data: this.model.toJSON(), id:this.mpay.id,summary:string_to_use});
            
            var markup = Mustache.to_html(this.template, this.model.toJSON());
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