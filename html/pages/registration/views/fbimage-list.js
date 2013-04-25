// Facebook Image List
// --------------

define(['facade', 'utils', 'registration/views/fbimage-item', 'media/views/image-list', 'registration/views/fbimage-board', 'registration/views/picture_buttons', 'models/base'],
function(facade,  utils,   FBImageItemView,                    BaseImageListView,         FBImageBoardView,                   RegistrationPicButtonsView, BaseModel) {

    var RegistrationFBImageListView,
        _ = facade._;

    RegistrationFBImageListView = BaseImageListView.extend({

        id: "fbimage-list",
        name: "Facebook Image List",
        tagName: "div",

        // Tag for the child views
        _tagName: "div",
        _className: "fbimage",
        
        _view: FBImageItemView,
        
        setupAddView: function() {
            var listView = this,
                buttonsView = new RegistrationPicButtonsView(),
                renderButtonsView = this.addChildView(buttonsView);
            
            this.childViews.buttons = buttonsView;
            this.callbacks.add(function() {
                renderButtonsView();                
                buttonsView.render();
                listView.$el.append(buttonsView.el);
            });
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
                _.delay(addView.initCropView, 400);
            });
            
            Channel('changeimage' + this.collection.id).subscribe(this.changeBoard);
            
            // Use This Image
            function fbUseThisImage() {
                var board = listView.childViews.board;
                board.getImageInfo();
                var payload = board.model.get('payload');
                var saveImage = new BaseModel(payload);
                saveImage.url = function() {
                    if (testpath)
                        return testpath + '/user/savecrop';
                    return '/api/user/savecrop';
                }
                saveImage.saveSuccess = function(model, response) {
                    var exec_data = model.get('exec_data');
                    var payload = model.get('payload');
                    if (!exec_data['exec_error'] && payload) {
                        Channel("registration-change-picture").publish(payload['picture']);
                    }
                    $('#' + listView.id).dialog('close');
                }                
                saveImage.saveError = function(model, response) {
                    $('#' + listView.id).dialog('close');
                }
                saveImage.save();                
            }
            
            Channel("registration-use-image").subscribe(fbUseThisImage);
            
            // Upload User Image
            function uploadNewImage() {
                $('#' + listView.id).dialog('close');
            }
            
            Channel("registration-upload-image").subscribe(uploadNewImage);
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
