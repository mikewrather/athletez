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
        
        //selectSportTemplate: selectSportTemplate,
        
        events: {
          //  "change #select-sport": "selectSport"
          "click .btn-prof-setting-h" : "initialize"
        },

        initialize: function (options) {
          //  SectionView.prototype.initialize.call(this, options);
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
               // self.select_sport = self.$('#select-sport');
               // self.selectSport();
            });
        },
        
        setupBasicView: function() {
        	console.log("setup basic view called in basic_info.js view");
            var self = this;
           // self.render();
            
            var markup = Mustache.to_html(self.template, this.basicInfoModel.toJSON().payload);
            console.log(this.basicInfoModel.toJSON());
            console.log(markup);
            $('#section-basics-prof-setting').html(markup);
            
            // sportListView = new SportListView({
                    // collection: this.sports
                // }),
                // renderSportListView = this.addChildView(sportListView);
// 
            // this.childViews.sportListView = sportListView;
            // this.callbacks.add(function () {
                // renderSportListView();                
            // });  
//             
            // self.$el.find('#sports-info').html(sportListView.el);
            // var data = {"payload": []};
            // var collection = sportListView.collection;
            // if (collection.length) {
                // for (i = 0; i < collection.length; i++) {
                    // data["payload"][i] = collection.at(i).get('payload');
                // }
                // var markup = Mustache.to_html(self.selectSportTemplate, data);                                
                // self.$el.find('#sports-info').prepend(markup);
            // } else {
                // self.$el.find('#sports-info').html('');
            // }                
          //  sportListView.render();
        },
        
        // **Method** `setOptions` - called by BaseView's initialize method
        setOptions: function (options) {
            if (!this.model) {
                throw new Error("HeaderView expects option with model property.");
            }            
        },
        
        // render: function (domInsertion, dataDecorator, partials) {
            // SectionView.prototype.render.call(this, domInsertion, dataDecorator, partials); 
        // },
        
        
                
    });

    return ProfileHeaderView;
});