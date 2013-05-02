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
            var fields = this.$(":input").serializeArray();
            var payload = {};
            $.each(fields, function(i, field){
                payload[field.name] = field.value;
            });
            var error = false;
            this.$('.text-error').html('');
            this.$('.form-alert').hide().removeClass('alert-error').removeClass('alert-info');
            
            if (payload['firstname'] == '') {
                this.$('#firstname').parent().find('.text-error').html('Please input a first name.');
                error = true;
            }
            
            if (payload['lastname'] == '') {
                this.$('#lastname').parent().find('.text-error').html('Please input a last name.');
                error = true;
            }
            
            if (payload['birthday'] == '') {
                this.$('#birthday').parent().find('.text-error').html('Invalid DOB.');
                error = true;
            }
            
            if (payload['email'] == '') {
                this.$('#email').parent().find('.text-error').html('Please input an email.');
                error = true;
            }
            
            if ('undefined' == typeof payload['gender']) {
                console.log(1);
                this.$('#male').parents('.controls').find('.text-error').html('Please select a gender.');
                error = true;
            }
            
            if (payload['password'] == '' || payload['re-password'] == '') {
                this.$('#password').parent().find('.text-error').html('Please input a password');
                error = true;
            }
            if (payload['password'] != payload['re-password']) {
                this.$('#password').parent().find('.text-error').html('Passwords Do Not Match');
                error = true;
                    }
            
            if (payload['accept_terms'] == null) {
                this.$('.agree-error').html('I know it\'s boring, but you\'ll have to read it to continue.');
                error = true;                
            } else {
                this.$('.agree-error').html('');
            }
            
            if (!error) {
                this.$('.form-alert').addClass('alert-info').html('Outstanding! We sent you an email to verify your address.').show();
                var register = new BaseModel(payload);
                register.url = function() {
                    return '/api/user/register';
                }
                register.saveSuccess = function(model, response) {
                    var exec_data = model.get('exec_data');
                    var payload = model.get('payload');
                    if (!exec_data['exec_error'] && payload) {
                        Channel('registration-uploadimage-email').publish();
                    }                    
                }                
                register.saveError = function(model, response) {
                    
                }
                register.save();                
            } else {
                this.$('.form-alert').addClass('alert-error').html('Hold on. There were problems. See sad faces above.').show();
            }
        }
                
    });

    return RegistrationEmailView;
});