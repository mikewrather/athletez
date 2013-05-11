// Register with Facebook
// ---------
// Package Registration
// Requires `define`, `require`
// Returns {RegistrationFacebookView} constructor

define([
        'require', 
        'text!registration/templates/register_facebook.html', 
        'facade', 
        'views',
        'utils',
        'jquery.pstrength',
        'registration/collections/fbimages',
        'registration/views/fbimage-list'
        ], 
function(require, registrationFacebookTemplate) {

    var RegistrationFacebookView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        SectionView = views.SectionView,
        RegistrationFBImageList = require('registration/collections/fbimages'),
        RegistrationFBImageView = require('registration/views/fbimage-list');
        

    RegistrationFacebookView = SectionView.extend({

        id: 'main-content',
        
        events: {
            "keypress": "stopSubmit",
            "click .change-field": "changeField",
            "click .diff_fb_pic": "diffFBPicture",
            "click .upload_new_image": "uploadNewImage",
            "click .next": "nextStep"            
        },

        template: registrationFacebookTemplate,
        
        initialize: function (options) {
            var self = this;
            
            if (!this.model) {
                throw new Error("RegistrationFacebookView expected options.model.");
            }

	        self.parseFBData(this.model.get('payload'));

            SectionView.prototype.initialize.call(this, options); 
            
            function changeUserPicture(picture) {
                self.$('.picture').attr('src', base_url + picture);
            }   
            
            Channel("registration-change-picture").subscribe(changeUserPicture);
            
            function showDiffFBPicture() {
                self.initFBPictures();
            }
            
            Channel("registration-diff-fbpicture").subscribe(showDiffFBPicture);
            
            function showUploadImage() {
                self.initUploadImage();
            }
            
            Channel("registration-upload-image").subscribe(showUploadImage);
        },
        
        // Child views...
        childViews: {},
        
        render: function (domInsertion, dataDecorator, partials) {
            SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials);            
            this.$('.password').pstrength();
        },
        
        stopSubmit: function (event) {
            var code = (event.keyCode ? event.keyCode : event.which);
            if (code == 13) {
                event.preventDefault();
            }
        },
        
        diffFBPicture: function(event) {
            event.preventDefault();
            this.initFBPictures();    
        },
        
        uploadNewImage: function(event) {
            event.preventDefault();
            this.initUploadImage();
        },

	    parseFBData: function(payload)
	    {
		    payload.hs_exists = payload.high_school ? true : false;
		    payload.dob_exists = payload.birthday ? true : false;
		    payload.email_exists = payload.email ? true : false;

		    this.model.set('payload',payload);
	    },
        
        initFBPictures: function () {
            var self = this;
            
            if (!this.fbimages) {
                this.fbimages = new RegistrationFBImageList();
                this.fbimages.fetch();
                $.when(this.fbimages.request).done(function() {
                    self.setupFBPictures();
                });
            } else {
                $('#' + this.fbImageListView.id).dialog({
                    width: '80%',
                    close: self.removeListView
                });
                this.fbImageListView.initCropView();
            }
        },
        
        setupFBPictures: function() {
            var self = this;
            
            this.fbImageListView = new RegistrationFBImageView({
                collection: this.fbimages
            });
            var renderFBImageListView = this.addChildView(this.fbImageListView);

            this.childViews.fbImageListView = this.fbImageListView;
            this.callbacks.add(function () {
                renderFBImageListView();                
            });
            
            this.fbImageListView.render();                
            this.$el.append(self.fbImageListView.el);
            $('#' + this.fbImageListView.id).dialog({
                width: '80%',
                close: self.removeListView
            });            
        },
        
        removeListView: function() {
            this.childViews.fbImageListView.removeCropView();
        },
        
        initUploadImage: function() {
            alert('Upload Image');
        },
        
        changeField: function(event) {
            event.preventDefault();
            $parent = this.$(event.target).parent();
            id = $parent.attr('data-name');
            value = $parent.attr('data-value');            
            $parent.html('<input type="text" id="' + id + '" name="' + id + '" value="' + value + '"/>');
        },
        
        nextStep: function(event) {
            event.preventDefault();
            var fields = this.$(":input").serializeArray();
            var payload = this.model.get('payload');
            $.each(fields, function(i, field){
                payload[field.name] = field.value;
            });
            console.log(payload);
            if (payload['password'] == '' || payload['password-again'] == '') {
                alert('Please input a password');
                return;
            }
            if (payload['password'] != payload['password-again']) {
                alert('Please input a password correctly');
                return;
            }
            if (payload['agree'] == null) {
                alert('Please agree to the Terms of Service');
                return;
            }
            this.model.set('payload', payload);
            console.log(this.model.toJSON());
            this.model.save();
            Channel('registration-select-org').publish();
        }
    });

    return RegistrationFacebookView;
});