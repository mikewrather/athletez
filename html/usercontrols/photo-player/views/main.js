/* // Photo Player Main View
 // ---------
 // Usercontrol
 // Requires `define`, `require`
 // Returns {Photo Player View} constructor
 */
define(['require',
	'text!usercontrols/photo-player/templates/player.html',
	'text!usercontrols/photo-player/templates/image-thumbs.html',
	'text!usercontrols/tag/templates/layout.html',
	'facade',
	'views',
	'utils',
	'vendor',
	'votes/models/vote',
	'jwplayer',
	'jqueryui',
	'jquery.slimscroll.hor',
	'usercontrols/tag/models/basic_info',
	'usercontrols/tag/views/main',
	'media/models/tag',
	'usercontrols/photo-player/models/tag-myself',
	'component/fb',
	'component/share'
], function(
	require,
	layoutTemplate,
	imageThumbsTemplate,
	tagTemplate) {

	var self, facade = require('facade'), views = require('views'), SectionView = views.SectionView, utils = require('utils'),
	 Channel = utils.lib.Channel, vendor = require('vendor'), 
	 TagView = require('usercontrols/tag/views/main'), 
	 UserModel = require('usercontrols/tag/models/basic_info'), 
	 Mustache = vendor.Mustache, $ = facade.$, voteModel = require('votes/models/vote'), 
	 TagMediaModel = require('media/models/tag'),
	 TagMyselfModel = require('usercontrols/photo-player/models/tag-myself');
	 FbComponent = require('component/fb'),
	 ShareComponent = require('component/share'),
	jwplayer.key = "yXOw2TpDcCoCnbWyVSCoEYA4tepkpjiVEtLEfSBIfZQ=";

	//Models
	var PhotoPlayerView = SectionView.extend({
		template : layoutTemplate,
		thumbTemplate : imageThumbsTemplate,
		events : {
			'click .back-arrow-h' : 'backButton',
			'click .next-arrow-h' : 'nextButton',
			'click .thumb-link-h' : 'changeImage',
			'click .photo-player-vote-h' : 'vote',
			'click .share-on-h' : 'shareOn',
			'click .photo-player-tag-photo-h' : 'setUpTagPhotoView',
			'click .photo-player-tag-myself-h' : 'TagMyself',
			'click .toggle-thumbs-h': 'toggleThumbsSection'
		},

		/*initialize gets called by default when constructor is initialized*/
		initialize : function(options) {
			var _self = this;

	//		console.log(options);

			this.collection = options.collection;
			this.setOptions(options);
			this.id = options.id;
			this.pageId = options.pageId;
			this.pageName = options.pageName;
			this.user_id = options.user_id;
			this.index = options.index;
			this.mediaId = options.mediaId;
			this.json = this.model.toJSON();
			var data = this.json.payload;
//			console.error(data);
			for(var i in data) {
				if(data[i].media_id == this.mediaId) {
					this.index = i;
					break;
				}
			}
			if(!this.index) this.index = 0;
			SectionView.prototype.initialize.call(this, options);

	//		if(this.index === undefined) {
	//			alert("No Media Found.");
	//			setTimeout(function() {
	//				$(".closer button").trigger("click");
	//			}, 500);
	//		} else {
				this.setUpMainView();
				this.render();
				this.initThumbsSection();
				this.loadImage(true);
				this.updateAllImagesCount();
	//		}
			Channel('tag-image-success-photo').empty();
			Channel('tag-image-success-photo').subscribe(this.tagFunction);
		},
		
		toggleThumbsSection: function(e) {
			if(this.$el.find(".thumbs-outer").css("display") == "none") {
				$(".loading_image, .photo-player-right-area, .bottom-line-container").addClass("minimizeOpacity");
			//	$(".photo-player-mask-h").removeClass("hide");
				this.$el.find(".thumbs-outer").slideDown();				
			} else {
				this.$el.find(".thumbs-outer").slideUp();
			//	$(".photo-player-mask-h").addClass("hide");
				$(".loading_image, .photo-player-right-area, .bottom-line-container").removeClass("minimizeOpacity");
			}
		},
		
		updateAllImagesCount: function() {
			//alert("here");
			this.$el.find(".total-image-count-h").text(this.json.payload.length);
		},
		
		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else	
        		return false;
		},
		
		
		vote : function(e) {
			
			var _self = this, voteFn = function() {
				 var vote = new voteModel();
			if ($(e.currentTarget).hasClass('voted')) return;
			vote.userId = _self.json.payload[_self.index].id;
			vote.entity_id = _self.json.payload[_self.index].enttypes_id;
			vote.set({
				subject_type_id : vote.entity_id,
				subject_id : vote.userId
			});
			vote.save();
			$.when(vote.request).done(function() {
				_self.$el.find('.photo-player-vote-h').addClass('voted');
				var $votesCount = _self.$el.find(".votes-num-h"), text = $votesCount.text();
				if(text == "")
					$votesCount.html("(1)").show();
				else
					$votesCount.html("("+(text + 1)+")").show();

				$votesCount.parents("li").addClass("link-disabled");
			});
			};
			
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	voteFn();
			     });
	    	} else {
	    		voteFn();
	    	}
			
		},
		
		// share event binding
		shareOn: function(e) {
			var type = $(e.currentTarget).data("share");
			if(type && _.isFunction(this[type])) this[type]();
		},
		
		getLink: function(data) {
			var link;
			if(this.pageName == "profile") {
				link = "#!"+this.pageName+data.userId+data.sportId+data.mediaId;
			} else {
				link = "#!"+this.pageName+data.pageId+data.mediaId;				
			}

			console.log(link);
			return link;
		},
		
		twitter: function() {
			var _self = this, data = this.getShareData();
			var twitter = function() {
				var options = {
					'link': _self.getLink(data),
					'name': data.User.name + " - " + data.Sport.sport_name,
					'caption': "Athletez.com",
					'image': data.record.image_path,
					'description': '',
					'title' :'',
					'type': "twitter"
				};
				new ShareComponent(options);
			};
			
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	twitter();
			     });
	    	} else {
	    		twitter();
	    	}
			
		},
		
		gplus: function() {
			var _self = this, data = this.getShareData();
			var gplusFn = function() { 
				var options = {
					//'link': "#"+this.pageName+data.userId+data.sportId+data.mediaId,
					'link': "?enttypes_id="+data.record.enttypes_id+"&id="+data.record.id,				
					'name': data.User.name + " - " + data.Sport.sport_name,
					'caption': "Athletez.com",
					'image': data.record.image_path,
					'description': '',
					'title' :'',
					'type': "gplus"
				};
				new ShareComponent(options);
			};
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	gplusFn();
			     });
	    	} else {
	    		gplusFn();
	    	}
				
		},
		
		tumbler: function() {
			var _self = this, data = this.getShareData();
			
			var tumbler = function() {
			
				var options = {
					'link': "?enttypes_id="+data.record.enttypes_id+"&id="+data.record.id,
					'name': data.User.name + " - " + data.Sport.sport_name,
					'caption': "Athletez.com",
					'image': data.record.image_path,
					'description': '',
					'title' :'',
					'type': "tumbler"
				};
				new ShareComponent(options);	
			};
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	tumbler();
			     });
	    	} else {
	    		tumbler();
	    	}
		},
		
		
		getShareData: function() {
			var record = this.json.payload[this.index];
			return { 
				'record': record,
				'userId': (this.user_id)?"/"+this.user_id:'',
				'pageId': (this.pageId)?"/"+this.pageId:'',
				'User': this.getUserForMedia(),
				'Sport': this.getSportForMedia(),
				'sportId': (record.media_obj.sports_id)?"/sport/"+record.media_obj.sports_id:'',
				'mediaId': (record.media_id)?"/media/"+record.media_id:""
			};
		},
		
		// share media on facebook
		facebook: function() {
			var _self = this, data = this.getShareData();
			var link = this.getLink(data),
				name = data.User.name + " - " + data.Sport.sport_name,
				caption = "Athletez.com",
				image = data.record.image_path,
				description = '';
			var facebookShare = function() {
			var fb = new FbComponent();
				fb.shareOnFacebook({
					method: 'feed',
				    name: name,
				    link: link,
				    picture: image,
				    caption: caption,
				    description: description,
				    success: function() {
				    	alert("Shared successfully.");
				    },
				    error: function() {
				    	alert("Not Shared successfully.");
				    }
				});
			};
			if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	facebookShare();
			     });
	    	} else {
	    		facebookShare();
	    	}
			
		},

		getUserForMedia: function(){
			return this.json.payload[this.index].media_obj.users_obj;
		},

		getSportForMedia: function() {
			return this.json.payload[this.index].media_obj.sports_obj;
		},

		changeImage : function(e) {
			//this.$el.find('.thumb-image-list-h li').removeClass('selected-photo-thumb');
			var $current = $(e.currentTarget);
			//$current.parents('li').addClass('selected-photo-thumb');
			this.index = $current.attr("data-index");
			this.loadImage();
			//this.changeThumbPosition();
		},

		backButton : function(e) {
			if (this.index > 0) {
				this.index--;
				this.loadImage();
				//this.changeThumbPosition();
			}
		},

		nextButton : function(e) {
			console.log("next");
			if (this.index < this.json.payload.length) {
				this.index++;
				this.loadImage();
				//this.changeThumbPosition();
			}
		},

		// change thumb position
		changeThumbPosition : function() {
			// get the values to manuplate scroll
			var $ul = this.$el.find(".thumb-image-list-h"), $li = this.$el.find(".selected-photo-thumb"), liPos = $li.position(), ulPos = $ul.position(), ulWid = $ul.width(), scroll = 0, $tOuter = this.$el.find(".thumbs-outer"), outWid = $tOuter.width();
			// get the li position

			if (liPos.left < 0) {
				scroll = liPos.left + ulPos.left;
			} else if ((liPos.left + $li.width()) > outWid) {
				scroll = liPos.left - outWid;
				scroll += (ulPos.left < 0) ? -(ulPos.left) : -(ulPos.left);
				scroll += $li.width() + 20;
			} else {
				var outerWid = (ulPos.left < 0) ? -(ulPos.left) : ulPos.left;
				scroll = +(outerWid) - $li.width();
			}
			// scrol to teh position
			if (scroll)
				this.$el.find(".thumbs-outer").animate({
					scrollLeft : scroll + 'px'
				}, 400);
		},

		initThumbsSection : function() {
			var _self = this, dataLength = this.json.payload.length, data = {}, standard_thumb = null;
			data.data = [];
			for (var i = 0; i < dataLength; i++) {
				var mpay = this.json.payload[i], extra = {
					_enttypes_id : mpay.enttypes_id,
					_id : mpay.id,
					_index : i
				};

				switch(mpay.enttypes_id) {
					case '23':
						//videos
						if ( typeof (mpay.standard_thumb) == 'object') {
							standard_thumb = mpay.standard_thumb;
							extra._thumbnail = standard_thumb.url;
						} else {
							extra._thumbnail = mpay.thumbs;
						}

						extra._label = mpay.media.name;
						extra._link = "javascript: void(0);";
						if (mpay.media.hasOwnProperty('is_owner'))
							show_edit = mpay.media.is_owner;
						break;
					case '21':
						//images

						extra._label = mpay.media_obj.name;
						extra._link = "javascript: void(0);";

						if ( typeof (mpay.types) == 'object') {
							//console.log(mpay.types);
							if ( typeof (mpay.types.standard_thumb) == 'object') {
								standard_thumb = mpay.types.standard_thumb;
								extra._thumbnail = standard_thumb.url;
							} else if ( typeof (mpay.types.small_thumb) == 'object') {
								standard_thumb = mpay.types.large_thumb;
								extra._thumbnail = standard_thumb.url;
							} else if ( typeof (mpay.types.large_thumb) == 'object') {
								standard_thumb = mpay.types.large_thumb;
								extra._thumbnail = standard_thumb.url;
							} else if ( typeof (mpay.types.original) == 'object') {
								//console.log(mpay.types.original);
								standard_thumb = mpay.types['original'];
								extra._thumbnail = standard_thumb.url;
							}
						}
						if (mpay.media_obj.hasOwnProperty('is_owner'))
							show_edit = mpay.media_obj.is_owner;
						break;
					case '1':
						//users

						if ( typeof (mpay.user_picture_obj) == 'object') {
							if ( typeof (mpay.user_picture_obj.types) == 'object') {
								if ( typeof (mpay.user_picture_obj.types.standard_thumb) == 'object') {
									standard_thumb = mpay.user_picture_obj.types.standard_thumb;
									extra._thumbnail = standard_thumb.url;
								} else if ( typeof (mpay.user_picture_obj.types.large_thumb) == 'object') {
									standard_thumb = mpay.user_picture_obj.types.large_thumb;
									extra._thumbnail = standard_thumb.url;
								} else if ( typeof (mpay.user_picture_obj.types.original) == 'object') {
									//console.log(mpay.types.original);
									standard_thumb = mpay.user_picture_obj.types['original'];
									extra._thumbnail = standard_thumb.url;
								}
							}
						}

						extra._label = mpay.label;
						extra._sublabel = "Coming Soon";
						extra._link = "/#!profile/" + mpay.id;
						if (mpay.hasOwnProperty('is_owner'))
							show_edit = mpay.is_owner;
						break;
					case '8':
						//games
						extra._detailclass = "game";
						extra._thumbnail = mpay.game_picture !== null ? mpay.game_picture.types.small_thumb.url : "http://lorempixel.com/output/sports-q-c-440-440-4.jpg";
						standard_thumb = mpay.game_picture !== null ? mpay.game_picture.types.small_thumb : {
							height : 440,
							width : 440,
							url : "http://cdn.athletez.com/resources/icons/game/square_game.png"
						};
						extra._label = mpay.game_day;
						extra._link = "/#!game/" + mpay.id;
						var team_str = "", teamLength = mpay.teams.length, ucwords = function(str) {
							str = str.toLowerCase();
							return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($1) {
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
						if (mpay.hasOwnProperty('is_owner'))
							show_edit = mpay.is_owner;
						extra._sublabel = team_str;
						break;
				}

				if (standard_thumb != "undefined" && standard_thumb != null) {
					var ratio_x = standard_thumb.width / 110, ratio_y = standard_thumb.height / 110;

					standard_thumb.width = parseInt(standard_thumb.width);
					standard_thumb.height = parseInt(standard_thumb.height);

					var overflow = (standard_thumb.width > standard_thumb.height) ? -((standard_thumb.width / ratio_y) - 110) / 2 : -((standard_thumb.height / ratio_x) - 110) / 2;
					if (overflow > 0)
						overflow = 0;

					extra.styles = {};

					if (standard_thumb.width > standard_thumb.height)
						extra.styles = [{
							'property' : 'min-width',
							'value' : (standard_thumb.width / ratio_y) + 'px'
						}, {
							'property' : 'left',
							'value' : overflow + 'px'
						}];
					else
						extra.styles = [{
							'property' : 'min-height',
							'value' : (standard_thumb.height / ratio_x) + 'px'
						}, {
							'property' : 'top',
							'value' : overflow + 'px'
						}];
				}
				data.data.push(extra);
			}
			this.id = (extra)?extra._id:undefined;
			
			var markup = Mustache.to_html(this.thumbTemplate, data);
			this.$el.find('.thumb-image-list-h').html(markup);
			//setTimeout(function() {
			//	_self.changeThumbPosition();
			//}, 1000);

			//this.thumbScroll();
		},

		thumbScroll : function() {
			
			
			/*this.$el.find('.thumbs-outer').slimscrollHorizontal({
				height : '110px',
				width : '100%',
				alwaysVisible : false,
				start : 'left',
				position : 'bottom',
				wheelStep : 10,
				barZ : 9999,
				wrapperPos : 'absolute',
				wrapperBottom : '0px',
				opacity : .7,
				color : '#9cca3c'
			});*/
			/*
			 var self = this;
			 function moveul(li)
			 {
			 var fullsize = $('div.thumbs-outer').width(),
			 ratio = 200 / fullsize;

			 function leftrange(pos)	{return pos < (fullsize/2);}
			 function getRate(direction,pos)
			 {
			 var rate;
			 if(direction=='left') rate = ratio * pos;
			 else rate = 200-(pos * ratio);
			 rate = rate < 1 ? 1 : rate;
			 return 100/rate;
			 }
			 function moveList(direction,rate)
			 {
			 var scroll = (direction=="right") ? $('div.thumbs-outer').offset().left - rate : $('div.thumbs-outer').offset().left + rate;
			 self.$el.find(".thumbs-outer").animate({scrollLeft: scroll + 'px'}, 400);
			 }
			 li.bind('mousemove',function(e){
			 var mypos = e.pageX - $('div.thumbs-outer').offset().left, moverate,
			 direction = leftrange(mypos) ? "left" : "right;",
			 moverate = getRate(direction,mypos);
			 moveList(direction,moverate);
			 });
			 }

			 var chk_thumblist = setInterval(function(){
			 var li = $('ul.images-list li');
			 if(li.length > 0){	clearInterval(chk_thumblist); moveul(li);	}
			 },500);
			 */
		},

		loadImage : function(trigger) {
			var $videoContainer = $('div#video_container'),
			$loadingImage = $('div.loading_image');
			if (!$videoContainer.hasClass('hidden')) $videoContainer.addClass('hidden');
			if ($loadingImage.hasClass('hidden'))
				$loadingImage.removeClass('hidden');

			var _self = this, mpay = this.json.payload[_self.index], extra = {
				_enttypes_id : mpay.enttypes_id,
				_id : mpay.id,
				_media_id : mpay.media_id,
				_currentIndex : _self.index
			};
			
			if(mpay.has_voted)
				this.$el.find(".photo-player-vote-h").parent().addClass("link-disabled");
			else
				this.$el.find(".photo-player-vote-h").parent().removeClass("link-disabled");			

			if(mpay.num_votes)
				this.$el.find(".votes-num-h").html("("+mpay.num_votes+")").show();
			else
				this.$el.find(".votes-num-h").hide();

			console.error(mpay);
			
			_self.$el.find(".current-image-number-count-h").text(parseInt(_self.index) + 1);
			if (_self.index >= this.json.payload.length - 1) {
				this.$el.find('.next-arrow-h').addClass('disable-arrow-link');
			} else {
				this.$el.find('.next-arrow-h').removeClass('disable-arrow-link');
			}
			
			if (_self.index == 0) {
				this.$el.find('.back-arrow-h').addClass('disable-arrow-link');
			} else {
				this.$el.find('.back-arrow-h').removeClass('disable-arrow-link');
			}
			
			var image_object;
			switch(mpay.enttypes_id) {
				case '23':
					//videos
					this.setupVideo(mpay);
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
					extra._link = "/#!profile/" + mpay.id;
					if (mpay.hasOwnProperty('is_owner'))
						show_edit = mpay.is_owner;
					break;
				case '8':
					//games
					extra._detailclass = "game";
					extra._thumbnail = mpay.game_picture !== null ? mpay.game_picture.types.large_thumb.url : "http://lorempixel.com/output/sports-q-c-440-440-4.jpg";
					extra._label = mpay.game_day;
					extra._link = "/#!game/" + mpay.id;
					var team_str = "", teamLength = mpay.teams.length, ucwords = function(str) {
						str = str.toLowerCase();
						return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($1) {
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
					if (mpay.hasOwnProperty('is_owner'))
						show_edit = mpay.is_owner;
					extra._sublabel = team_str;
					break;
			}
			
			if(extra && extra._label) _self.$el.find(".image-message-h").text(extra._label);

			if (image_object != "undefined" && image_object != null) {
				var self = this, loading_div = this.$el.find('div.loading_image');
				loading_div.css('opacity', '0');
				function showImage(event) {
					var self = event.data.self, image_object = event.data.image_object, totalheight = parseInt(self.$el.height()) * .8, image_height = parseInt(image_object.height) >= 380 ? parseInt(image_object.height) : 380;
					if (image_object.width > image_object.height || image_object.width == image_object.height) {
						var top = totalheight < image_height ? 60 : (totalheight - image_height) / 2;
						event.data.el.css({
							'max-width' : '100%',
							'top' : top + 'px'
						});
					} else if (totalheight > image_height) {
						var top = (totalheight - image_height) / 2;
						event.data.el.css({
							'max-height' : totalheight + 'px',
							'top' : top + 'px'
						});
					} else {
						event.data.el.css({
							'max-height' : totalheight + 'px',
							'top' : '0px'
						});
					}
					event.data.el.css('opacity', '100');
					event.data.el.find('.large-image-h').off('load');
				}


				loading_div.find('.large-image-h').attr("data-id", extra._media_id);
				loading_div.find('.large-image-h').attr('src', image_object.url).on('load', {
					'el' : loading_div,
					'self' : this,
					'image_object' : image_object
				}, showImage);
			}
			this.$el.find('.thumb-image-list-h li').removeClass('selected-photo-thumb');
			this.$el.find('.thumb-link-h[data-index=' + this.index + ']').parents('li').addClass('selected-photo-thumb');
			var userId = (mpay.media_obj && mpay.media_obj.users_id)?mpay.media_obj.users_id:undefined;
			routing.trigger('photo-player-section-reload', extra._enttypes_id, extra._media_id, userId);
			// change Hash URL
			if(this.loadFirstTime) {
				// creating URL
				var currentHashUrl = window.location.hash;
				if(currentHashUrl.match(/\/media\/(.*)[0-9]\//i)) {
					currentHashUrl = currentHashUrl.replace(/\/media\/(.*)[0-9]\//i,'/media/'+extra._media_id+"/");					
				} else if(currentHashUrl.match(/\/media\/(.*)[0-9]/i)) {
					currentHashUrl = currentHashUrl.replace(/\/media\/(.*)[0-9]/i,'/media/'+extra._media_id);					
				} else {
					currentHashUrl = currentHashUrl+"/media/"+extra._media_id;
				}
				routing.navigate(currentHashUrl, {trigger: false});
			} else
				this.loadFirstTime = true;
		
		},
		setupVideo : function(mpay) {

			var self = this;
			function videoShit() {
				var jw = jwplayer(self.playerId);
				
				var c_el = self.$el;
				var jps = {}, sources = [];
				for (var i = 0; i < mpay.video_type.length; i++) {
					console.log(mpay.video_type[i]);
					var thissource;
					thissource = {
						file : mpay.video_type[i].meta_details.url
					};
					sources.push(thissource);
				}
				jps.playlist = [{
					image : mpay.thumbs,
					mediaid : mpay.media.name,
					sources : sources
				}];
				jps.title = mpay.media.name;
				jps.primary = "html5";
				jps.duration = mpay.video_type[0].meta_details.duration_in_ms * 1000;
				jps.modes = [{
					type : "html5",
					src : "http://s3.amazonaws.com/mikewbucket/jw/jwplayer.html5.js"
				}, {
					type : "flash",
					src : "http://s3.amazonaws.com/mikewbucket/jw/jwplayer.flash.swf"
				}];
				jps.skin = "http://s3.amazonaws.com/mikewbucket/jw/skins/glow.xml";
				jps.height = (c_el.height()) * .8;
				jps.width = c_el.width();
				jw.setup(jps);
			}

			var checkforjw = setInterval(function() {
				var jwc = $('#jw_container');
				if (!jwc.length) {
					$('div.image-bg div.loading_image').addClass('hidden');
					$('div#video_container').removeClass('hidden');
				}
				
				if(self.playerId) {
					$("#"+self.playerId).remove();
				}
				
				self.playerId = 'jw-container-'+Math.floor(Math.random() * 90 + 10);
				var $container = $("<div></div>").attr('id', self.playerId);
				$('div#video_container').append($container).removeClass('hidden');
				$('#'+self.playerId).css('z-index','9999');
				console.log("Set CSS",$('#'+self.playerId).css('z-index','9999'));
				clearInterval(checkforjw);
				videoShit();
				
				//if (jwc.length > 0) {
					
					//$("#jw_container").empty();
					
				//	clearInterval(checkforjw);
				//	videoShit();
				//} else {
				//	$('div.image-bg div.loading_image').addClass('hidden');
				//	$('div#video_container').removeClass('hidden');
				//	var $container = $("<div></div>").attr('id', 'jw_container');
				//	$('div#video_container').append($container).removeClass('hidden');
				//}
			}, 500);
		},

		showImage : function($el) {
			$el.find('div.loading_image').css('opacity', '100');
		},

		// **Method** `setOptions` - called by BaseView's initialize method
		setOptions : function(options) {
			this.userId = options.user_id || null;
			this.sportsId = options.sports_id || null;
			this.scheme = options.scheme;
			this.layout = options.layout;
		},

		setUpMainView : function() {
			var self = this;
			var markup = Mustache.to_html(self.template, {});
			$(self.$el).html(markup);
		},
		setUpTagPhotoView : function() {
			//TagView
			var self = this;
			var data = this.json.payload[this.index];
			var isOwner = null;
			var sportsId = null;
			var userId = null;
			if (data && data.media_obj) {
				sportsId = data.media_obj.sports_id || null;
				userId = data.media_obj.users_id || null;
				isOwner = data.media_obj.is_owner || null;
			}

			var setUpTagPhotoViewFn = function() {
				self.tagViewPhoto = new TagView({
					model : new UserModel(),
					template : tagTemplate,
					name : "tag-image " + new Date().toString(),
					destination : "#image-tagging-photo",
					user_id : userId,
					sports_id : sportsId,
					is_owner : isOwner,
					channel : 'tag-image-success-photo'
				});
				self.scheme.push(self.tagViewPhoto);
				self.layout.render();
			};
			
			if(!self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	setUpTagPhotoViewFn();
			     });
	    	} else {
	    		setUpTagPhotoViewFn();
	    	}
			
			
		},
		tagFunction : function(data) {
			// alert("this is tag finish function from basic.js");

			var self = this;

			var fData = data || {};
			var payload = {
				media_id : this.json.payload[this.index].media_id,
				tag_array : JSON.stringify(fData)
			};

			var tagModel = new TagMediaModel(payload);
			tagModel.save();
			$.when(tagModel.request).done(function() {
				self.setUpTagViewSection();
			});
		},
		setUpTagViewSection : function() {
			var _self = this, mpay = this.json.payload[_self.index], extra = {
				_enttypes_id : mpay.enttypes_id,
				_id : mpay.id,
				_media_id : mpay.media_id,
				_currentIndex : _self.index,
				_uploader : mpay.media_obj.user_obj
			};
			routing.trigger('tags-fetch-new-form-data', extra._enttypes_id, extra._media_id,mpay);
		},
		TagMyself : function(e){
			var self = this;
			var newData ={1 : [this.getUserId()]};
			var payload = {
				media_id : this.json.payload[this.index].media_id,
				tag_array : JSON.stringify(newData)
			};
			
			var tagMyselfFn = function() {
			
				var tagMyselfModel = new TagMyselfModel(payload);
				tagMyselfModel.user_id = self.getUserId();
				tagMyselfModel.save();
				$.when(tagMyselfModel.request).done(function() {
					self.setUpTagViewSection();
					$(e.target).parents("li").addClass("link-disabled");
				});
			};
			
			if(!self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	tagMyselfFn();
			     });
	    	} else {
	    		tagMyselfFn();
	    	}
			
		},
		getUserId: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn) return routing.loggedInUserId;
			return null;

		},

	});
	return PhotoPlayerView;
});
