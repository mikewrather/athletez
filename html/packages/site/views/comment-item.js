// commenton-item.js  
// -------  
// Requires `define`
// Return {CommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!site/templates/comment-item.html',
        'common/models/delete'
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

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            var payload = this.model.get('payload');
	        console.log("profile payload = ", payload);
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
        	console.log(this.model);
        	e.stopPropagation();
			e.preventDefault();
			
			var _self = this, deleteModel = new DeleteModel();
			deleteModel.subject_id = this.model.get("payload").subject_enttypes_id;
			deleteModel.entity_id = this.model.get("payload").subject_id;

			deleteModel.destroy();
			
			$.when(deleteModel.request).done(function() {
				$(e.currentTarget).parents("li.image").addClass('remove-item');
			});
        }       
        
      });

    return CommentItemView;
});