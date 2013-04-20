// Facebook Image List
// --------------

define(['facade', 'utils', 'media/views/image-list', 'registration/views/fbimage-board'],
function(facade,  utils,   BaseImageListView,         FBImageBoardView) {

    var RegistrationFBImageListView,
        _ = facade._;

    RegistrationFBImageListView = BaseImageListView.extend({

        id: "fbimage-list",
        name: "Facebook Image List",
        tagName: "ul",

        // Tag for the child views
        _tagName: "li",
        _className: "fbimage",
        
        setupAddView: function() {
            
        },
        
        setupBoardView: function() {
            var listView = this,
                addView = new FBImageBoardView({collection: this.collection, model: this.collection.at(0)}),
                renderAddView = this.addChildView(addView);
            
            this.childViews.board = addView;
            this.callbacks.add(function() {
                renderAddView();
                addView.render();
                listView.$el.prepend(addView.el);
                _.delay(addView.initCropView, 700);
            });
            
            Channel('changeimage' + this.collection.id).subscribe(this.changeBoard);            
        },
        
        changeBoard: function(data){
            this.removeCropView();
            this.childViews.board.model = data;
            this.childViews.board.render();
            this.childViews.board.initCropView();
        },
        
        initCropView: function() {
            this.childViews.board.initCropView();
        },
        
        removeCropView: function() {
            this.childViews.board.removeCropView();
        }

    });

    return RegistrationFBImageListView;
});
