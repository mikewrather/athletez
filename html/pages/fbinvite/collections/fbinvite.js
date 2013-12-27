define(['facade', 'media/collections/images', 'utils'], function(facade, MediaImageList, utils) {
	return MediaImageList.extend({
		url : function() {
			if (testpath) return testpath + 'user/fbfriends';
			return '/api/user/fbfriends';
		}
	});
});