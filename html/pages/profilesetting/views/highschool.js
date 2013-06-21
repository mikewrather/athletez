/* // Basic Information View
// ---------
// Pages profilesetting
// Requires `define`, `require`
// Returns {basic_info} constructor
*/
define([
        'require', 
        'text!profilesetting/templates/highschool.html',
      //  'profilesetting/models/basic_info',
        'facade', 
        'views',
        'utils',
        'vendor',
        ], 
function(require, highSchoolTemplate) {

    var HighSchoolView,
        facade = require('facade'),
        views = require('views'),
       // BasicsInfoModel = require('profilesetting/models/basic_info'),
        SectionView = views.SectionView,
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'),
        Mustache = vendor.Mustache,
        $ = facade.$;
        

    HighSchoolView = SectionView.extend({

        template: highSchoolTemplate,
        
        events: {
         // "click .btn-prof-setting-h" : "initialize"
        },

        initialize: function (options) {
        	 _.bindAll(this);
            this.init();            
        },
        
        init: function () {
            var self = this;
            // this.highSchoolodel = new HighSchoolModel();
            // //TODO: Assign Users Id To Id
            // //this.basicInfoModel.id = this.id; //;
            // this.basicInfoModel.fetch();
            // $.when(this.basicInfoModel.request).done(function() {
                // self.setupBasicView();
            // });
            
            self.setupView();
        },
        
        setupView: function() {
        	console.log("setup basic view called in basic_info.js view");
            var self = this;
           // self.render();
            
          //  var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON());
            var markup = Mustache.to_html(self.template, []);
            
           // console.log(this.basicInfoModel.toJSON());
            console.log(markup);
            $('#content-school-prof-setting').html(markup);
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }            
        },
                
    });

    return HighSchoolView;
});