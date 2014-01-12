// The Image List
// --------------

define(['facade', 'utils', 'media/views/image-list', 'component/fb', 'votes/models/follow'], function(facade, utils, BaseImageListView) {

	var FansImageListView, FBComponent = require('component/fb'),
	 followModel = require('votes/models/follow');
	FansImageListView = BaseImageListView.extend({
		imagetype : 'large_thumb',
		setupAddView : function() {
		},

		events : {
			'click .invite-to-fb-h' : 'inviteFBFriend',
			"mouseover a.tiles" : "showText",
			"mouseout a.tiles" : "showicon",
			"click .add-to-fans-h" : "addToFanList"
		},
		
		// show text
        showText: function(e) {
        	$(e.target).parent().find("span").removeClass("hide");
        },
        
        // shoe icon
        showicon: function(e) {
        	$(e.target).parent().find("span").addClass("hide");        	
        },

		inviteFBFriend : function(e) {
			var _self = this, options = {};
			options.subject_id = this.target_id;
			options.enttype_id = this.controllerObject.basics.get("payload").enttypes_id;
			routing.trigger('fbInvite', undefined, options);
		},
		
		addToFanList: function(e) {
			 e.preventDefault();
		    console.error(this.mainModel);
		    var _self = this, followFn = function(callback) {
		    	var followModelOb = new followModel();
				followModelOb.subject_id = _self.collection.id;
				followModelOb.entity_id = _self.controllerObject.basics.get("payload").enttypes_id;
				followModelOb.save();
				$.when(followModelOb.request).done(function() {
					if(typeof(followModelOb.get('payload').follower) =='object' && typeof(followModelOb.get('payload').subject) =='object' && followModelOb.get('payload').id > 0) {
						$(e.target).addClass('link-disabled');
						if(_self.controllerObject && _self.controllerObject.reloadFans) _self.controllerObject.reloadFans();
					}
					if(callback) callback();
				});
		    };
		    
		    if(!_self.checkForUser()) {
			     routing.trigger('showSignup', function(callback) {
			     	followFn(function() {
			     		if(callback) callback();
			     	});
			     });
	    	} else {
	    		followFn();
	    	}
		},

		addButtons : function() {
			var _self = this;
			setTimeout(function() {
				if (!$("#add-fans-icons").length) {
					var html = '<li id="add-fans-icons" class="add-tile-outer">\
					<div>\
					<a href="javascript: void(0);" class="add-to-fans-h add-to-fans pull-left tiles"></a>\
					<span class="hide">Add me to list</span></div>\
					<div>\
					<span class="hide">Invite friends to join</span>\
					<a href="javascript: void(0);" class="fb-invite-tile-btn invite-to-fb-h tiles pull-right" title="Add to fb"></a></div>\
					</li>';
					_self.$el.find(_self.listView).prepend(html);
				}
				var json = _self.collection.toJSON();
				for (var i in json) {
					if (routing.loggedInUserId == json[i].payload.id) {
						_self.$el.find(".add-to-fans-h").addClass("link-disabled");
					}
				}
			}, 0);
		}
	});
	return FansImageListView;
}); 