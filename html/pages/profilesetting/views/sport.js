/* //
 // ---------

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

    var SportView,
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


	SportView = SectionView.extend({

        id: 'basic_info',

        template: profileHeaderTemplate,
        
        //selectSportTemplate: selectSportTemplate,
        
        events: {
        },

        initialize: function (options) {

        },
        
        initBasicView: function () {

        },
        
        setupBasicView: function() {

        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {

        },
        
        // render: function (domInsertion, dataDecorator, partials) {
            // SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        // },
        
        
                
    });

    return SportView;
});