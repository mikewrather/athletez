define([
	'require',
	'text!login/templates/logintemplate.html', 
    'backbone',
    'underscore',
    'signup',
    'views',
    'facade', 
    'utils',
    'login/models/Forgotmodel',
    'signup/views/facebooksignup'
	],function(require,signInTemplate,backbone,_,signupController) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	ForgotPasswordModel = require('login/models/Forgotmodel'),
            FbHeader=require('signup/views/facebooksignup'),
        	SectionView = backbone.View;
			SigninBasicView = SectionView.extend({
              
              initialize: function (options) {
              	 this.callback = options.callback;
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
                     });
                },
                  
                events:{
                  "click button#signup": "signupUser", 
                  "click .loginUser":"userLogin",
                  "click .forgot-password-h": "forgotPassword",
                  "submit .forgot-password-form-h": "forgotPasswordForm",
                  "click .log-in-link-h": "loginPageView",
                  "click #fbpane":"signupFacebook"
                },
                
                forgotPasswordForm: function(e) {
                	e.preventDefault();
                	var _self = this, model = new ForgotPasswordModel();
                	model.email = $(e.target).find(".forgot-password-email-h").val();
                	model.save({email: model.email});
                	$.when(model.request).done(function() {
                		_self.$el.find(".success-message").removeClass('hide');
                        _self.$el.find(".error-message").addClass('hide');
                		setTimeout(function() {
                           _self.loginPageView();
                		}, 3000);
                	});
                	$.when(model.request).fail(function() {
                		_self.$el.find(".error-message").removeClass('hide');
                        _self.$el.find(".success-message").addClass('hide');
                	});

                },
                signupFacebook: function(event) {
                    event.preventDefault();
                    $('#RegModal').modal('hide') ;
                     headView = new FbHeader({callback: this.callback});
                     headView.signupFacebook();
            
               },
               
               userLogin:function(event) {
	                event.preventDefault();
	                var fields = this.$(":input").serializeArray(), payload=[], _self = this;
	                
	                $.each(fields, function( index, value ) {
	                   payload[value.name] = value.value;
	                });
	                
	                var obj = $.extend({}, payload);
	                this.model.save(obj,{
	                    success: function(msg) {
	                        $('#Loginview').modal('hide');
							if(_self.callback && _.isFunction(_self.callback)) {
								routing.trigger('common-popup-close');
								_self.callback(function() {
									window.location.reload();
								});
							} else {
		                        window.location.href = "#profile";
	                    	}
	                    },
	                    error: function(msg) {
	                        $( ".errormsg" ).empty();
	                        var errors= jQuery.parseJSON( msg.request.responseText);
	                        $( ".errormsg" ).html(errors.exec_data.error_array[0].error);            
	                    }
	                });
                },
                
                forgotPassword: function(event) {
                    event.preventDefault();
					this.$el.find(".success-message").addClass('hide');
					this.$el.find(".error-message").addClass('hide');
					$("#Loginview h3#label").html("Forgot Password");
                    $("#loginmain").addClass("hide");
                	$(".forgot-password-container").removeClass("hide");
                },
                
                loginPageView: function() {
                	this.$el.find(".success-message").addClass('hide');
					this.$el.find(".error-message").addClass('hide');
                	$("#Loginview h3#label").html("Login");
					$("#loginmain").removeClass("hide");               	
                	$(".forgot-password-container").addClass("hide");
                },
                
                signupUser: function(event){
                	event.preventDefault();
                    routing.trigger("register-basic", this.callback);
                },
            });
            
            return SigninBasicView;

    }); 