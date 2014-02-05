// commenton-item.js  
// -------  
// Requires `define`
// Return {CommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!usercontrol/photo-player/templates/tag-item.html',
		'common/models/delete',
		'common/models/entparse'
        ], 
function (
        vendor,
        views,
        utils,
        tagItemTemplate,
        DeleteModel
        ) {

    var TagItemView,
        BaseView = views.BaseView, 
        Mustache = vendor.Mustache,
	    entParser = require('common/models/entparse');

      TagItemView = BaseView.extend({
        tagName: "li",
        template: tagItemTemplate,
        className: "tag",
	    events:{
		    "click .deleteTag":"deleteTag"
	    },
          
        initialize: function (options) {
        	//console.log(this.model.toJSON());
        },	
        
        
        filterData: function() {
    		var _self = this, mpay = this.model.get("payload"), extra = {
			_enttypes_id : mpay.enttypes_id,
			_id : mpay.id
			},
			show_edit = false,
			standard_thumb = null;
			extra.Sportsteam = null;

	        var parser = new entParser({
		        mpay:mpay.subject,
		        thumb_size:44,
		        display_width:44,
		        display_height:44
	        });
	        var extra = parser.parsedData;

			//alert(extra._enttypes_id + "entity type");
			console.log(extra,"for testing");
			switch(mpay.subject_enttypes_id)
			{
				case '8':
					//games
					var team_str = "",
						ucwords = function(str)
						{
							str = str.toLowerCase();
							return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
								function($1){
									return $1.toUpperCase();
								});
						};

					var teamLength = mpay.subject.teams ? mpay.subject.teams.length : 0;


					for (var i = 0; i < teamLength; i++) {
						if((i%2)==1){
							var className = "game-match-name1";
							var scoreClass = "game-score1";
						}
						else{
							var className = "game-match-name";
							var scoreClass = "game-score";
						}
						team_str += '<div class="'+className+'">';
						
						console.log(mpay.subject.teams[i].team_name + ",score="+ mpay.subject.teams[i].points_scored+",i="+i);
						team_str += ucwords(mpay.subject.teams[i].team_name);
						team_str += '</div>';
						
						team_str += '<div class="'+scoreClass+'">';
						team_str += '<span class="scoreAlign">';
						team_str += mpay.subject.teams[i].points_scored != null ? mpay.subject.teams[i].points_scored : "&Oslash;";
						team_str += '</span>';
						team_str += '</div>';
						
						//if (i + 1 < mpay.subject.teams.length)
						//	team_str += " VS. ";
					}
					extra._label = team_str != "" ? team_str : mpay.subject.event_name;

					console.log(extra._label);
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					//extra._label = team_str;
					
					if(!this.Sportsteam && teamLength)
					{
						this.Sportsteam=true;
						var str = mpay.subject.shared.season;
						var n = str.split(" ");
						var headerdata = '<div class="name"><span class="topalign">'+ mpay.subject.shared.sport+'</span></div>	<div class="game"><span class="topalign">'+mpay.subject.shared.complevel+'</span></div><div class="season"><span class="topalign">'+n[2]+'</span></div>';
						$(".headerinfo").html(headerdata);
						//$(".teamName-area").html(team_str);
					}

					break;

				case '5':
					extra._label = mpay.subject.team_name;
					break;
			}

	        extra._enttypes_id=mpay.enttypes_id;
	        extra._id = mpay.id;
	        console.log(extra);
			return extra;
        },
        

        render: function () {
			var self = this,
	        extra = this.filterData(),
	        markup = Mustache.to_html(this.template, extra);
	        this.$el.html(markup);

	        console.log(this.$el);

	        var timer = setInterval(function(){
		        if (self.$el.find('.tag-image-container').width()>0) {
			        self.$el.find('.tag-image-container').css({
				        'height':'33px'//self.$el.find('.tag-image-container').width()
			        });
			        console.log(self.$el.find('.tag-image-container').width());
			        clearInterval(timer);
		        }
	        }, 200);

	        if(extra.imgData.maxwidth)
		        this.$el.find('img.tag-thumb').css({
			        'max-width':extra.imgData.maxwidth,
			        'left':extra.imgData.left
		        });

	        if(extra.imgData.maxheight)
		        this.$el.find('img.tag-thumbl').css({
			        'max-height':extra.imgData.maxheight,
			        'top':extra.imgData.top
		        });

            
            return this;
        },

		deleteTag: function (e) {
			var deleteModel = new DeleteModel();
			deleteModel.subject_id  = $(e.target).attr('data-subject-id');
			deleteModel.enttypes_id = $(e.target).attr('data-enttypes-id');
			deleteModel.removeNode  = $(e.target).parents("li.tags-li");
			console.log(deleteModel);
			deleteModel.destroyAndRemove();
		}

      });

    return TagItemView;
});