// sport-item.js  
// -------  
// Requires `define`
// Return {SportItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!team/templates/complevel-item.html',
        'text!team/templates/season-select.html',
        'team/collections/seasons',
        'team/views/season-list'
        ], 
function (
        vendor,
        views,
        utils,
        complevelItemTemplate,
        selectSeasonTemplate
        ) {

    var TeamComplevelItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      SeasonListView = require('team/views/season-list'),
      SeasonList = require('team/collections/seasons');

      TeamComplevelItemView = BaseView.extend({

        tagName: "li",

        className: "complevel",
        
        rendered: false,
        
        events: {
            "change #select-season": "selectSeason"
        },
        
        initialize: function (options) {
            this.template = complevelItemTemplate;
            this.selectSeasonTemplate = selectSeasonTemplate;
            var self = this;
            function callback() {
                if (self.rendered) {
                    self.selectSeason();
                    return;
                }
                self.rendered = true;
                self.initList();
            }
            this.id = options.model.collection.id;
            var sport_id = this.model.collection.sport_id;
            Channel('teamcomplevels:select' + sport_id + '-' + this.model.get('payload')['complevel_id']).subscribe(callback);
        },
        
        initList: function() {
            var self = this;
            this.seasons = new SeasonList();
            this.seasons.id = this.id;
            this.seasons.sport_id = this.model.collection.sport_id;
            this.seasons.complevel_id = this.model.get('payload')['complevel_id'];
            this.seasons.fetch();
            var sport_id = this.seasons.sport_id;
            var complevel_id = this.seasons.complevel_id;
            $.when(this.seasons.request).done(function() {
                self.setupSeasonListView(sport_id, complevel_id);
                Channel('teamseasons' + sport_id + '-' + complevel_id + ':fetch').publish();
                self.select_season = self.$('#select-season');
                self.selectSeason();
            });
        },
        
        setupSeasonListView: function(sport_id, complevel_id) {
            var self = this,
                seasonListView = new SeasonListView({
                    collection: this.seasons
                });
            
            function callback () {
                seasonListView.render();
                self.$el.find('.seasons').html(seasonListView.el);                
                
                var data = {"payload": []};
                var collection = seasonListView.collection;
                if (collection.length) {
                    for (i = 0; i < collection.length; i++) {
                        data["payload"][i] = collection.at(i).get('payload');
                    }
                    var markup = Mustache.to_html(self.selectSeasonTemplate, data);                                
                    self.$el.find('.seasons').prepend(markup);
                } else {
                    self.$el.find('.seasons').html('');
                } 
            }
            Channel('teamseasons' + sport_id + '-' + complevel_id + ':fetch').subscribe(callback);
        },

        render: function () {
            var sport_id = this.model.collection.sport_id;
            var payload = this.model.get('payload');
            payload['sport_id'] = sport_id;
            this.model.set('payload', payload);
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },
        
        selectSeason: function() {                                
            var season_id = this.select_season.val();            
            var sport_id = this.model.collection.sport_id;
            var complevel_id = this.model.get('payload')['complevel_id'];
            this.$('.season-info').stop().slideUp();
            this.$('.season-info-' + sport_id + '-' + complevel_id + '-' + season_id).stop().slideDown();
            Channel('teamseasons:select' + sport_id + '-' + complevel_id + '-' + season_id).publish();
        }        
        
      });

    return TeamComplevelItemView;
});