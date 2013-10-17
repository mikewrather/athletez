define([
	'require',
	'text!login/templates/logintemplate.html', 
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
                  "click .loginUser":"userLogin"
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
                            location.href='#usersettings';
                             $('#Loginview').modal('hide');
                            },
                    error: function(msg) {
                                console.log(msg);
                                $( ".errormsg" ).empty();
                                var errors= jQuery.parseJSON( msg.request.responseText);
                                console.log(errors.desc);
                                $( ".errormsg" ).html(errors.desc);
                            }

                });

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