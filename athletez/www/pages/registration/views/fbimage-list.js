// Facebook Image List
// --------------

define(['facade',
         'utils',
         'views',
         'registration/views/fbimage-item',
        //'media/views/image-list',
        'registration/views/fbimage-board', 
        'registration/views/picture_buttons', 
        'models/base'],
       function(facade,  
                utils,
                views,
                FBImageItemView,
                //BaseImageListView,
                FBImageBoardView,                   
                RegistrationPicButtonsView, 
                BaseModel) {

    var RegistrationFBImageListView,
        BaseView = views.BaseView
        _ = facade._;

    RegistrationFBImageListView = BaseView.extend({

       initialize:function(options){
        console.log(this.options,"options.collection");
        _.map(this.collection, function(value, key){
                console.log(value.payload,"value.attributes");
             //   newCover = new cover({
               //      model: value.attributes
                //});
           // $('.scroller').append(newCover.render().$el);   
            });      
        },
        createElement:function(){

        }

    });

    return RegistrationFBImageListView;
});
