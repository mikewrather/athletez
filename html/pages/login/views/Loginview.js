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
	             if(!_.isUndefined(options.attr)) this.attr = options.attr;
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

	                if(!_.isUndefined(this.attr)){
		                this.attr = this.setAttrPayload(this.attr);
						this.$el.find('input[name="username"]').val(this.attr.email);
		                this.$el.find('input[name="password"]').val(this.attr.password);
						if(!_.isUndefined(this.attr.fb_invite_id))
							this.$el.find('form#login').append('<input type="hidden" name="sechash" value="' + this.attr.fb_invite_id + '" />');

	                }
                },

				setAttrPayload : function(attrs) {
					var payload = {};
					var fields = attrs.attr;

					$.each(fields, function(i, field) {
						payload[field.name] = field.value;
					});

					return payload;
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
                	var ob = routing.showSpinner(".forgot-pasword-btn-h"), _self = this, model = new ForgotPasswordModel();
                	model.email = $(e.target).find(".forgot-password-email-h").val();
                	model.save({email: model.email});
                	$.when(model.request).done(function() {
                		routing.hideSpinner(ob, ".forgot-pasword-btn-h");
                		_self.$el.find(".success-message").removeClass('hide');
                        _self.$el.find(".error-message").addClass('hide');
                		setTimeout(function() {
                           _self.loginPageView();
                		}, 3000);
                	});
                	$.when(model.request).fail(function() {
                		routing.hideSpinner(ob, ".forgot-pasword-btn-h");
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
	                var ob = routing.showSpinner(".loginUser"),
	                fields = this.$(":input").serializeArray(), payload=[], _self = this;
	                
	                $.each(fields, function( index, value ) {
	                   payload[value.name] = value.value;
	                });
	                
	                var obj = $.extend({}, payload);
	                this.model.save(obj,{
	                    success: function(msg) {
	                    	routing.hideSpinner(ob, ".loginUser");
	                        $('#Loginview').modal('hide');
							if(_self.callback && _.isFunction(_self.callback)) {
								routing.trigger('common-popup-close');
								// reload header
								if(App.header) App.header.render(true);
								_self.callback(function() {});
							} else {
		                        window.location.href = "#profile";
	                    	}
		                    routing.trigger('hide-landing');
	                    },
	                    error: function(msg) {
	                        $( ".errormsg" ).empty();
	                    	routing.hideSpinner(ob, ".loginUser");
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
	                routing.trigger("common-popup-close");
                    routing.trigger("register-basic", this.callback);
                },
            });
            
            return SigninBasicView;

    }); 