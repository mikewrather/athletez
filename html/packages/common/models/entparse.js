//Delete Model

define([ 'models', 'facade' ], function(models, facade) {

	var BaseModel = models.BaseModel, Backbone = facade.Backbone, $ = facade.$, _ = facade._;
	return BaseModel.extend({

		mpay:{},
		ucwords: function(str)
		{
			str = str.toLowerCase();
			return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
				function($1){
					return $1.toUpperCase();
				});
		},

		parseResult: function(){

			var _self = this, mpay = this.model.attributes.payload,
				return_data = {
					_enttypes_id : mpay.enttypes_id,
					_id : mpay.id,
					_has_voted: mpay.has_voted,
					_is_following: mpay.is_following,
					_can_follow: mpay.can_follow
				},

				show_edit = false,
				standard_thumb = null,
				show_play = false;

			switch(mpay.enttypes_id)
			{
				case '23':
					//videos
					if(typeof(mpay.standard_thumb)=='object')
					{
						standard_thumb = mpay.standard_thumb;
						extra._thumbnail = standard_thumb.url;
					}
					else
					{
						extra._thumbnail = mpay.thumbs;
					}

					show_play = true;
					extra._enttypes_id = typeof(mpay.media == "object") ? mpay.media.enttypes_id : 0;
					extra._id = typeof(mpay.media == "object") ? mpay.media.id : 0;
					extra._label = mpay.media.name;
					extra._link = "javascript: void(0);";
					extra._has_link = false;

					if(mpay.media.hasOwnProperty('is_owner')) show_edit = mpay.media.is_owner;
					extra._noicon_text = "play";
					break;


				case '21':
					//images
					extra._enttypes_id = typeof(mpay.media_obj == "object") ? mpay.media_obj.enttypes_id : 0;
					extra._id = typeof(mpay.media_obj == "object") ? mpay.media_obj.id : 0;
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
					//else

					extra._label = (!_.isUndefined(mpay.media_obj.users_obj.label))?mpay.media_obj.users_obj.label:'';
					if(typeof(mpay.media_obj.sports_obj) == 'object')
					{
						extra._sublabel = ucwords(mpay.media_obj.sports_obj.sport_name);
					}

					extra._link = "javascript: void(0);";
					extra._has_link = false;
					if(mpay.media_obj.hasOwnProperty('is_owner')) show_edit = mpay.media_obj.is_owner;
					extra._noicon_text = "view";

					break;


				case '1':
					//users


					if ( typeof (mpay.user_picture_obj) == 'object')
					{
						if(typeof(mpay.user_picture_obj.types) == 'object')
						{
							if(typeof(mpay.user_picture_obj.types.standard_thumb)=='object')
							{
								standard_thumb = mpay.user_picture_obj.types.standard_thumb;
								extra._thumbnail = standard_thumb.url;
							}
							else if(typeof(mpay.user_picture_obj.types.large_thumb)=='object')
							{
								standard_thumb = mpay.user_picture_obj.types.large_thumb;
								extra._thumbnail = standard_thumb.url;
							}
							else if(typeof(mpay.user_picture_obj.types.original)=='object')
							{
								//console.log(mpay.types.original);
								standard_thumb = mpay.user_picture_obj.types['original'];
								extra._thumbnail = standard_thumb.url;
							}
						}
					}
					extra._noicon_text = "hi";
					extra._label = mpay.label;
					extra._sublabel = "Votes: " + mpay.num_votes + ", Followers: " + mpay.num_followers;
					extra._link = "/#profile/" + mpay.id;
					extra._has_link = true;
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;

					break;
				case '8':
					//games
					extra._detailclass = "game";
					standard_thumb = mpay.game_picture!==null ? mpay.game_picture.types.standard_thumb : false;
					extra._thumbnail = standard_thumb.url;
					extra._label = mpay.game_day;
					extra._link = "/#game/" + mpay.id;
					extra._has_link = true;
					var team_str = "", teams = mpay.teams;
					if(teams != null) var teamLength = teams.length;
					console.log(mpay);
					for (var i = 0; i < teamLength; i++) {
						team_str += '<span>';

						team_str += ucwords(mpay.teams[i].team_name);
						team_str += '</span>';

					}
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					if(team_str != "") extra._sublabel = team_str;
					else{
						extra._sublabel = mpay.event_name;
					}
					extra._noicon_text = "vs";
					console.log(extra);
					break;

			}
			extra.show_edit = show_edit==true ? true : undefined;

			//console.log("Called Image Render", extra);
			var markup = Mustache.to_html(this.template, extra);
			this.$el.html(markup);

			var game_detail_view_height = '120px', detail_view_height = '92px';

			//alert("sdsad sd sd");
			this.$el.find('.image-item-container').mouseout(function() {
				$(this).find('.action-block').css({
					opacity : 0
				});
				$(this).find('.detail-view').css({
					'bottom' : '-' + detail_view_height
				});
				$(this).find('.detail-view.game').css({
					'bottom' : '-' + game_detail_view_height
				});
			});

			if(standard_thumb != "undefined" && standard_thumb != null)
			{

				var ratio_x = standard_thumb.width / 220,
					ratio_y = standard_thumb.height / 220;

				standard_thumb.width = parseInt(standard_thumb.width);
				standard_thumb.height = parseInt(standard_thumb.height);

				var overflow = (standard_thumb.width > standard_thumb.height) ?
					-((standard_thumb.width / ratio_y) -220) / 2:
					-((standard_thumb.height / ratio_x)-220) / 2;
				if(overflow > 0) overflow = 0;

				if(standard_thumb.width > standard_thumb.height)
					this.$el.find('img.list-thumbnail').css({
						'max-width':standard_thumb.width / ratio_y,
						'left':overflow
					});
				else
					this.$el.find('img.list-thumbnail').css({
						'max-height':standard_thumb.height / ratio_x,
						'top':overflow
					});
			}

			if(show_play){
				this.$el.append('<div class="circle open-photo-player-h"><div class="play"></div></div>');
			}

			function show_details(e)
			{
				console.log($(this),e);

			}
			this.$el.find('.image-item-container').mouseover(function(){
				$(this).find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).find('.action-block').css({
					opacity : 90
				});
			});
			this.$el.find('.circle').mouseover(function(){
				$(this).parent().find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).parent().find('.action-block').css({
					opacity : 90
				});
			});

			//	this.$el.find('.circle').mouseover(show_details());
			//	this.$el.find('.play').mouseover(show_details());

			this.$el.find('.vote-h').click(function(e) {
				_self.vote(e);
			});

			this.$el.find('.follow-h').click(function(e) {
				_self.follow(e);
			});

			this.$el.find('.edit-h').click(function(e) {
				_self.edit(e);
			});

			this.$el.find('.delete-h').click(function(e) {
				_self['delete'](e);
			});
			return this;

			//console.log("Called Image Render",this.model);
			//var markup = Mustache.to_html(this.template, this.model.toJSON());
			//this.$el.html(markup);
			//return this;
		},

		imageFormat: function(){

		}
	});
});