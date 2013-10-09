define([
	'require',
	'text!signup/templates/registration.html',
    
    'backbone',
    'underscore',
    'registration',
    'views',
    'signup/views/facebooksignup', 
    'facade', 
    'utils', 

	],function(require,  signupBasicTemplate,backbone,_,RegistrationController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	FbHeader=require('signup/views/facebooksignup'),
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
				
				initialize: function (options) {
                    this.registrationController = new RegistrationController({
                    "route": ""
                     });
            		this.template =  _.template(signupBasicTemplate);
            		this.$el = $(options.destination);
                    $("#errormsg, #preview").html("");
            
                     SectionView.prototype.initialize.call(this, options);   
                     debug.log("Image upload basic view");   
                     $('#RegModal').modal('show') ;
                     $('#RegModal').on('hidden', function () {
               
                        //routing.trigger('refresh-onImageUpload');
                    });
                    $('#RegModal').on('hide', function () {
                        $('div#modalPopup').remove();
                        //routing.trigger('refresh-onImageUpload');
                      });
            		this.render();
            		        		
        		},
        		render: function(){

        			this.$el.html(this.template);
        		},
        		events:{
        		"click .regsubmit":"next",
                "click #fbpane":"signupFacebook"
                 
        		},
        		next: function(event){
        			event.preventDefault();
        			
        			//backbone.validation.bind(this);
        			var fields = this.$(":input").serializeArray();
                    var flag= true;
                	$.each(fields, function( index, value ) {
                       if(!value.value){
                        alert(value.name +" is blank");
                        flag = false;
                        return false;
                       }
                      
                    });
                   if(flag)
                   //Channel('register-basic-final').publish(fields);
                	routing.trigger("register-basic-final", fields);           

                    
        		},
                //*************//
                
               //***************//

               signupFacebook: function(event) {
                    event.preventDefault();
                    $('#RegModal').modal('hide') ;
                     headView = new FbHeader();
                     headView.signupFacebook();
            
               },


        		

			});

		return SignupBasicView;

	});	