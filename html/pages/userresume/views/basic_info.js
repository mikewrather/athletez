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
function(require, profileHeaderTemplate) {

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
        	SectionView.prototype.initialize.call(this, options);
            this.initBasicView();            
        },
        
        initBasicView: function () {
            var self = this;
            this.basicInfoModel = new BasicsInfoModel();
            //TODO: Assign Users Id To Id
            this.basicInfoModel.id = this.id; //;
            this.basicInfoModel.fetch();
            $.when(this.basicInfoModel.request).done(function() {
                self.setupBasicView();
            });
        },
        
        setupBasicView: function() {
            var self = this;
           // self.render();
            
            var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
            $('#section-basics-prof-setting').html(markup);
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            // if (!this.model) {
                // throw new Error("HeaderView expects option with model property.");
            // }            
        },
                
    });

    return ProfileHeaderView;
});