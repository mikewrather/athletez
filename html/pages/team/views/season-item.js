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

    var SeasonItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache,
      Channel = utils.lib.Channel,
      
      SeasonItemView = BaseView.extend({

        tagName: "li",

        className: "complevel",
        
        rendered: false,
        
        initialize: function (options) {
            this.template = seasonItemTemplate;
            var self = this;
            function callback() {
                if (self.rendered)
                    return;
                self.rendered = true;                
            }
            this.id = options.model.collection.id;
            var sport_id = this.model.collection.sport_id;
            var complevel_id = this.model.collection.complevel_id;
            Channel('seasons:select' + sport_id + '-' + complevel_id + '-' + this.model.get('payload')['season_id']).subscribe(callback);
        },
        
        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return SeasonItemView;
});