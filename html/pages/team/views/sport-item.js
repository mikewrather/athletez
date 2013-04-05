// sport-item.js  
// -------  
// Requires `define`
// Return {SportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!team/templates/sport-item.html',
        'text!team/templates/complevel-select.html',
        'team/collections/complevels',
        'team/views/complevel-list'
        ], 
function (
        vendor,
        views,
        utils,
        sportItemTemplate,
        selectComplevelTemplate
        ) {

    var SportItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      ComplevelListView = require('team/views/complevel-list'),
      ComplevelList = require('team/collections/complevels');

      SportItemView = BaseView.extend({

        tagName: "li",

        className: "sport",
        
        rendered: false,
        
        events: {
            "change #select-complevel": "selectComplevel"
        },
        
        initialize: function (options) {
            this.template = sportItemTemplate;
            this.selectComplevelTemplate = selectComplevelTemplate;
            var self = this;
            function callback() {
                if (self.rendered) {
                    self.selectComplevel();
                    return;
                }
                self.rendered = true;
                self.initList();
            }
            this.id = options.model.collection.id;
            Channel('sports:select' + this.model.get('payload')['sport_id']).subscribe(callback);            
        },
        
        initList: function() {
            var self = this;
            this.complevels = new ComplevelList();
            this.complevels.id = this.id;
            this.complevels.sport_id = this.model.get('payload')['sport_id'];
            this.complevels.fetch();
            var sport_id = this.complevels.sport_id;
            $.when(this.complevels.request).done(function() {
                self.setupComplevelListView(sport_id);
                Channel('complevels' + sport_id + ':fetch').publish();                
                self.select_complevel = self.$('#select-complevel');            
                self.selectComplevel();
            });
        },
        
        setupComplevelListView: function(sport_id) {
            var self = this,
                complevelListView = new ComplevelListView({
                    collection: this.complevels
                });
            
            function callback () {
                complevelListView.render();
                self.$el.find('.complevels').html(complevelListView.el);                
                
                var data = {"payload": []};
                var collection = complevelListView.collection;
                if (collection.length) {
                    for (i = 0; i < collection.length; i++) {
                        data["payload"][i] = collection.at(i).get('payload');
                    }
                    var markup = Mustache.to_html(self.selectComplevelTemplate, data);                                
                    self.$el.find('.complevels').prepend(markup);
                } else {
                    self.$el.find('.complevels').html('');
                } 
            }
            Channel('complevels' + sport_id + ':fetch').subscribe(callback);
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },
        
        selectComplevel: function() {
            var complevel_id = this.select_complevel.val();
            var sport_id = this.model.get('payload')['sport_id'];
            this.$('.complevel-info').stop().slideUp();
            this.$('.complevel-info-' + sport_id + '-' + complevel_id).stop().slideDown();
            Channel('complevels:select' + sport_id + '-' + complevel_id).publish();
        }        
        
      });

    return SportItemView;
});