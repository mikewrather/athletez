define(['facade', 'media/collections/images', 'utils','signup/views/facebooksignup'], function(facade, MediaImageList, utils,fbreg) {
	return MediaImageList.extend({
		url : function() {
			if (testpath) return testpath + 'user/fbfriends';
			return '/api/user/fbfriends';
		},

		fetchError: function(e,n){
			ga('send', 'event', 'popup', 'open', 'FB Auth Token Renew');
			var fbregistration = new fbreg();
			fbregistration.signupFacebook("linkWithFB");
		}

	});
});