// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list'],
function(facade,  utils,   BaseImageListView) {

    var FansImageListView;
    FansImageListView = BaseImageListView.extend({
	    imagetype: 'large_thumb',
        setupAddView: function() {},
        addButtons: function() {
			var _self = this;
            setTimeout(function() {
	            if(!$("#add-fans-icons").length) {
	            	var html = '<li id="add-fans-icons" class="add-tile-outer">\
					<div>\
					<a href="javascript: void(0);" class="add-to-fans-h add-to-fans pull-left tiles"></a>\
					<span class="hide">Add to fans list</span></div>\
					<div>\
					<span class="hide">Add to fans list</span>\
					<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a></div>\
					</li>';
	            	_self.$el.find(_self.listView).prepend(html);
            	}
            	var json = _self.collection.toJSON();
		        	for(var i in json) {
		        		if(routing.loggedInUserId == json[i].payload.id) {
		        			_self.$el.find(".add-to-fans-h").addClass("link-disabled");
		        		}
		        	}
            }, 0);
		}
    });
    return FansImageListView;
});