// commenton-item.js  
// -------  
// Requires `define`
// Return {CommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!usercontrol/photo-player/templates/tag-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        tagItemTemplate
        ) {

    var TagItemView,
        BaseView = views.BaseView, 
        Mustache = vendor.Mustache;

      TagItemView = BaseView.extend({
        tagName: "li",
        template: tagItemTemplate,
        className: "tag",
          
        initialize: function (options) {
        	//console.log(this.model.toJSON());
        },	
        
        
        filterData: function() {
        	//alert("calling filter data once");
        	console.log(this.model.get('payload'));
    		var _self = this, mpay = this.model.get("payload"), extra = {
			_enttypes_id : mpay.subject_enttypes_id,
			_id : mpay.id
			},
			show_edit = false,
			standard_thumb = null;
			extra.Sportsteam = null;
			//alert(extra._enttypes_id + "entity type");
			console.log(mpay.subject,"for testing");
			switch(extra._enttypes_id)
			{
				case '23':
					//videos
					extra._thumbnail = mpay.thumbs;

					extra._label = mpay.media.name;
					extra._link = "javascript: void(0);";

					if(mpay.media.hasOwnProperty('is_owner')) show_edit = mpay.media.is_owner;

					break;
				case '21':
					//images
					if ( typeof (mpay.types) == 'object')
					{
						//console.log(mpay.types);
						if(typeof(mpay.types.standard_thumb)=='object')
						{
							standard_thumb = mpay.types.standard_thumb;
							extra._thumbnail = standard_thumb.url;
						}
						else if(typeof(mpay.types.large_thumb)=='object')
						{
							standard_thumb = mpay.types.large_thumb;
							extra._thumbnail = standard_thumb.url;
						}
						else if(typeof(mpay.types.original)=='object')
						{
							//console.log(mpay.types.original);
							standard_thumb = mpay.types['original'];
							extra._thumbnail = standard_thumb.url;
						}
					}
					else

					extra._label = mpay.media_obj.name;
					extra._link = "javascript: void(0);";

					if(mpay.media_obj.hasOwnProperty('is_owner')) show_edit = mpay.media_obj.is_owner;

					break;
				case '1':
					//users


					if ( typeof (mpay.subject.user_picture_obj) == 'object')
					{
						if(typeof(mpay.subject.user_picture_obj.types) == 'object')
						{
							if(typeof(mpay.subject.user_picture_obj.types.standard_thumb)=='object')
							{
								standard_thumb = mpay.subject.user_picture_obj.types.standard_thumb;
								extra._thumbnail = standard_thumb.url;
							}
							else if(typeof(mpay.subject.user_picture_obj.types.large_thumb)=='object')
							{
								standard_thumb = mpay.subject.user_picture_obj.types.large_thumb;
								extra._thumbnail = standard_thumb.url;
							}
							else if(typeof(mpay.subject.user_picture_obj.types.original)=='object')
							{
								//console.log(mpay.types.original);
								standard_thumb = mpay.subject.user_picture_obj.types['original'];
								extra._thumbnail = standard_thumb.url;
							}
						}
					}

					extra._label = mpay.subject.label;
					extra._sublabel = "Coming Soon";
					extra._link = "/#profile/" + mpay.subject.id;
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					break;
				case '8':
					//games
					extra._detailclass = "game";
					standard_thumb = mpay.subject.game_picture!==null ? mpay.subject.game_picture.types.standard_thumb : {height:440,width:440,url:"http://lorempixel.com/output/sports-q-g-440-440-3.jpg"};
					extra._thumbnail = standard_thumb.url;
					//extra._label = mpay.subject.game_day;
					extra._link = "/#game/" + mpay.subject.id;
					var team_str = "", teamLength = mpay.subject.teams.length,
						ucwords = function(str)
						{
							str = str.toLowerCase();
							return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
								function($1){
									return $1.toUpperCase();
								});
						};

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
						team_str += mpay.subject.teams[i].points_scored;
						team_str += '</span>';
						team_str += '</div>';
						
						//if (i + 1 < mpay.subject.teams.length)
						//	team_str += " VS. ";
					}
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					//extra._label = team_str;
					
					if(!this.Sportsteam)
					{
						this.Sportsteam=true;
						var str = mpay.subject.shared.season;
						var n = str.split(" ");
						var headerdata = '<div class="firstheader">'+ mpay.subject.shared.sport+'</div>	<div class="secheader">'+mpay.subject.shared.complevel+'</div><div class="thirdheader">'+n[2]+'</div>';
						$(".headerinfo").html(headerdata);
						$(".teamName-area").html(team_str);
					}

					break;
					
				case '5':
					//team
					extra._detailclass = "team";
					standard_thumb = mpay.subject.picture!==null ? mpay.subject.picture : {height:440,width:440,url:"http://lorempixel.com/output/sports-q-g-440-440-3.jpg"};
					extra._thumbnail = standard_thumb;
					//extra._label = mpay.subject.game_day;
					extra._link = "/#team/" + mpay.subject_id;
					var team_str = mpay.subject.team_name;
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					extra._label = team_str;
					break;	
			}
			
			extra.show_edit = show_edit==true ? true : undefined;
			var markup = Mustache.to_html(this.template, extra);
			this.$el.html(markup);
        },
        

        render: function () {
        	
        	
        	this.filterData();
            // var markup = Mustache.to_html(this.template, this.filterData());
            // this.$el.html(markup);
            // var payload = this.model.get('payload');
            // var self = this;
            // if (payload) {
            	// try {
               	 	// var user_photo = payload.user.user_picture_obj.types.small_thumb.url;
					// self.$('.user-photo img').attr("src",user_photo);
            	// } catch(e) {
            		// console.log(e);
            	// }
            // }
            
            return this;
        }        
        
      });

    return TagItemView;
});