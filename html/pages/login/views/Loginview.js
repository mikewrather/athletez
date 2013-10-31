define([
	'require',
	'text!login/templates/logintemplate.html', 
    'backbone',
    'underscore',
    'signup',
    'views',
    'facade', 
    'utils',
    'login/models/Forgotmodel'
	],function(require,signInTemplate,backbone,_,signupController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	ForgotPasswordModel = require('login/models/Forgotmodel'),
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
                  "click .loginUser":"userLogin",
                  "click .forgot-password-h": "forgotPassword",
                  "submit .forgot-password-form-h": "forgotPasswordForm",
                  "click .log-in-link-h": "loginPageView"
                },
                
                
                forgotPasswordForm: function(e) {
                	e.preventDefault();
                	var _self = this, model = new ForgotPasswordModel();
                	model.email = $(e.target).find(".forgot-password-email-h").val();
                	model.save({email: model.email});
                	$.when(model.request).done(function() {
                		_self.$el.find(".success-message").removeClass('hide');
                		setTimeout(function() {
                           _self.loginPageView(); 			
                		}, 3000);
                	});
                	$.when(model.request).fail(function() {
                		_self.$el.find(".error-message").removeClass('hide');
                	});

                },
                
                userLogin:function(event){
                event.preventDefault();
                var fields = this.$(":input").serializeArray();
                var payload=[];
                $.each(fields, function( index, value ) {
                       payload[value.name] = value.value;
                      
                       });
                var obj = $.extend({}, payload)
               try{
                      console.log(obj,"new");
                }
                catch(e){
                    console={},
                    console.log=function(e){}
                }
               
                this.model.save(obj,{
                    success: function(msg) {
                        location.href='#profile';
                        $('#Loginview').modal('hide');
                    },
                    error: function(msg) {
                        $( ".errormsg" ).empty();
                        var errors= jQuery.parseJSON( msg.request.responseText);
                        $( ".errormsg" ).html(errors.exec_data.error_array[0].error);            
                    }
                });

                },
                
                forgotPassword: function() {
					//alert("forgot password"); 
					this.$el.find(".success-message").addClass('hide');
					this.$el.find(".error-message").addClass('hide');
					$("#Loginview h3#label").html("Forgot Password");
					$("#logincontainer").addClass("hide");               	
                	$(".forgot-password-container").removeClass("hide");
                },
                
                loginPageView: function() {
                	this.$el.find(".success-message").addClass('hide');
					this.$el.find(".error-message").addClass('hide');
                	$("#Loginview h3#label").html("Login");
					$("#logincontainer").removeClass("hide");               	
                	$(".forgot-password-container").addClass("hide");
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