define([
	'require',
	'text!/login/templates/logintemplate.html', 
    'backbone',
    'underscore',
    'signup',
    'views',
    'facade', 
    'utils'
	],function(require,signInTemplate,backbone,_,signupController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SigninBasicView = SectionView.extend({
              
              initialize: function (options) {
                   this.signcontroller = new signupController();
                    this.template =  _.template(signInTemplate);
                    this.$el = $(options.destination);
                    this.render();
                                    
                },
                render: function(){

                    this.$el.html(this.template);
                    
                    $("#errormsg, #preview").html("");
                    debug.log("Image upload basic view");   
                     $('#Loginview').modal('show') ;
                     $('#Loginview').on('hide', function () {
                        $('div#LoginPopup').empty();
                        //routing.trigger('refresh-onImageUpload');
                      });
                   
                },     
                events:{
                  "click a#signup": "signupUser", 
                },
                signupUser: function(event){
                	event.preventDefault();
                    $('#Loginview').modal('hide');
                    routing.trigger("register-basic");

					//routing.trigger("add-user");
                },
               
               


            });
            
            return SigninBasicView;

    }); 