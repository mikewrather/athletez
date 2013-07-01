// The Image List
// --------------

define(
		[ 'facade', 'views', 'utils', 'pages/home/views/image-item' ],
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

				// Store constructor for the child views
				_view : ImageItemView,

				initialize : function(options) {

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
				},

				// Child views...
				childViews : {}

			});

			return ImageListView;
		});
