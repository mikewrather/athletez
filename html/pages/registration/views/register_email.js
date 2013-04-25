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
        'user/models/basics'
        ], 
function(require, registrationEmailTemplate) {

    var RegistrationEmailView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView,
        UserBasicsModel = require('user/models/basics');
        

    RegistrationEmailView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "keypress": "stopSubmit",
            "click .next": "nextStep"
        },

        template: registrationEmailTemplate,
        
        initialize: function (options) {
            if (!this.model) {
                this.model = new UserBasicsModel();
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
            var payload = this.model.get('payload');
            $.each(fields, function(i, field){
                payload[field.name] = field.value;
            });
            var error = false;
            this.$('.text-error').html('');
            this.$('.form-alert').hide().removeClass('alert-error').removeClass('alert-info');
            
            if (payload['name'].length < 13) {
                this.$('#name').parent().find('.text-error').html('You have to be at least 13.');
                error = true;
            }
            
            if (payload['birthday'] == '') {
                this.$('#birthday').parent().find('.text-error').html('Invalid DOB.');
                error = true;
            }
            
            if (payload['password'] == '' || payload['password-again'] == '') {
                this.$('#password').parent().find('.text-error').html('Please input a password');
                error = true;
            }
            if (payload['password'] != payload['password-again']) {
                this.$('#password').parent().find('.text-error').html('Passwords Do Not Match');
                error = true;
            }
            
            if (payload['agree'] == null) {
                this.$('.agree-error').html('I know it\'s boring, but you\'ll have to read it to continue.');
                error = true;                
            } else {
                this.$('.agree-error').html('');
            }
            
            if (!error) {
                this.$('.form-alert').addClass('alert-info').html('Outstanding! We sent you an email to verify your address.').show();
                this.model.set('payload', payload);
                this.model.url = function() {
                    if (testpath)
                        return testpath + '/user/basics';
                    return '/api/user/basics';
                }
                this.model.save();
                Channel('registration-after-email').publish(this.model);
            } else {
                this.$('.form-alert').addClass('alert-error').html('Hold on. There were problems. See sad faces above.').show();
            }
        }
                
    });

    return RegistrationEmailView;
});