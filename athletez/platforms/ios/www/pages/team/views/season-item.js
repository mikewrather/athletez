// season-item.js  
// -------  
// Requires `define`
// Return {SeasonItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!team/templates/season-item.html',
        ], 
function (
        vendor,
        views,
        utils,
        seasonItemTemplate
        ) {

    var TeamSeasonItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      
      TeamSeasonItemView = BaseView.extend({

        tagName: "li",

        className: "complevel",
        
        initialize: function (options) {
            this.template = seasonItemTemplate;
            var self = this;
            this.id = options.model.collection.id;
            var sport_id = this.model.collection.sport_id;
            var complevel_id = this.model.collection.complevel_id;
            var season_id = this.model.get('payload')['season_id'];
            function callback() {
                Channel('refresh-teampage').publish(sport_id, complevel_id, season_id);
            }
            Channel('teamseasons:select' + sport_id + '-' + complevel_id + '-' + season_id).subscribe(callback);
        },
        
        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamSeasonItemView;
});