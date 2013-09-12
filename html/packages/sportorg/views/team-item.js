// team-item.js  
// -------  
// Requires `define`
// Return {TeamItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/team-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        teamItemTemplate
        ) {

    var TeamItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      TeamItemView = BaseView.extend({

        tagName: "li",

        className: "team",
           events: {
            'click .team-info-h': 'showinfo'
        },
        
        showinfo: function(e) {
        	e.preventDefault();
        	if(!$(e.target).parents('.org-popup').length) {
	        	
	        	if($(e.target).find('.org-popup').hasClass('hide')) {
		        	$('.org-popup').addClass('hide');
		        	$(e.target).find('.org-popup').removeClass('hide');
		        } else {
		        	$('.org-popup').addClass('hide');
		        }
		        
		        
		        
        	}
        },
        initialize: function (options) {
            this.template = teamItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        }        
        
      });

    return TeamItemView;
});