// fitnessbasic-item.js  
// -------  
// Requires `define`
// Return {FitnessBasicItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!user/templates/fitnessbasic-item.html',
        'user/models/fitness',
		"vendor/plugins/qtip/qtip-wrapper",
		"text!vendor/plugins/qtip/qtip.css"
        ], 
function (
        vendor,
        views,
        utils,
        fitnessBasicItemTemplate,
        fitnessModel
        ) {

    var FitnessBasicItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      FitnessBasicItemView = BaseView.extend({

        tagName: "li",
        className: "fitnessbasic",
		events: {
        },
        
        showInput: function(e) {
        	$(e.target).addClass("hide-force");
        	$(e.target).parents("span.stat-val-outer").find(".stats-input-h").removeClass("hide-force").focus();
        },

        hideInput: function(e) {
        	var id = $(e.target).data("id"), index = -1, data = this.model.get("payload").data;
        	for(var i in data) {
        		if(data[i].id == id) {
        			index = i;
        			break;
        		}
        	}
        	
        	if(index != -1) {
        		var model = new fitnessModel();
				model.set({
					user_id: routing.loggedInUserId,
					resume_data_id: $(e.currentTarget).data('resume-data-id'),
					user_value: $(e.target).val()
				});
	        	model.save();
	        	var $ele = $(e.target).parents("span.stat-val-outer").find(".stats-val-h");
	        	$ele.html($(e.target).val());
	        	$.when(model.request).done(function() {
		        	$ele.html(model.get("payload").user_value != "" ? model.get("payload").user_value : "--");
		        	$(e.target).addClass("hide-force");
	 		       	$ele.removeClass("hide-force");
	        	});
        	}
        },
          
        initialize: function (options) {
            this.template = fitnessBasicItemTemplate;
            this.recordId = options.recordId;
        },
        
        calculate: function() {
        	if(this.unit_type == "time")
        		var d = "00:"+this.user_value+":00";
        	else	
        		var d = this.user_value;
        	return d;
        },

	      bindToolTips:function(){
		      var self = this;
		      $.each(this.$el.find('img'),function(){
			      var $curr = $(this);
			      $curr.qtip2({
				      //	content: 'test of qtip',
				      position: {
					      my: "bottom center",
					      at: "top center"
				      },
				      style: {
					      classes: 'header-dropdown'
				      }
			      });
		      });
	      },
 
        render: function () {
        	var data = {}, _self = this;
        	data = this.model.toJSON();
        	data.view = this;
	        console.log("Fitness Data getting passed to template",data);
            var markup = Mustache.to_html(this.template, data);
            this.$el.html(markup);
            
            if(routing.loggedInUserId == this.recordId) {
            
	            this.$el.find(".stats-val-h").click(function(e) {
	            	_self.showInput(e);
	            });
	
	            this.$el.find(".stats-input-h").blur(function(e) {
	            	_self.hideInput(e);
	            });
            }

	        //bind tooltips
	        this.bindToolTips();

            return this;
        }        
        
      });

    return FitnessBasicItemView;
});