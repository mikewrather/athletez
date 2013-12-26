// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var FansImageListView;
    FansImageListView = BaseImageListView.extend({
	    imagetype: 'large_thumb',
		//name: "fans List",
        setupAddView: function() {},
        addButtons: function() {
			var _self = this;
            setTimeout(function() {
	            if(!$("#add-fans-icons").length) {
	            	_self.$el.find(_self.listView).prepend('<li id="add-fans-icons"><a href="javascript: void(0);" class="add-to-fans-h">Add to fans list</a></li>');
            	}
            	var json = _self.collection.toJSON();
		        	for(var i in json) {
		        		if(routing.loggedInUserId == json[i].payload.id) {
		        			_self.$el.find("#add-fans-icons").addClass("hide");
		        		}
		        	}
            }, 0);
		}
    });
    return FansImageListView;
});