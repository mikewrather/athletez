// image-item.js
// -------
// Requires `define`
// Return {ImageItemView} object as constructor

define(['vendor', 'views', 'utils', 'text!media/templates/image-item.html'], function(vendor, views, utils, imageItemTemplate) {

	var ImageItemView, $ = vendor.$, BaseView = views.BaseView, Mustache = vendor.Mustache;

	ImageItemView = BaseView.extend({

		tagName : "li",

		className : "image",

		// Event handlers...
		 events: {
            "click": "changeImage",
			"click .vote": "vote",
	        "click .follow": "follow",
			"click .edit": "edit",
			"click .delete": "delete"
        },

		initialize : function(options) {
			this.template = imageItemTemplate;
			//this.render();
		},

		render : function() {
			var mpay = this.model.attributes.payload, extra = {
				_enttypes_id : mpay.enttypes_id,
				_id : mpay.id
				},
				show_edit = false;

	
			switch(mpay.enttypes_id) {
				case '23':
					//videos
					extra._thumbnail = mpay.thumbs;
					extra._label = mpay.media.name;
					extra._link = "";

					if(mpay.media.hasOwnProperty('is_owner')) show_edit = mpay.media.is_owner;

					break;
				case '21':
					//images
					if ( typeof (mpay.types) == 'object' && mpay.types.standard_thumb)
						extra._thumbnail = mpay.types.standard_thumb.url;
					extra._label = mpay.media_obj.name;
					extra._link = "";

					if(mpay.media_obj.hasOwnProperty('is_owner')) show_edit = mpay.media_obj.is_owner;

					break;
				case '1':
					//users
					if ( typeof (mpay.user_picture_obj) == 'object')
						extra._thumbnail = mpay.user_picture_obj.types.standard_thumb.url;
					extra._label = mpay.label;
					extra._sublabel = "Coming Soon";
					extra._link = "/#profile/" + mpay.id;

					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;

					break;
				case '8':
					//games
					extra._detailclass = "game";

					extra._thumbnail = mpay.game_picture!==null ? mpay.game_picture.types.standard_thumb.url : "http://lorempixel.com/output/sports-q-c-440-440-4.jpg";
					extra._label = mpay.game_day;
					extra._link = "/#game/" + mpay.id;
					var team_str = "", teamLength = mpay.teams.length,
						ucwords = function(str)
						{
							str = str.toLowerCase();
							return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
								function($1){
									return $1.toUpperCase();
								});
						};
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

			console.log("Called Image Render", extra);
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
	    },

	    follow: function(e){
		    e.preventDefault();
		    console.log(e.target);
	    },

		edit: function(e)
		{
			e.preventDefault();
		},

		'delete': function(e)
		{
			e.preventDefault();
		}

	});

	return ImageItemView;
}); 