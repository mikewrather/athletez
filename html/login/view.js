define([
	'underscore',
    'backbone',
    'jquery',
	'text!/login/templates/logintemplate.html',
	
	], function(_, backbone, $, templateNew){

		return backbone.View.extend({
			//el: $("#logincontainer"),
			render: function(){
				
				console.log($(this.el));
				//console.log(this.template(this));
				$(this.el).html(this.template(this));
				$("#main-content").html($(this.el).html());
			},
			initialize: function(){
				
				this.template = _.template(templateNew);
			
			this.render();
			}


		});
	});	