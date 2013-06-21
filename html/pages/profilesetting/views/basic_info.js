/* // Basic Information View
// ---------
// Pages profilesetting
// Requires `define`, `require`
// Returns {basic_info} constructor
*/
define([
        'require', 
        'text!profilesetting/templates/basic_info_header.html',
        'profilesetting/models/basic_info',
        'facade', 
        'views',
        'utils',
        'vendor',
       // 'profilesetting/collections/sports',
       // 'profile/views/sport-list'
        ], 
function(require, profileHeaderTemplate) {

    var ProfileHeaderView,
        facade = require('facade'),
        views = require('views'),
        BasicsInfoModel = require('profilesetting/models/basic_info'),
        SectionView = views.SectionView,
       // SportListView = require('profile/views/sport-list'),
       // SportList = require('profile/collections/sports'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$;
        

    ProfileHeaderView = SectionView.extend({

        id: 'basic_info',

        template: profileHeaderTemplate,
        
        events: {
          "click .btn-prof-setting-h" : "initialize"
        },

        initialize: function (options) {
            this.initBasicView();            
        },
        
        initBasicView: function () {
            var self = this;
            this.basicInfoModel = new BasicsInfoModel();
            //TODO: Assign Users Id To Id
            //this.basicInfoModel.id = this.id; //;
            this.basicInfoModel.fetch();
            $.when(this.basicInfoModel.request).done(function() {
                self.setupBasicView();
            });
        },
        
        setupBasicView: function() {
        	console.log("setup basic view called in basic_info.js view");
            var self = this;
           // self.render();
            
            var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
            console.log(this.basicInfoModel.toJSON());
            console.log(markup);
            $('#section-basics-prof-setting').html(markup);
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }            
        },
                
    });

    return ProfileHeaderView;
});