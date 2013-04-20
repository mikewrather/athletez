// register_email.js Model
// ------------
// Requires define
// Return {RegistrationEmailModel} model constructor object

define( ["models/base"], function (BaseModel) {

    var RegistrationEmailModel;

    RegistrationEmailModel = BaseModel.extend({

        defaults: {
            
            "payload": {
                "title": "Register with AthletesUp",
                "register_facebook": "Sign up through Facebook",
                "register_email": "Register With Email Address",
                "register_with_facebook": true
            },
            "desc": "Registration Step 1 information",
            "exec_data": {
                "exec_time": 0,
                "exec_error": false
            }
        }

    });

    return RegistrationEmailModel;
});

