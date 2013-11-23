/*
 *  Facebook Component
 *  Author: Sanjay Kumar
 * 	Description: To share on facebook
 *  Date: 10th November, 2013
 *
 * */

define(['require', 'facade', 'views', 'utils', 'vendor'], function(require) {
	return function() {
		var _self = this, facebookLoad = false, scriptId = 'facebook-jssdk',
		// initialize function
		init = function() {
			window.fbAsyncInit = function() {
                FB.init({
                    appId      : '396541317103569',//'219148511595084', // App ID
                    status     : true, // check login status
                    cookie     : true, // enable cookies to allow the server to access the session
                    xfbml      : true,  // parse XFBML
                    oauth      : true
                });
            };
			loadFacebook();
		},
		
		// register timeout
		loadScriptTimeOut = function(fn, options) {
			setTimeout(function() {
				_self[fn](options);
			}, 2000);
		};
		
		// check if script is already injected or not
		checkIfScriptExists = function() {
			return (document.getElementById(scriptId) || facebookLoad)?true:false;
		},
		
		// load facebook API file
		loadFacebook = function() {
		     // if already added return true
			if(!checkIfScriptExists()) {
				 var js, ref = document.getElementsByTagName('script')[0];
		         js = document.createElement('script'); js.id = scriptId; js.async = true;
		         js.src = "//connect.facebook.net/en_US/all.js";
		         ref.parentNode.insertBefore(js, ref);
		         facebookLoad = true;
	        }
		};
		
		// share on facebook
		this.shareOnFacebook = function(options) {
			if(checkIfScriptExists() && "undefined" != typeof FB) {
				  FB.ui({
				    method: options.method || '',
				    name: options.name || 'Facebook Dialogs',
				    link: options.link || 'http://localhost/',
				    picture: options.picture || '',
				    caption: options.caption || '',
				    description: options.description || ''
				  },
				  function(response) {
				    if (response && response.post_id) {
				      if(options.success && _.isFunction(options.success))
				      	 options.success();
				      else
				      	alert('Item Shared successfully.');
				    } else {
				      if(options.error && _.isFunction(options.error))
				      	 options.error();
				      else
				      	alert('Item Not Shared successfully.');
				    }
				  }
				);
			} else {
				new loadScriptTimeOut('shareOnFacebook', options);
			}
		};
		
		// calling initialize function
		init();
		
	};

}); 