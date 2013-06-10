// The Image List
// --------------

define(['facade','views', 'utils', 'media/views/image-item', 'media/views/image-board', 'media/views/add-image'], 
function(facade,  views,   utils,   ImageItemView,            ImageBoardView,            AddImageView) {

    var ImageListView, 
        ImageListAbstract,
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        CollectionView = views.CollectionView,
        SectionView = views.SectionView;

    ImageListAbstract = CollectionView.extend(SectionView.prototype);

    ImageListView = ImageListAbstract.extend({

        __super__: CollectionView.prototype,

        id: "image-list",
        name: "Image List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "image",

        // Store constructor for the child views
        _view: ImageItemView,

        initialize: function(options) {

	        console.log(options);
	        console.log(this);

            CollectionView.prototype.initialize.call(this, options);
            if (!this.collection) {
                throw new Error("ImageListView expected options.collection.");
            }
            _.bindAll(this);
            this.addSubscribers();
            console.log("ngst");
       //     debugger;
            this.setupBoardView();
       //     debugger;
            console.log("fghj");
            this.setupAddView();
        },

        // Child views...
        childViews: {},

        // Event handlers...

        // Add Views
        setupAddView: function() {

            var listView = this,
                addView = new AddImageView({collection: this.collection}),
                renderAddView = this.addChildView(addView);

            this.childViews.form = addView;
            this.callbacks.add(function() {
                renderAddView();
            });
            
            function callback (data) {
                addView.model = data;
                addView.render();
                alert("render");
                listView.$el.append(addView.el);
            }
            
            Channel('addimage:fetch').subscribe(callback);
        },

	    filterWithImageType: function(type) {
		    var c = this.collection;
			$.each(c.models, function(i, field){
				_.each(field.get("payload").types, function(element, index){
					if (index == type){
						field.get("payload").image_path = element.url;
					}
				});
		    });

		    return c;

		},

        setupBoardView: function() {
        	debug.log("setupBoardView media/views/image-list.js");
            if (this.collection.size() == 0)
                return;
            var filtered_images = this.filterWithImageType( this.imagetype );
            var listView = this,
                addView = new ImageBoardView({collection: filtered_images, model: filtered_images.at(0)}),
                renderAddView = this.addChildView(addView);
            this.childViews.board = addView;
            this.callbacks.add(function() {
                renderAddView();
                addView.render();
                listView.$el.prepend(addView.el);
            });
            
            function changeBoard(data) {
                addView.model = data;
                addView.render();
            }
            
            Channel('changeimage' + this.collection.id).subscribe(changeBoard);
        }

    });

    return ImageListView;
});
