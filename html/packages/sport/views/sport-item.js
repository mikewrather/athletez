//sport item

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sport/templates/sport-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        sportItemTemplate
        ) {

    var SportItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      SportItemView = BaseView.extend({

        tagName: "li",

        className: "sport",
        
        // Event handlers...
        events: {
            "click": "selectSport"
        },
        
        initialize: function (options) {
            this.template = sportItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },
        
        selectSport: function() {
        	debug.log(this.model);
        	$('li.sport').removeClass('select');
        	this.$el.addClass('select');
            Channel('sportChanged:'+this.model.collection.cid).publish(this.model);
        }        
        
      });

    return SportItemView;
});