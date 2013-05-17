// header.js  
// -------  
// Requires `define`
// Return {HeaderView} object as constructor

define([
        'vendor', 
        'views',
        'text!chrome/templates/header.html',
        'chrome/models/header',
        'registration'
        ], 
function (
        vendor,
        views,
        headerTemplate,
        HeaderModel,
        RegistrationController
        ) {

    var HeaderView,
        BaseView = views.BaseView,
        $ = vendor.$,
        _ = vendor._,
        Mustache = vendor.Mustache;

      HeaderView = BaseView.extend({

        tagName: 'header',

        className: 'container-fluid clearfix',

        initialize: function (options) {
            this.template = headerTemplate;
        },

        model: new HeaderModel(),
        
        events: {
            "click .signup-facebook": "signupFacebook",
            "click .signup-email": "signupEmail"
        },

        render: function () {
            var self = this;
            this.model.fetchSuccess = this.model.fetchError = function(model, res) {
                var markup = Mustache.to_html(self.template, model.toJSON());
                self.$el.html(markup);
                
                var user_photo = model.get('user_photo');
                var user_email = model.get('user_email');
                if (!user_photo && user_email) {
                    self.$('.photo img').attr("src","http://www.gravatar.com/avatar/" + MD5(user_email) + "&s=29");
                }
                var authorized = model.get('authorized');
                if (authorized) {
                    var id = model.get('id');
                    Channel('app-inited').publish(id);
                }
            };
                
            this.model.fetch();
            return this;
        },
        
        signupFacebook: function(event) {
            event.preventDefault();
            
            if (!this.registrationController) {
                this.registrationController = new RegistrationController({
                    "route": ""
                });
            }
            
            Channel('registration-with-facebook').publish();
        },
        
        signupEmail: function(event) {
            event.preventDefault();
            
            if (!this.registrationController) {
                this.registrationController = new RegistrationController({
                    "route": ""
                });
            }
            
            Channel('registration-with-email').publish();
        }

      });

    return HeaderView;
});