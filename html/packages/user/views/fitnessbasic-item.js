// fitnessbasic-item.js  
// -------  
// Requires `define`
// Return {FitnessBasicItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!user/templates/fitnessbasic-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        fitnessBasicItemTemplate
        ) {

    var FitnessBasicItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      FitnessBasicItemView = BaseView.extend({

        tagName: "li",

        className: "fitnessbasic",
          
        initialize: function (options) {
            this.template = fitnessBasicItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return FitnessBasicItemView;
});