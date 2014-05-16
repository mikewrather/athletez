// commenton-item.js  
// -------  
// Requires `define`
// Return {CommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!site/templates/comment-item.html',
        'common/models/delete',
		'vendor/plugins/dateformat'
        ], 
function (
        vendor,
        views,
        utils,
        commentItemTemplate
        ) {

    var CommentItemView,
        BaseView = views.BaseView, 
        DeleteModel = require('common/models/delete'),
	    dateFormat = require('vendor/plugins/dateformat'),
        Mustache = vendor.Mustache;

      CommentItemView = BaseView.extend({

        tagName: "li",

        className: "comment",
        events: {
        	'click .delete-comment-h': 'deleteComments'
        },
        initialize: function (options) {
        	if(!options.template)
		        this.template = commentItemTemplate;
		    else	    
		    	this.template = options.template;
        },		
        
        dateFormat: function(date) {
        	date = new Date(date);
	        return dateFormat(date,"mmm d, h:MM TT")
        },

        render: function () {
	        var payload = this.model.get('payload');
	        payload['comment'] = payload['comment'].replace(/\n/g,"<br />");
	        payload['comment_date'] = this.dateFormat(payload['timePosted']);
	        this.model.set('payload',payload);
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);

	       // console.log("profile payload = ", payload);
            var self = this;
            if (payload) {
            	try {
                var user_photo = payload.user.user_picture_obj.types.small_thumb.url;
				self.$('.user-photo img').attr("src",user_photo);
            	} catch(e) {
            		console.log(e);
            	}
            }
            
            return this;
        },
        
        deleteComments: function(e) {
        	e.stopPropagation();
			e.preventDefault();
			var _self = this, deleteModel = new DeleteModel();
	        console.log("payload",this.model.get('payload'));
			deleteModel.subject_id = this.model.get("payload").id;
			deleteModel.enttypes_id = this.model.get("payload").enttypes_id;
			deleteModel.removeNode =$(e.currentTarget).parents("li.comment");
			deleteModel.destroyAndRemove();
        }       
        
      });

    return CommentItemView;
});