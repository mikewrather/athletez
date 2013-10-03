// image-item.js  
// -------  
// Requires `define`
// Return {ImageItemView} object as constructor

define([ 
        'vendor', 
        'views',
        'utils', 
        'text!pages/home/templates/image-item.html',
         'votes/models/vote',
        'votes/models/follow'
        ], 
function (
        vendor,
        views,
        utils,
        imageItemTemplate
        ) {

    var ImageItemView
      , $ = vendor.$
      , BaseView = views.BaseView,
      voteModel = require('votes/models/vote'),
        followModel = require('votes/models/follow'),
      Mustache = vendor.Mustache;

      ImageItemView = BaseView.extend({
        tagName: "li",
        className: "image",
        // Event handlers...
        events: {
            //"click": "changeImage",
			// "click .vote-h": "vote",
	        // "click .follow-h": "follow",
	        // "click .edit-h": "edit",
	        // "click .delete-h": "delete"
        },
        
        initialize: function (options) {
            this.template = imageItemTemplate;
        },

        render: function ()
        {

	        var _self = this, mpay = this.model.attributes.payload,
		        extra = {
			        _enttypes_id : mpay.enttypes_id,
	                _id : mpay.id
		        };
	        switch(mpay.enttypes_id)
	        {
		        case '23': //videos
			        extra._thumbnail = mpay.thumbs;
			        extra._label = mpay.media.name;
					extra._link = "";
			        break;
		        case '21': //images
			        if(typeof(mpay.types) == 'object' && mpay.types.standard_thumb) extra._thumbnail = mpay.types.standard_thumb.url;
			        extra._label = mpay.media_obj.name;
			        extra._link = "";
			        break;
		        case '1': //users
			        if(typeof(mpay.user_picture_obj) == 'object') extra._thumbnail = mpay.user_picture_obj.types.standard_thumb.url;
			        extra._label = mpay.label;
					extra._sublabel = "Coming Soon";
			        extra._link = "/#profile/" + mpay.id;
			        break;
		        case '8':  //games
			        extra._detailclass = "game";
			        extra._thumbnail = mpay.game_picture;
			        extra._label = mpay.game_day;
			        extra._link = "/#game/" + mpay.id;
			        var team_str = "";
			        for(var i=0;i<mpay.teams.length;i++)
			        {
						team_str += '<a href="/#team/' + mpay.id + '">';
				        team_str += mpay.teams[i].team_name;
				        team_str += '</a>';
				        if(i+1 < mpay.teams.length) team_str += " VS. ";
			        }
			        extra._sublabel = team_str;
			        break;

	        }
	        console.log("Called Image Render",extra);
            var markup = Mustache.to_html(this.template, extra);
            this.$el.html(markup);

	        var game_detail_view_height = '120px',
		        detail_view_height = '92px';

	        this.$el.find('.image-outer-h').mouseout(function() {
		        $(this).find('.action-block.vote, .action-block.follow').css({opacity:0});
		        $(this).find('.detail-view').css({'bottom': '-'+detail_view_height});
		        $(this).find('.detail-view.game').css({'bottom': '-'+game_detail_view_height});
	        });

	        this.$el.find('.image-outer-h').mouseover(function() {
		        $(this).find('.detail-view').css({'bottom': '0px'});
		        $(this).find('.action-block.vote, .action-block.follow').css({opacity:90});
	        });
	        
	        
	        this.$el.find('.vote-h').click(function() {
	        	_self.vote();
	        });
	        
	        this.$el.find('.follow-h').click(function() {
	        	_self.follow();
	        });
	        
	        this.$el.find('.edit-h').click(function() {
	        	_self.edit();
	        });
	        
	        this.$el.find('.delete-h').click(function() {
	        	_self['delete']();
	        });
	        
            return this;
        },

	    vote: function(e)
	    {
		   e.preventDefault();
		    console.log(this.model);
		    var voteModelOb = new voteModel();
			voteModelOb.userId = this.model.id;
			voteModelOb.entity_id = this.model.get("payload").enttypes_id;
			voteModelOb.setData();
			voteModelOb.save();
	    },

	    follow: function(e){
		     e.preventDefault();
		    console.log(e.target);
		    var followModelOb = new followModel();
			followModelOb.userId = this.model.id;
			followModelOb.entity_id = this.model.get("payload").enttypes_id;
			followModelOb.save();
	    },
        
        changeImage: function() {

            Channel('changeimage' + this.model.collection.id).publish(this.model);
        },
        edit: function(e)
		{
			alert("edit");
			e.preventDefault();
			console.log("edit");
		},

		'delete': function(e)
		{
				alert("delete");
			e.preventDefault();
			console.log("delete");
		}
               
        
      });

    return ImageItemView;
});