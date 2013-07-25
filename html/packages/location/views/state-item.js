// state-item.js  
// -------  
// Requires `define`
// Return {StateItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!packages/location/templates/state-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        stateItemTemplate
        ) {

    var StateItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      StateItemView = BaseView.extend({

        tagName: "li",

        className: "state",
        
        // Event handlers...
        events: {
            "click": "changeState"
        },
        
        initialize: function (options) {
            this.template = stateItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },
        
        changeState: function() {
        	debug.log(this.model);
            Channel('stateChanged:' + this.model.collection.cid).publish(this.model);
        }        
        
      });

    return StateItemView;
});