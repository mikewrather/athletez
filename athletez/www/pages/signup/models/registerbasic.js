define( ["models/base"], function (BaseModel) {


	var MainModel;

    MainModel = BaseModel.extend({

        defaults: {
                        
        },
        validate: function(attrs, options){
            if (attrs.priority < 0){
                return 'Priority cannot be negative.';
            }
        },
        validation: {
    		email: {
      			required: true,
      			pattern: 'email',
      			msg: 'Please enter a valid email'
    	}
  }
       
        
    });

    return MainModel;

});
   

 

