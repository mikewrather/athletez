define(['require', "vendor/plugins/qtip/qtip"], function() {
		// jquery plugin for qtip wrapper	
		jQuery.fn.qtip2 = function(options) {
			if(!routing.mobile) {
				$(this).qtip(options);
			}
		};
			
		return function() {		

		};
});


