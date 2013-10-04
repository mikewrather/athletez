define([
	'require',
	'text!login/templates/logintemplate.html',
    'backbone',
    'underscore',
    'views',
    'facade', 
    'utils'
	],function(require,  signInTemplate,backbone,_) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SigninBasicView = SectionView.extend({
              
              initialize: function (options) {
                   
                    this.template =  _.template(signInTemplate);
                    this.$el = $("#main");
                    this.render();
                                    
                },
                render: function(){

                    this.$el.html(this.template);
                   
                },     
                events:{
                  "click a#signup": "signupUser", 
                },
                signupUser: function(event){
                	event.preventDefault();
					routing.trigger("add-user");
                },
               
               


            });
            
            return SigninBasicView;

    }); 