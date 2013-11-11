//Delete Model

define([ 'models', 'facade' ], function(models, facade) {

	var BaseModel = models.BaseModel, Backbone = facade.Backbone, $ = facade.$, _ = facade._;
	return BaseModel.extend({

		mpay:{},
		thumb_size:220,
		display_width:220,
		display_height:220,
		parsedData: {},

		initialize: function(options){
			if(options.mpay) this.mpay = options.mpay;
			if(options.thumb_size) this.thumb_size = options.thumb_size;
			if(options.display_width) this.display_width = options.display_width;
			if(options.display_height) this.display_height = options.display_height;

			this.parseResult();
		},
		ucwords: function(str)
		{
			str = str.toLowerCase();
			return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
				function($1){
					return $1.toUpperCase();
				});
		},

		findCorrectType: function(types){

			var current_winner = false,
				self = this;

			_.each(types,function(type){
				current_winner = current_winner || type;
				if(type.height >= self.display_height && type.width >= self.display_width){
					//check if current winner is smaller than display
					if(current_winner.height < self.display_height && current_winner.width < self.display_width){
						current_winner = type;
					}
					else if(current_winner.height > type.height && current_winner.width > type.width){
						current_winner = type;
					}
				}
			});

			this.closest_image_format = current_winner;
		},

		parseResult: function(){

			var _self = this, mpay = this.mpay,
				return_data = {
					_enttypes_id : mpay.enttypes_id,
					_id : mpay.id,
					_has_voted: mpay.has_voted,
					_is_following: mpay.is_following,
					_can_follow: mpay.can_follow,
					show_play:false,
					show_edit:false
				};
			switch(mpay.enttypes_id)
			{
				case '23':
					return_data = _self.parse_video(mpay,return_data);
					break;
				case '21':
					return_data = _self.parse_image(mpay,return_data);
					break;
				case '1':
					return_data = _self.parse_user(mpay,return_data);
					break;
				case '8':
					return_data = _self.parse_game(mpay,return_data);
					break;
			}

			if(_self.closest_image_format != "undefined" && _self.closest_image_format != null) return_data = _self.imageFormat(return_data);
			else{ return_data.imgData = ""; }
			_self.parsedData = return_data;

		},

		parse_user: function(mpay,return_data){

			if ( typeof (mpay.user_picture_obj) == 'object')
			{
				if(typeof(mpay.user_picture_obj.types) == 'object')
				{
					this.findCorrectType(mpay.user_picture_obj.types);
				}
			}
			return_data._noicon_text = "hi";
			return_data._label = mpay.label;
			return_data._sublabel = "Votes: " + mpay.num_votes + ", Followers: " + mpay.num_followers;
			return_data._link = "/#profile/" + mpay.id;
			return_data._has_link = true;
			if(mpay.hasOwnProperty('is_owner')) return_data.show_edit = mpay.is_owner;

			return return_data;
		},

		parse_video: function(mpay,return_data){
			if(typeof(mpay.standard_thumb)=='object')
			{
				this.closest_image_format = mpay.standard_thumb;
				return_data._thumbnail = this.closest_image_format.url;
			}
			else
			{
				return_data._thumbnail = mpay.thumbs;
			}

			//non-thumb related data
			return_data.show_play = true;
			return_data._enttypes_id = typeof(mpay.media == "object") ? mpay.media.enttypes_id : 0;
			return_data._id = typeof(mpay.media == "object") ? mpay.media.id : 0;
			return_data._label = mpay.media.name;
			return_data._link = "javascript: void(0);";
			return_data._has_link = false;

			if(mpay.media.hasOwnProperty('is_owner')) show_edit = mpay.media.is_owner;
			return_data._noicon_text = "play";
			return return_data;
		},

		parse_image: function(mpay,return_data){
			//images
			return_data._enttypes_id = typeof(mpay.media_obj == "object") ? mpay.media_obj.enttypes_id : 0;
			return_data._id = typeof(mpay.media_obj == "object") ? mpay.media_obj.id : 0;
			if ( typeof (mpay.types) == 'object')
			{
				this.findCorrectType(mpay.types);
			}
			//else
	
			return_data._label = (!_.isUndefined(mpay.media_obj.users_obj.label))?mpay.media_obj.users_obj.label:'';
			if(typeof(mpay.media_obj.sports_obj) == 'object')
			{
				return_data._sublabel = this.ucwords(mpay.media_obj.sports_obj.sport_name);
			}
	
			return_data._link = "javascript: void(0);";
			return_data._has_link = false;
			if(mpay.media_obj.hasOwnProperty('is_owner')) return_data.show_edit = mpay.media_obj.is_owner;
			return_data._noicon_text = "look";
			return return_data;
		},

		parse_game: function(mpay,return_data){
			return_data._detailclass = "game";

			if ( typeof (mpay.game_picture) == 'object' && mpay.game_picture !=null)
			{
				if(typeof(mpay.game_picture.types) == 'object')
				{
					this.findCorrectType(mpay.game_picture.types);
					return_data._thumbnail = this.closest_image_format.url;
				}
			}

			return_data._label = mpay.game_day;
			return_data._link = "/#game/" + mpay.id;
			return_data._has_link = true;
			var team_str = "", teams = mpay.teams;
			if(teams != null) var teamLength = teams.length;
			console.log(mpay);
			for (var i = 0; i < teamLength; i++) {
				team_str += '<span>';

				team_str += this.ucwords(mpay.teams[i].team_name);
				team_str += '</span>';

			}
			if(mpay.hasOwnProperty('is_owner')) return_data.show_edit = mpay.is_owner;
			if(team_str != "") return_data._sublabel = team_str;
			else{
				return_data._sublabel = mpay.event_name;
			}
			return_data._noicon_text = "vs";
			console.log(return_data);
			return return_data;
		},

		imageFormat: function(return_data){
			var _self = this;
			return_data._thumbnail = this.closest_image_format.url;
			var imgData = _self.closest_image_format;

			var ratio_x = imgData.width / 220,
				ratio_y = imgData.height / 220;

			imgData.width = parseInt(imgData.width);
			imgData.height = parseInt(imgData.height);

			var overflow = (imgData.width > imgData.height) ?
				-((imgData.width / ratio_y) -220) / 2:
				-((imgData.height / ratio_x)-220) / 2;
			if(overflow > 0) overflow = 0;

			if(imgData.width > imgData.height){
				imgData.maxwidth = imgData.width / ratio_y;
				imgData.left = overflow;
			}

			else
			{
				imgData.maxheight = imgData.height / ratio_x;
				imgData.top = overflow;
			}
			return_data.imgData = imgData;
			return return_data;
		}
	});
});