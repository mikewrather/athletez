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
    "signup/views/registration-basics-final",
    "signup/models/registration-basics-final"
	],function(require,  signupBasicTemplate,backbone,_,RegistrationController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	FbHeader=require('signup/views/facebooksignup'),
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	signupBaseFinalView=require("signup/views/registration-basics-final"),
        	signupBaseFinalModel=require("signup/models/registration-basics-final"),
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
				
				initialize: function (options) {
					if(options.openAsaPage) this.openAsaPage = options.openAsaPage;
						
					//alert(options.destination);
                    this.registrationController = new RegistrationController({
                    	"route": ""
                     });
                     
            		this.template =  _.template(signupBasicTemplate, {onlyRegister: (this.openAsaPage)?true:false});
            		this.$el = $(options.destination);
					console.log("REG BLOCK:",this.$el);

                    $("#errormsg, #preview").html("");
            
                     SectionView.prototype.initialize.call(this, options);   
                     debug.log("Image upload basic view");   
                     
                     if(!this.openAsaPage) {
	                     $('#RegModal').modal('show') ;
	                     
	                     $('#RegModal').on('hidden', function () {
	               
	                        //routing.trigger('refresh-onImageUpload');
	                    });
	                    $('#RegModal').on('hide', function () {
	                        $('div#modalPopup').remove();
	                        //routing.trigger('refresh-onImageUpload');
	                      });
                     }
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
                    
                    if(this.openAsaPage && flag) {
                    	
                    	this.basic_type	= new signupBaseFinalModel();
						var options = {
							model : this.basic_type,
							name : "Final registration",
							attr: {"attr": fields},
							openAsPopUp: true
						};
						this.selectRegisterBasicFinalView = new signupBaseFinalView(options);
						//$(".register-wrapper-h").unbind().html("");
						$("#RegModal .modal-body").append(this.selectRegisterBasicFinalView.$el);
						$('#RegModal').modal('show') ;
                    } else {
                   		if(flag) routing.trigger("register-basic-final", fields, page);          
        			}
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