define([
	'require',
	'text!signup/templates/registration.html',
    
    'backbone',
    'underscore',
    'registration',
    'login',
    'views',
    'signup/views/facebooksignup', 
    'facade', 
    'utils', 
    "signup/views/registration-basics-final",
    "signup/models/registration-basics-final",
    
	],function(require, signupBasicTemplate,backbone,_,RegistrationController,loginController) {
			
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
                "click #fbpane":"signupFacebook",
                "click #reglogin a":"showLogin"
                 
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
                    
                    try {
                    
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
						
						if(!$("#RegModal").length) {
							$("body").append('<div id="RegModal" class="modal hide fade" tabindex="-1" role="dialog"'+
							 'aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"><button type="button"'+
							 ' class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
							'</div><div id="main-contentreg"></div>'+
							'<div class="modal-body"><div class="inner-content-h"></div><div id="errormsg"></div><div id="preview"></div></div></div>');
						}
						$("#RegModal .inner-content-h").html(this.selectRegisterBasicFinalView.$el);
						$('#RegModal').modal('show');
                    } else {
                   		if(flag) routing.trigger("register-basic-final", fields);          
        			}
        			} catch(e) {
        				
        			}
        			
						$('#RegModal .modal-body').slimScroll({
							height:'500px',
							railVisible:true,
							allowPageScroll:true,
							disableFadeOut:true
						});
        			
        		},
                //*************//
                
               //***************//

               signupFacebook: function(event) {
                    event.preventDefault();
                    $('#RegModal').modal('hide') ;
                     headView = new FbHeader();
                     headView.signupFacebook();
            
               },
               showLogin:function(event){
                event.preventDefault();
                $('#RegModal').modal('hide') ;
                this.logincontroller = new LoginController();
                routing.trigger("Login");

               }



        		

			});

		return SignupBasicView;

	});	