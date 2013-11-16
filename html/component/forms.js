/* 
 *  Form Component
 *  Author: Sanjay Kumar
 * 	Description: 
 *  Date: 10th November, 2013
 * 
 * */

define(['require','facade', 'views', 'utils', 'vendor'], function(require) {
	
	return function(fields, $target) {
        var self, facade = require('facade'), views = require('views');
        var User = facade.Backbone.Model.extend({
		    schema: fields
		});
		
		var user = new User();
		var form = new facade.Backbone.Form({
		    model: user
		}).render();
		$target.append(form.el);
		return form;
	};
	
});