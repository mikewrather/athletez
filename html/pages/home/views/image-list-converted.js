// The Image List
// --------------

define(
		[ 'facade', 'views', 'utils', 'media/views/image-item', 'media/views/image-list' ],
		function(facade, views, utils, ImageItemView,ImageListView) {

			var ImageListAbstract, $ = facade.$, _ = facade._, Channel = utils.lib.Channel, CollectionView = views.CollectionView, SectionView = views.SectionView;

			ImageListAbstract = CollectionView.extend(SectionView.prototype);

			HomeImageListView = ImageListView.extend({

//				__super__ : CollectionView.prototype,

				id : "image-list",
		//		name : "Image List",
				tagName : "ul",
				hideAddView:true,
				page: 0,
				page_limit: 12,

				// Tag for the child views
		//		_tagName : "li",
		//		_className : "image",
		//		events: {
		//			'click .open-photo-player-h': 'initPhotoPlayer'
		//		},

				// Store constructor for the child views
		//		_view : ImageItemView,

				initialize : function(options) {
					var _self = this;
					//console.log(options);
					//console.log(this);
					this.name = options.name || this.name;
					this.media_id = options.media_id;
					this.pageName = options.pageName;
					this.viewName = options.viewName;
					this.userId = options.user_id;

					ImageListView.prototype.initialize.call(this, options);
					if (!this.collection) {
						throw new Error(
								"ImageListView expected options.collection.");
					}
					_.bindAll(this);
					this.addSubscribers();
					

				},
		 /*
				initPhotoPlayer: function(e) {
					e.preventDefault();
       				var index = ($(e.target).parents('li').index());     
       				routing.trigger('photo-player-init', index, this.collection, this.collection.id, undefined ,  this.pageName);
       			},
			*/
				// Child views...
				childViews : {}

			});

			return HomeImageListView;
		});
