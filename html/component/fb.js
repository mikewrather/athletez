/*
 *  Facebook Component
 *  Author: Sanjay Kumar
 * 	Description: To share on facebook
 *  Date: 10th November, 2013
 *
 * */

define(['require', 'facade', 'views', 'utils', 'vendor','facebook'], function(require) {
	return function(options) {
		var _self = this, scriptId = 'facebook-jssdk-api',
		
		// set options
		setOptions = function() {
			if(options) {
				for(var i in options) {
					this.currentTarget = options[i];				
				}
			}
		}(),
		
		// initialize function
		init = function() {
			FB.init({
			    appId   : App.Settings.appId,// App ID
			    status  : true, // check login status
				cookie  : true, // enable cookies to allow the server to access the session
				xfbml   : true,  // parse XFBML
				oauth   : true
            });
		},
		
		// register timeout
		loadScriptTimeOut = function(fn, options) {
			setTimeout(function() {
				_self[fn](options);
			}, 2000);
		};
		
		// check if script is already injected or not
		checkIfScriptExists = function() {
			var exists = (document.getElementById(scriptId))?true:false;
			manageLoader(exists);
			return exists;
		},
		
		// show hide loading image on button 
		manageLoader = function(exists) {
			if(this.currentTarget) {
				if(exists) {
					$(this.currentTarget).removeClass("blue-loading");
				} else {
					$(this.currentTarget).addClass("blue-loading");					
				}
			}
		},

		// share on facebook
		this.shareOnFacebook = function(options) {
			if(FB && typeof(FB) != "undefined") {
				if(options.link)
					 var link = window.location.protocol+"//"+window.location.host+"/"+options.link+"/";
				else
					var link = undefined;
						 
				  FB.ui({
				    method: options.method || '',
				    name: options.name || 'Facebook Dialogs',
				    link: link || 'http://localhost/',
				    picture: options.picture || '',
				    caption: options.caption || '',
				    description: options.description || ''
				  },
				  function(response) {
				    if (response && response.post_id) {
				      if(options.success && _.isFunction(options.success))
				      	 options.success();
				    } else {
				      if(options.error && _.isFunction(options.error))
				      	 options.error();
				    }
				  }
				);
			} else {
				new loadScriptTimeOut('shareOnFacebook', options);
			}
		};
		
		
		// send invite on facebook
		this.sendInvite = function(options) {

			if(FB && typeof(FB) != "undefined") {

				if(options.link)
					 var link = window.location.protocol+"//athletez.com/"+options.link+"/";
				else
					var link = undefined;
				
				  FB.ui({
				    method: options.method || 'send',
				    to: options.to || '',
				    name: options.name || 'Come join Me on Atheletez',
				    link: link || 'http://localhost/',
				    picture: options.picture || '',
				    description: options.description || ''
				  },
				  function(response) {
				    if (response && response.success) {
				      if(options.success && _.isFunction(options.success))
				      	 options.success();
				    } else {
				      if(options.error && _.isFunction(options.error))
				      	 options.error();
				    }
				  });
			} else {
				init();
				new loadScriptTimeOut('sendInvite', options);
			}
		};
		
		// get friends from facebook
		this.getFriends = function() {
			if(FB && typeof(FB) != "undefined") {
				FB.api('/me/friends?fields=id,first_name', function(response) {

				    console.error(response);

				    //var randomFriend = Math.floor(getRandom(0, response.data.length));
				    //gFriendID = response.data[randomFriend].id;
				    //gSmashUIText.innerHTML = "Smash " + response.data[randomFriend].first_name + " !";
				});
			} else {
				new loadScriptTimeOut('getFriends', {});
			}
		};
		
		// calling initialize function
		init();
		
	};

}); 