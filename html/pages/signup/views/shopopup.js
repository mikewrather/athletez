define([
	'require',
	//'text!signup/templates/registration.html', 
    'backbone',
    'underscore',
    'registration',

    'views',
    'facade', 
    'utils', 

	],function(require, backbone,_,RegistrationController) {
			
		var SignupBasicView,
        	    	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({

                initialize: function (options) {
                   // this.template =  _.template(signupBasicTemplate);
                   // this.$el = $('body');
                    $("#errormsg, #preview").html("");
            
                    
                     debug.log("Image upload basic view");   
                      $('#RegModal').modal('show') ;
                       $('#RegModal').on('hide', function () {
                        $('div#modalPopup').remove();
                        //routing.trigger('refresh-onImageUpload');
                      });
                   
                   
                                    
                },
               
			});
            return SignupBasicView;
});