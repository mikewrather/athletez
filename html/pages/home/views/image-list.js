// The Image List
// --------------

define(
		[ 'facade', 'views', 'utils', 'media/views/image-item', 'media/views/image-list'],
		function(facade, views, utils, ImageItemView, BaseImageListView) {

			var ImageListView, ImageListAbstract, $ = facade.$, _ = facade._, Channel = utils.lib.Channel, CollectionView = views.CollectionView, SectionView = views.SectionView;

			ImageListAbstract = CollectionView.extend(SectionView.prototype);

			ImageListView = BaseImageListView.extend({

				__super__ : CollectionView.prototype,

				id : "image-list",
				name : "Image List",
				tagName : "ul",

				// Tag for the child views
				_tagName : "li",
				_className : "image",
				page: 0,
				page_limit: 9999,
				allItemsInCollection: false,
			//	events: {
			//		'click .open-photo-player-h': 'initPhotoPlayer'
			//	},

				// Store constructor for the child views
				_view : ImageItemView,
				hideAddView:true,

				initPhotoPlayer: function(e) {
					e.preventDefault();
       				var index = ($(e.target).parents('li').index());     
       				routing.trigger('photo-player-init', index, this.allItemsInCollection, this.collection.id, undefined ,  this.pageName);
       			},



				// Child views...
				childViews : {}

			});

			return ImageListView;
		});
