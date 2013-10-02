// image-item.js
// -------
// Requires `define`
// Return {ImageItemView} object as constructor

define(['vendor', 'views', 'utils', 'text!media/templates/image-item.html', 'votes/models/vote',
        'votes/models/follow'], function(vendor, views, utils, imageItemTemplate) {

	var ImageItemView, $ = vendor.$, BaseView = views.BaseView, Mustache = vendor.Mustache,
	voteModel = require('votes/models/vote'),
    followModel = require('votes/models/follow');

	ImageItemView = BaseView.extend({

		tagName : "li",

		className : "image",

		// Event handlers...
		 events: {
            "click": "changeImage",
			"click .vote-h": "vote",
			'click .image-outer-h' : 'initPhotoPlayer',
	        "click .follow-h": "follow",
			"click .edit-h": "edit",
			"click .delete-h": "delete"
        },

		initialize : function(options) {
			this.template = imageItemTemplate;
			//this.render();
		},
		
		
		render : function() {
			var _self = this, mpay = this.model.attributes.payload, extra = {
				_enttypes_id : mpay.enttypes_id,
				_id : mpay.id
				},
				show_edit = false,
				standard_thumb = null;

			console.log(mpay);
			switch(mpay.enttypes_id)
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

					extra._label = mpay.label;
					extra._sublabel = "Coming Soon";
					extra._link = "/#profile/" + mpay.id;

					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;

					break;
				case '8':
					//games
					extra._detailclass = "game";
					standard_thumb = mpay.game_picture!==null ? mpay.game_picture.types.standard_thumb : {height:440,width:440,url:"http://cdn.athletez.com/resources/icons/game/square_game.png"}
					extra._thumbnail = standard_thumb.url;
					extra._label = mpay.game_day;
					extra._link = "/#game/" + mpay.id;
					var team_str = "", teams = mpay.teams,
						ucwords = function(str)
						{
							str = str.toLowerCase();
							return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
								function($1){
									return $1.toUpperCase();
								});
						};
					if(teams != null) var teamLength = teams.length;

					for (var i = 0; i < teamLength; i++) {
						team_str += '<span>';

						team_str += ucwords(mpay.teams[i].team_name);
						team_str += '</span>';
						if (i + 1 < mpay.teams.length)
							team_str += " VS. ";
					}
					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
					extra._sublabel = team_str;
					break;

			}
			extra.show_edit = show_edit==true ? true : undefined;

			//console.log("Called Image Render", extra);
			var markup = Mustache.to_html(this.template, extra);
			this.$el.html(markup);

			var game_detail_view_height = '120px', detail_view_height = '92px';

			this.$el.find('.image-outer-h').mouseout(function() {
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
					this.$el.find('img').css({
						'max-width':standard_thumb.width / ratio_y,
						'left':overflow
					});
				else
					this.$el.find('img').css({
						'max-height':standard_thumb.height / ratio_x,
						'top':overflow
					});
			}

			this.$el.find('.image-outer-h').mouseover(function() {
				$(this).find('.detail-view').css({
					'bottom' : '0px'
				});
				$(this).find('.action-block').css({
					opacity : 90
				});
			});
			return this;

			//console.log("Called Image Render",this.model);
			//var markup = Mustache.to_html(this.template, this.model.toJSON());
			//this.$el.html(markup);
			//return this;
		},

		/**
		 * This entire block of functions here should call methods from the model so that it can be centralized
		 */

		vote: function(e)
	    {
		    e.preventDefault();
		    console.log(this.model);
		   
		    var voteModelOb = new voteModel();
			voteModelOb.userId = this.model.id;
			voteModelOb.entity_id = this.model.get("payload").enttypes_id;
			voteModelOb.setData();
			voteModelOb.save();
	    },

	    follow: function(e){
		   e.preventDefault();
		    console.log(e.target);
		    var followModelOb = new followModel();
			followModelOb.userId = this.model.id;
			followModelOb.entity_id = this.model.get("payload").enttypes_id;
			followModelOb.save();
	    },

		edit: function(e)
		{
			e.preventDefault();
			console.log("edit");
		},

		'delete': function(e)
		{
			e.preventDefault();
			console.log("delete");
		}

	});

	return ImageItemView;
}); 