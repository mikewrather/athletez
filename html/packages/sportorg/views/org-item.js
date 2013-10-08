// org-item.js  
// -------  
// Requires `define`
// Return {OrgListItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!sportorg/templates/org-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        orgItemTemplate
        ) {

    var OrgItemView
      , $ = vendor.$
      , BaseView = views.BaseView
      , Mustache = vendor.Mustache;

      OrgItemView = BaseView.extend({

        tagName: "li",

        className: "org",
          
        events: {
        },

        initialize: function (options) {
	        console.log("ORG ITEM OPTIONS:",options);
            this.template = orgItemTemplate;
			this.setupTeamsList();
        },

        render: function () {
        	console.error( this.model.toJSON());
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            return this;
        },

	    setupTeamsList: function()
	    {
		    console.log(this.model.get('payload'));
	    }


      });

    return OrgItemView;
});