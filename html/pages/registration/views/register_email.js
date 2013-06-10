// Register with Email Address
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationEmailView} constructor

define([
        'require', 
        'text!registration/templates/register_email.html', 
        'facade', 
        'views',
        'utils',
        'jquery.pstrength',
        'models/base'
    ], 
    function(require, registrationEmailTemplate) {

        var RegistrationEmailView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView,
        BaseModel = require('models/base');


        RegistrationEmailView = SectionView.extend({

            id: 'main-content',

            events: {
                "keypress": "stopSubmit",
                "click .next": "nextStep"
            },

            template: registrationEmailTemplate,

            initialize: function (options) {
                if (!this.model) {
                    throw new Error("RegistrationEmailView expected options.model.");
                }
                SectionView.prototype.initialize.call(this, options);            
            },

            render: function (domInsertion, dataDecorator, partials) {
                SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
                this.$('#password').pstrength();
            },

            stopSubmit: function (event) {
                var code = (event.keyCode ? event.keyCode : event.which);
                if (code == 13) {
                    event.preventDefault();
                }
            },

            nextStep: function (event) {
                event.preventDefault();
                // for test
	            //comment by jeffrey Channel('registration-uploadimage-email').publish();


                var fields = this.$(":input").serializeArray();
                var payload = {};
                $.each(fields, function(i, field){
                        payload[field.name] = field.value;
                });
                
                var saveInfo = new BaseModel(payload);
                saveInfo.url = function() {
                    return '/api/user/register';                            
                }
                saveInfo.saveSuccess = function(model, response) {
                    BaseModel.prototype.saveSuccess.call(this, model, response);
                    var exec_data = response.exec_data;
                    var payload = response.payload;
                    if (!exec_data['exec_error']) {
                        //comment by jeffrey Channel('registration-uploadimage-email').publish();
	                    Channel("registration-select-org").publish(payload);
                    }
                }
                saveInfo.save();

            }

        });

        return RegistrationEmailView;
});