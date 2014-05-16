// The Image List
// --------------

define(['facade', 'utils', 'packages/fbinvite/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var ProfileImageVideoListView;

    ProfileImageVideoListView = BaseImageListView.extend({

	    imagetype: 'large_thumb',
		name: "Image List",
		
        setupAddView: function() {
        },

	//    initialize:function(options){
	//	    console.log(options);
	//	    BaseImageListView.prototype.initialize.call(this,options);
	  //  },

	    afterRender:function(){
		//
	    }
    });

    return ProfileImageVideoListView;
});