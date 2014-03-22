define(['require', "vendor/plugins/qtip/qtip"], function() {
		// jquery plugin for qtip wrapper	
		jQuery.fn.qtip2 = function(options, showOnMobile) {
			if(!routing.mobile || showOnMobile) {
				$(this).each(function(){
          			$(this).qtip(options);
        		});
			}
		};

		return function() {		
		};
});


