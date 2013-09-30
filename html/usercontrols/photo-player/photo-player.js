/*
***** module as controller for 'photoplayer' control
*/

define(["require", 'text!usercontrols/photo-player/templates/comments.html',
	   "facade", "controller", "models", "views",
	   "user/models/basic_info",
	   "usercontrols/photo-player/collections/comments",
	   "usercontrols/photo-player/views/main",
	   "usercontrols/photo-player/views/comments",
	   "usercontrols/photo-player/collections/tags",
	   "usercontrols/photo-player/views/tags",
	    ], function(require, modelBoxCommentTemplate) {

	var PhotoPlayerController, facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,
	Backbone = facade.Backbone,
	// models
	BasicModel = require("user/models/basic_info"),
	
	//collections
	CommentsCollection = require("usercontrols/photo-player/collections/comments"),
	TagsCollection = require("usercontrols/photo-player/collections/tags"),
	// views
	PhotoPlayerView = require("usercontrols/photo-player/views/main"),
	CommentSectionView = require("usercontrols/photo-player/views/comments"),
	TagsSectionView = require("usercontrols/photo-player/views/tags"),
	
	PhotoPlayerController = Controller.extend({
		// define css files to load
		cssArr : ["/usercontrols/photo-player/photoPlayer.css"],
		events : {
		},
		
		// controller intialize function
		initialize : function(options) {
			console.log("init");
			var _self = this;
			// load css file
			Channel('load:css').publish(this.cssArr);
			_.bindAll(this);
			// model box html 
			if (options.id) this.id = options.id;
			if (options.index) this.index = options.index;
			if(options.userId) this.userId = options.userId;
			if (options._collection) this._collection = options._collection;
				this.modelHTML = '<div id="modalPopup" class="modal photo-frame-model hide fade model-popup-h">'+
					'<div class="modal-header">'+
 					'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
					'</div>'+
					'<div class="modal-body page-content-h">'+
					'<div class="photo-player-area-h photo-player"></div>'+
					'<div class="photo-player-right-area"><div class="tags-area-h"></div><div class="comment-area coment-area-h"></div><div class="comment-input-outer-h comment-input-outer" class="clearfix"></div>'+
					'</div></div></div>';
			
			routing.off('photo-player-section-reload');
			routing.on('photo-player-section-reload', function(entity_id, id) {
				_self.id = id;
				_self.setUpCommentView(entity_id, id);
				_self.setUpTagView(entity_id, id);
			});
			
			routing.off('comments-fetch-new-form-data');
	       	routing.on('comments-fetch-new-form-data', function(entity_id, id) {
	       		_self.setUpCommentView(entity_id, id);
				_self.setUpTagView(entity_id, id);
	       	});

  			// set up main layout view					
			this.setupLayout().render();
			this.setUpMainView();
			this.handleDeferreds();
		},
		
		// fetch collection here
		handleDeferreds: function() {
		},
		
		// setup main layout
		setupLayout : function() {
			this.scheme=[];
			$(".model-popup-h").remove();
			$('body').append(this.modelHTML);
            var pageLayout = new LayoutView({
				scheme : this.scheme,
				destination : "#modalPopup",
				template : '',
				displayWhen : "ready"
			});
            this.layout=pageLayout;
           $('#modalPopup').modal();
            return this.layout;
		},
		
		// set up photo player main view
		setUpMainView : function() {
			var self = this, collectionInstance = Backbone.Collection.extend(), collection = new collectionInstance(); 
			
			collection.reset(self._collection);
			
			var photoPlayerMain = new PhotoPlayerView({
				model : collection,
				name : "photo player",
				destination : ".photo-player-area-h",
				index : self.index
			});
			this.scheme.push(photoPlayerMain);
			this.layout.render();
		},
		
		setUpTagView: function(entity_id, id) {
			var l = this.scheme.length;
			for(var i = 0; i < l; i++) {
				if(this.scheme[i].name == this.oldTagView)
					this.scheme[i].remove();
			}
			
			var _self = this, tagView;
			_self.oldTagView = "tag section" + Math.random();
			_self.tags = new TagsCollection();
			_self.tags.id = id;
			_self.tags.fetch();
			//$(".coment-area-h").html();
			$.when(_self.tags.request).done(function () {
				/// 
				
				console.error(_self.tags.toJSON());
				
				//var collection = _self.tags.t
				
				
				console.error(_self.tags);
				tagView = new TagsSectionView({
					collection : _self.tags,
					name : _self.oldTagView,
					entity_type_id: entity_id,
					destination : ".tags-area-h"
				});
				_self.scheme.push(tagView);
				_self.layout.render();
			});
		},
		
		// set up comment view in photo player
		setUpCommentView: function(entity_id, id) {
			var l = this.scheme.length;
			for(var i = 0; i < l; i++) {
				if(this.scheme[i].name == this.oldView)
					this.scheme[i].remove();
				console.error(this.scheme[i].name);
			}
			
			var _self = this, photoPlayer;
			_self.oldView = "comment section" + Math.random();
			$(".coment-area-h, .comment-input-outer-h").unbind().html("");
			_self.commentson = new CommentsCollection();
			_self.commentson.subject_entity_type = entity_id;
			_self.commentson.id = id;
			_self.commentson.fetch();
			//$(".coment-area-h").html();
			$.when(_self.commentson.request).done(function () {
								console.error(_self.commentson.toJSON());
				photoPlayer = new CommentSectionView({
					collection : _self.commentson,
					userId: _self.userId,
					name : _self.oldView,
					_template: modelBoxCommentTemplate,
					destination : ".coment-area-h"
				});
				_self.scheme.push(photoPlayer);
				_self.layout.render();
			});
		},
		
		
		setUpOthersView: function() {
			
		}
	});
	return PhotoPlayerController;

});
