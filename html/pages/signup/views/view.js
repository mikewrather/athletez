define([
	'views',
    'jquery',
	'text!/login/templates/registration.html',
	
	], function(BaseView, $, templateNew){
		

		return BaseView.extend({
			template: templateNew,
			//el: $("#logincontainer"),
			render: function () {
            BaseView.prototype.render.call(this);
            this.input = this.$("#main-content");            
        }
			


		});
	});	