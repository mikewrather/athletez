/* // Basic Information View
// ---------
// Pages profilesetting
// Requires `define`, `require`
// Returns {basic_info} constructor
*/
define([
        'require',
        'text!profilesetting/templates/basic_info_header.html',
		'text!profilesetting/templates/basic_info_header_edit.html',
        'profilesetting/models/basic_info',
        'facade',
        'views',
        'utils',
        'vendor',
		'usercontrols/imagecropper/imagecropper'
        ],
function(require, profileHeaderTemplate,profileHeaderEditTemplate) {

    var ProfileHeaderView,
        facade = require('facade'),
        views = require('views'),
        BasicsInfoModel = require('profilesetting/models/basic_info'),
        SectionView = views.SectionView,
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$,
	    ImageCropperController = require('usercontrols/imagecropper/imagecropper');


    ProfileHeaderView = SectionView.extend({

        id: 'basic_info',

        template: profileHeaderTemplate,

	    events: {
		    "click .btn-prof-setting-h": "initialize",
		    "click #edit_profile_info": "editProfile",
		    "click #change_user_pic": "changeUserpic"
	    },

        initialize: function (options) {
            this.initBasicView();
	        _.bindAll();
        },

        initBasicView: function () {
            var self = this;
            this.basicInfoModel = new BasicsInfoModel();
            //TODO: Assign Users Id To Id
            //this.basicInfoModel.id = this.id; //;
            this.basicInfoModel.fetch();
            $.when(this.basicInfoModel.request).done(function() {
	            self.basicInfoModel.set('id',self.basicInfoModel.get('payload').id);
                self.setupBasicView();
            });
        },

        setupBasicView: function() {
            var self = this;
           // self.render();

            var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
	        console.log(markup);
            $('#section-basics-prof-setting').html(markup);
	        $('#change_user_pic').bind('click',function(){ self.changeUserpic();});
	        $('#edit_profile_info').bind('click',function(){ self.editProfile();});
        },

        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }
        },

	    editProfile: function()
		{
			var self=this, markup = Mustache.to_html(profileHeaderEditTemplate, this.basicInfoModel.toJSON());
			$('div#user_profile_data').html(markup);
			$('#save_user_data').bind('click',function(){ self.saveProfileBasics();});
		},

	    saveProfileBasics: function()
	    {
		    var self = this, newAttr = {};
		    $('div#user_profile_data').find('input').each(function(){
			    newAttr[$(this).attr('model-property')] = $(this).val();
		    });
		    this.basicInfoModel.save(newAttr,{success:function(){ self.initBasicView();}});
	    },

	    changeUserpic: function () {
		    var mpay = this.basicInfoModel.get('payload');
		    console.log(mpay);
		    var self = this, imageCropperController = new ImageCropperController({
			    'image_o': mpay.user_picture_obj.pre_crop_url,
			    'image_e': mpay.user_picture_obj.image_path
		    });
		    Channel('userpic-changed').subscribe(function () {
			    self.initBasicView();
		    });
	    }

    });

    return ProfileHeaderView;
});