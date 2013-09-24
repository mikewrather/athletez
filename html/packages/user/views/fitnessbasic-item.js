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
        
        calculate: function() {
        	if(this.unit_type == "time")
        		var d = "00:"+this.user_value+":00"
        	else	
        		var d = this.user_value;
        		
        	console.log(d);	
        		
        	return d;
        },
 
        render: function () {
        	var data = {};
        	data = this.model.toJSON();
        	data.view = this;
	        console.log("Fitness Data getting passed to template",data);
            var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
            return this;
        }        
        
      });

    return FitnessBasicItemView;
});