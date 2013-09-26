// commenton-item.js  
// -------  
// Requires `define`
// Return {CommentItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!site/templates/comment-item.html'
        ], 
function (
        vendor,
        views,
        utils,
        commentItemTemplate
        ) {

    var CommentItemView,
        BaseView = views.BaseView, 
        Mustache = vendor.Mustache;

      CommentItemView = BaseView.extend({

        tagName: "li",

        className: "comment",
          
        initialize: function (options) {
        	if(!options.template)
		        this.template = commentItemTemplate;
		    else	    
		    	this.template = options.template;
        },		

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            console.log("--------render------------");
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
        }        
        
      });

    return CommentItemView;
});