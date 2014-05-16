// schedule-item.js  
// -------  
// Requires `define`
// Return {ScheduleItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/schedule-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        scheduleItemTemplate
        ) {

    var ScheduleItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      ScheduleItemView = BaseView.extend({

        tagName: "li",

        className: "schedule",
          
        initialize: function (options) {
            this.template = scheduleItemTemplate;
        },

        render: function () {
	        console.log("SCHEDULE ITEM MODEL",this.model.toJSON());
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return ScheduleItemView;
});