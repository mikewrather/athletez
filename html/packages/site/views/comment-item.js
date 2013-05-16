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
	        this.template = commentItemTemplate;
        },

        render: function () {
            var markup = Mustache.to_html(this.template, this.model.toJSON());
            this.$el.html(markup);
            
            var payload = this.model.get('payload');
            var self = this;
            if (payload) {
                var user_photo = payload['poster_picture'];
                var user_email = payload['poster_email'];
                if (!user_photo && user_email) {
                    self.$('.user-photo img').attr("src","http://www.gravatar.com/avatar/" + MD5(user_email) + "&s=29");
                }
            }
            
            return this;
        }        
        
      });

    return CommentItemView;
});