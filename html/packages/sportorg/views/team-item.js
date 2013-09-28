// team-item.js  
// -------  
// Requires `define`
// Return {TeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/team-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        teamItemTemplate
        ) {

    var TeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      TeamItemView = BaseView.extend({

        tagName: "li",

        className: "team",
           events: {
	           'mouseover .team-info-h': 'showinfo',
	           'mouseout .team-info-h': 'showinfo'
        },
        
        showinfo: function(e) {
        	e.preventDefault();
        	if(!$(e.target).parents('.game-info').length) {
	        	
	        	if($(e.target).find('.game-info').hasClass('hide')) {
		        //	$('.game-info').addClass('hide');
		        	$(e.target).find('.game-info').removeClass('hide');
		        } else {
		        	$('.game-info').addClass('hide');
		        }
		        
		        
		        
        	}
        },
        initialize: function (options) {
	        this.teams_id = options.teams_id || null;
	        console.log("Teams_id:",options);
	        this.mpay = this.model.get('payload');
	        console.log("Team Item View",this.mpay);
            this.template = teamItemTemplate;
        },

        render: function () {
	        var string_to_use = this.createOpponentString();
            var markup = Mustache.to_html(this.template, {summary:string_to_use});
            this.$el.html(markup);
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
	    }
        
      });

    return TeamItemView;
});