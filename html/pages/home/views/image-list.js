// The Image List
// --------------

define(
		[ 'facade', 'views', 'utils', 'media/views/image-item' ],
		function(facade, views, utils, ImageItemView) {

			var ImageListView, ImageListAbstract, $ = facade.$, _ = facade._, Channel = utils.lib.Channel, CollectionView = views.CollectionView, SectionView = views.SectionView;

			ImageListAbstract = CollectionView.extend(SectionView.prototype);

			ImageListView = ImageListAbstract.extend({

				__super__ : CollectionView.prototype,

				id : "image-list",
				name : "Image List",
				tagName : "ul",

				// Tag for the child views
				_tagName : "li",
				_className : "image",
				events: {
					'click .open-photo-player-h': 'initPhotoPlayer'
				},

				// Store constructor for the child views
				_view : ImageItemView,

				initialize : function(options) {
					var _self = this;
					//console.log(options);
					//console.log(this);
					this.name = options.name || this.name;
					this.media_id = options.media_id;
					this.pageName = options.pageName;
					this.userId = options.user_id;
					CollectionView.prototype.initialize.call(this, options);
					if (!this.collection) {
						throw new Error(
								"ImageListView expected options.collection.");
					}
					_.bindAll(this);
					this.addSubscribers();
					
					//$(document).off('click','.image-outer-h');
					//$(document).on('click','.image-outer-h', function(e) {
					//	_self.initPhotoPlayer(e);
					//});
					
					if(_self.media_id) {
						setTimeout(function() {
							var allData = _self.collection.toArray();	
							if(allData) {
								for(var i in allData) {
									if(_self.media_id == allData[i].get("payload").media_id) {
										routing.trigger('photo-player-init', i, _self.collection, _self.collection.id, undefined, _self.pageName);
										break;
									}
								}
							}
						}, 500);
					}
				},
				
				initPhotoPlayer: function(e) {
					e.preventDefault();
       				var index = ($(e.target).parents('li').index());     
       				routing.trigger('photo-player-init', index, this.collection, this.collection.id, undefined ,  this.pageName);
       			},

				// Child views...
				childViews : {}

			});

			return ImageListView;
		});
