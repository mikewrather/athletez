/*
 *  Share Component
 *  Author: Sanjay Kumar
 * 	Description: To share on twitter, gplus, tumbler
 *  Date: 10th November, 2013
 *
 * */

define(['require', 'facade', 'views', 'utils', 'vendor'], function(require) {
	var url = {
		"gplus" : "https://plus.google.com/share",
		"twitter" : "http://twitter.com/home",
		"tumbler" : "http://www.tumblr.com/share/photo/"
	}, popupName = {
		"gplus" : "Gplud_share",
		"twitter" : "Twitter_share",
		"tumbler" : "Tumblr_share"
	};

	return function(options) {
		var _self = this,
		// initialize function
		init = function() {
			if (options) {
				share();
			}
		},

		// share popup
		share = function() {
			var sUrl = getUrl();

			if (sUrl)
				window.open(sUrl, popupName[options.type], 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		},

		// get url of social site
		getUrl = function() {
			var u = (url && options.type && url[options.type]) ? url[options.type] : undefined;
			switch(options.type) {
				case "twitter":
					 u = u + "?status="+getLink();
				break;
				case "gplus":
					u = u + "?url="+getLink();
				break;
				case "tumbler":
				console.error(options.image);
					u = u + "?caption="+options.caption+"&source="+encodeURIComponent(options.image);//+"&u="+getLink()+"&t="+options.description+"&s="+options.description;
				break;
			}
			return (u);
		},

		// get the link to share
		getLink = function() {
			return encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + options.link + "/");
		};

		// calling initialize function
		init();

	};

});
