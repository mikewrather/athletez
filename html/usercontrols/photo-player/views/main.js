/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define(['require', 'text!usercontrols/photo-player/templates/player.html', 'facade', 'views', 'utils', 'vendor', 'votes/models/vote' ], function(require, layoutTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, 
	utils = require('utils'), Channel = utils.lib.Channel, vendor = require('vendor'), 
	Mustache = vendor.Mustache, $ = facade.$, voteModel = require('votes/models/vote');
	//Models
	PhotoPlayerView = SectionView.extend({
		template : layoutTemplate,
		thumbTemplate: '{{#data}}<li><a href="javascript: void(0);" class="thumb-link-h" data-index="{{_index}}" title="thumb"><img src="{{_thumbnail}}" alt="{{_thumbnail}}" /></a></li>{{/data}}',
		events : {
			'click .back-arrow-h' : 'backButton',
			'click .next-arrow-h' : 'nextButton',
			'click .thumb-link-h' : 'changeImage',
			'click .photo-player-vote-h': 'vote'
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			this.collection = options.collection;
			this.id = options.id;
			this.index = options.index;
			SectionView.prototype.initialize.call(this, options);
			this.setUpMainView();
			//console.log(this.model.toJSON());
			this.json = this.model.toJSON();
			this.render();
			this.initThumbsSection();
			this.loadImage(true);
			
		},
		
		vote: function(e) {
			
			if($(e.currentTarget).hasClass('voted'))
				return;
				
			var _self = ths, vote = new voteModel();
			vote.userId = this.json[this.index].payload.id;
			vote.entity_id = this.json[this.index].payload.enttypes_id;
			vote.set({subject_type_id:vote.entity_id , subject_id: vote.userId});
			vote.save();
			$.when(vote.request).done(function() {
				_self.$el.find('.photo-player-vote-h').addClass('voted');
			});
		},
		
		changeImage: function(e) {
			//this.$el.find('.thumb-image-list-h li').removeClass('selected-photo-thumb');
			var $current = $(e.currentTarget);
			//$current.parents('li').addClass('selected-photo-thumb');
			this.index = $current.attr("data-index");
			this.loadImage();
		},
		
		backButton: function(e) {
			if(this.index > 0) {
				this.index--;
				this.loadImage();
			}
		},
		
		nextButton: function(e) {
			if(this.index < this.json.length) {
				this.index++;	
				this.loadImage();
			}
		},
		
		initThumbsSection: function() {
			var _self = this, dataLength = this.json.length, data = {};
			data.data = [];
			console.error(this.json);
			for(var i = 0; i < dataLength; i++) {
				var mpay = this.json[i].payload, extra = {
					_enttypes_id : mpay.enttypes_id,
					_id : mpay.id,
					_index: i
				};
				switch(mpay.enttypes_id) {
					case '23':
						//videos
						extra._thumbnail = mpay.thumbs;
						extra._label = mpay.media.name;
						extra._link = "javascript: void(0);";
						if(mpay.media.hasOwnProperty('is_owner')) show_edit = mpay.media.is_owner;
						break;
					case '21':
						//images
						if ( typeof (mpay.types) == 'object' && mpay.types.small_thumb)
							extra._thumbnail = mpay.types.standard_thumb.url;
						extra._label = mpay.media_obj.name;
						extra._link = "javascript: void(0);";
	
						if(mpay.media_obj.hasOwnProperty('is_owner')) show_edit = mpay.media_obj.is_owner;
	
						break;
					case '1':
						//users
						if ( typeof (mpay.user_picture_obj) == 'object')
							extra._thumbnail = mpay.user_picture_obj.types.small_thumb.url;
						extra._label = mpay.label;
						extra._sublabel = "Coming Soon";
						extra._link = "/#profile/" + mpay.id;
	
						if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;
	
						break;
					case '8':
						//games
						extra._detailclass = "game";
	
						extra._thumbnail = mpay.game_picture!==null ? mpay.game_picture.types.small_thumb.url : "http://lorempixel.com/output/sports-q-c-440-440-4.jpg";
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
				data.data.push(extra);
			}
			this.id = extra._id;
			var markup = Mustache.to_html(this.thumbTemplate, data);
			this.$el.find('.thumb-image-list-h').html(markup);
		},
		
		
		
		//fetchForm: function() {
			
		//}
		
		loadImage: function(trigger) {
			var _self = this, mpay = this.json[_self.index].payload, extra = {
				_enttypes_id : mpay.enttypes_id,
				_id : mpay.id,
				_currentIndex: _self.index
			};

			console.log(mpay);

			var image_object;
			switch(mpay.enttypes_id) {
				case '23':
					//videos

					extra._thumbnail = mpay.thumbs;
					extra._label = mpay.media.name;
					extra._link = "javascript: void(0);";
					break;
				case '21':
					//images
					if ( typeof (mpay.types) == 'object' && mpay.types.large_format)
						image_object = mpay.types.large_format;
					extra._label = mpay.media_obj.name;
					extra._link = "javascript: void(0);";
					break;
				case '1':
					//users
					if ( typeof (mpay.user_picture_obj) == 'object')
						extra._thumbnail = mpay.user_picture_obj.types.large_thumb.url;
					extra._label = mpay.label;
					extra._sublabel = "Coming Soon";
					extra._link = "/#profile/" + mpay.id;

					if(mpay.hasOwnProperty('is_owner')) show_edit = mpay.is_owner;

					break;
				case '8':
					//games
					extra._detailclass = "game";

					extra._thumbnail = mpay.game_picture!==null ? mpay.game_picture.types.large_thumb.url : "http://lorempixel.com/output/sports-q-c-440-440-4.jpg";
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

			if(image_object != "undefined" && image_object != null)
			{
				var totalheight = parseInt(this.$el.height()) * .8,
					image_height = parseInt(image_object.height) > 380 ? parseInt(image_object.height) : 380;

				console.log(totalheight,image_height,(totalheight-image_height)/2);

				if(image_object.width > image_object.height || image_object.width == image_object.height)
				{
					var top = totalheight<image_height ? 10 : (totalheight-image_height)/2;
					this.$el.find('img').css({
						'max-width':'100%',
						'top':top + 'px'
					});
				}
				else
				{
					this.$el.find('img').css({
						'max-height':'100%',
						'top':'0px'

					});
				}


				this.$el.find('.large-image-h').attr('src', image_object.url);

			}
			

			
			this.$el.find('.thumb-image-list-h li').removeClass('selected-photo-thumb');
			this.$el.find('.thumb-link-h[data-index='+this.index+']').parents('li').addClass('selected-photo-thumb');

			console.log(extra);
			routing.trigger('photo-player-section-reload', extra._enttypes_id, extra._id);
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
		},

		setUpMainView : function() {
			var self = this;
			var markup = Mustache.to_html(self.template, {});
			$(self.$el).html(markup);
		}
	});
	return PhotoPlayerView;
});
