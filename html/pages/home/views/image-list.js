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
					'click .image-outer-h': 'initPhotoPlayer'
				},
			

				// Store constructor for the child views
				_view : ImageItemView,

				initialize : function(options) {
					var _self = this;
					console.log(options);
					console.log(this);
					this.name = options.name || this.name;
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
        	
				},
				
				initPhotoPlayer: function(e) {
					console.log(this.collection);
       				var index = ($(e.target).parents('li').index());     
       				routing.trigger('photo-player-init', index, this.collection, this.collection.id);
       			},

				// Child views...
				childViews : {}

			});

			return ImageListView;
		});
