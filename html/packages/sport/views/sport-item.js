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
           // "click a": "selectSport",
        },
        
        initialize: function (options) {
            this.template = sportItemTemplate;
        },

        render: function () {
            var _self = this, markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            this.$el.find('a').click(function(e) {
            	_self.selectSport(e);
            });
            return this;
        },
        
        selectSport: function(e) {
        	$(".reset-option-btn-h[data-type=sport]").removeClass("hide");
        	$(".menu-detail-h").hide();
        	$('li.sport').removeClass('select');
        	this.$el.addClass('select');
            Channel('sportChanged:'+this.model.collection.cid).publish(this.model);
        }        
        
      });

    return SportItemView;
});