define([
	'require',
	'text!signup/templates/imageupload.html', 
    'backbone',
    'underscore',
    'views',
    'facade', 
    'utils', 
	],function(require,  signupBasicTemplate,backbone,_) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
              
              initialize: function (options) {
                   
                    this.template =  _.template(signupBasicTemplate);
                    this.$el = $(options.destination);
                    this.render();
                                    
                },
                render: function(){

                    this.$el.html(this.template);
                    this.userinfo(this.options.attr);
                   // this.registrationElements();
                    //this.payload=this.finalRegistrationPayload(this.options.attr);
                    //this.fetchpayload(this.payload); 
                },     
                events:{
                 "change input":"preview"   
                },
                userinfo:function(attrs){
                    
                    // attrs get the registered user inf from successfull registration 
                },
                preview:function(event){
                    console.log(event,"test event");

                    var URL = window.URL || window.webkitURL;
                    window.fileURL = URL.createObjectURL(event.target.files[0]);
                    $("#previewimg").attr({
                        src:window.fileURL
                     });
                }

            });    
            
            return SignupBasicView;

    }); 