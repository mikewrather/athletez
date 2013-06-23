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
            var self = this;
           // self.render();
            
            var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
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