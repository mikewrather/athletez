/*
***** module as controller for 'photoplayer' control
*/

define(["require", 'text!usercontrols/photo-player/templates/comments.html',
		'text!usercontrols/tag/templates/layout.html',
	   "facade", "controller", "models", "views",
	   "usercontrols/photo-player/collections/comments",
	   "usercontrols/photo-player/views/main",
	   "usercontrols/photo-player/views/comments",
	   "usercontrols/photo-player/collections/tags",
	   "usercontrols/photo-player/views/tags",
	   "usercontrols/photo-player/models/tags",
	   'usercontrols/tag/views/main',
	   'usercontrols/tag/models/basic_info',
	    ], function(require, modelBoxCommentTemplate, tagTemplate) {

	var PhotoPlayerController, facade = require("facade"), Controller = require("controller"),
	 models = require("models"), views = require("views"), utils = require("utils"), 
	 $ = facade.$, _ = facade._, debug = utils.debug, 
	 Channel = utils.lib.Channel, LayoutView = views.LayoutView,
	Backbone = facade.Backbone,
	// models
	
	//collections
	CommentsCollection = require("usercontrols/photo-player/collections/comments"),
	TagsCollection = require("usercontrols/photo-player/collections/tags"),
	// views
	PhotoPlayerView = require("usercontrols/photo-player/views/main"),
	CommentSectionView = require("usercontrols/photo-player/views/comments"),
	TagsSectionView = require("usercontrols/photo-player/views/tags"),
	TagsSectionmodel = require("usercontrols/photo-player/models/tags"),
	TagView = require('usercontrols/tag/views/main'),
	UserModel = require('usercontrols/tag/models/basic_info'),
	PhotoPlayerController = Controller.extend({
		// define css files to load
		cssArr : ["/usercontrols/photo-player/photoPlayer.css"],
		events : {
		},
		
		// controller intialize function
		initialize : function(options) {
			var _self = this;
			_self.startPlayer(options);
			/*
			if(!_self.checkForUser()){
				routing.trigger('showSignup', function(callback) {
		  	   		_self.startPlayer(options);
			     });
			} else {
				_self.startPlayer(options);
			}
			*/
		},
		
		startPlayer: function(options) {
			var _self = this;
			// load css file
			Channel('load:css').publish(this.cssArr);
			_.bindAll(this);
			// model box html 
			if (options.id) this.id = options.id;
			this.index = options.index;
			if(options.userId) this.userId = options.userId;
			this.pageId = options.pageId;
			if(options.pageName) this.pageName = options.pageName;
			if(options.array) this.collectionArray = true;
			this.mediaId = options.mediaId;
			if (options._collection) this._collection = options._collection;

				$(document).off("click", "#photoPlayerModal .close");	
				$(document).on("click", "#photoPlayerModal .close", function() {
					// remove meadia for url
					var currentHashUrl = window.location.hash;
					if(currentHashUrl.match(/\/media\/(.*)/g)) {
						currentHashUrl = currentHashUrl.replace(/\/media\/(.*)/g,'');
					 }
					routing.navigate(currentHashUrl, {trigger: false});
				});

				this.modelHTML = '<div id="photoPlayerModal" class="modal region-loader photo-frame-model hide fade model-popup-h">'+
		//		'<div class="photo-player-mask hide photo-player-mask-h"></div>'+
				'<div class="modal-body page-content-h">'+
				'<div class="photo-player-area-h photo-player"></div>'+
				'<div class="photo-player-right-area"><div class="teamName-area">'+
				'</div><div class="tags-area-h"></div>' +
				'<div class="comment-area coment-area-h"></div><div class="comment-input-outer-h comment-input-outer" class="clearfix"></div>'+
				'<div id="image-tagging-photo"></div>'+
				'</div></div></div>';
			
			routing.off('photo-player-section-reload');
			routing.on('photo-player-section-reload', function(entity_id, id,uploader_id) {
				_self.id = id;
				//alert("en reload");
				$("#image-tagging-photo").html('');
				_self.setUpCommentView(entity_id, id);
				_self.setUpTagView(entity_id, id,uploader_id);
			});
			
			routing.off('comments-fetch-new-form-data');
	       	routing.on('comments-fetch-new-form-data', function(entity_id, id,uploader_id) {
	       	//	alert("en data");
	       		_self.setUpCommentView(entity_id, id,uploader_id);
	       	});
	       	
	       	routing.off('tags-fetch-new-form-data');
	       	routing.on('tags-fetch-new-form-data', function(entity_id, id,uploader_id) {
	       	//	alert("en data");
	       		_self.setUpTagView(entity_id, id,uploader_id);
	       	});

  			// set up main layout view					
			this.setupLayout().render();
			this.setUpMainView();
			this.handleDeferreds();
		},

		checkForUser: function() {
			if(!_.isUndefined(routing.userLoggedIn) && routing.userLoggedIn)
				return true;
			else
				return false;
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
            $('#photoPlayerModal').modal('show');
            return this.layout;
		},
		
		// set up photo player main view
		setUpMainView : function() {
			var self = this; 
			if(self.collectionArray) {
				var limit = self._collection.limit, offset = self._collection.offset, collectionInstance1 = Backbone.Collection.extend();
				var collectionInstance = new collectionInstance1();
				self._collection.limit = undefined;
				self._collection.offset = 0;
				collectionInstance.url = self._collection.url;
				collectionInstance.fetch({
					success: function(r) {
						self.setupPhotoPlayerView(r);
					},
					error: function(r, a) {
						console.error(r, a);
					}
				});
			} else {
				var collectionJSON = self._collection.toJSON() ,json = {}, collectionInstance1 = Backbone.Collection.extend(), collectionInstance = new collectionInstance1();;
				json.payload = [];
				for(var i in collectionJSON) {
					json.payload.push(collectionJSON[i].payload);
				}
				collectionInstance.reset(json);
				self.setupPhotoPlayerView(collectionInstance);
				console.error(collectionInstance, collectionInstance.toJSON());
			}
		},
		
		setupPhotoPlayerView: function(r) {
			var self = this;
			$("#photoPlayerModal").removeClass("region-loader");
			if(self._collection && self._collection.limit) self._collection.limit = limit;
			if(self._collection && self._collection.offset) self._collection.offset = offset;
			var photoPlayerMain = new PhotoPlayerView({
				model : r.models[0],
				name : "photo player",
				destination : ".photo-player-area-h",
				index : self.index,
				pageName: self.pageName,
				pageId: self.pageId,
				user_id : self.userId || null,
				sports_id : self.sports_id || null,
				scheme : self.scheme,
				layout : self.layout,
				mediaId: self.mediaId
			});

			var ppwidth = $(document).width(),
			photosec = ppwidth-350;
			$('#photoPlayerModal .photo-player-area-h').css({width:photosec+'px'});
			self.scheme.push(photoPlayerMain);
			self.layout.render();
		},
		
		setUpTagView: function(entity_id, id,uploader_id) {
			var l = this.scheme.length;
			for(var i = 0; i < l; i++) {
				if(this.scheme[i].name == this.oldTagView) {
					this.scheme[i].remove();
				}
			}
			var _self = this;
			_self.oldTagView = "tag section" + Math.random();
			$(".tags-area-h").unbind().html("");
			_self.tags = new TagsCollection();
			_self.tags.id = id;
			_self.tags.targetElement = ".tags-area-h";
			_self.tags.fetch();
			console.log("Looking for media obj",uploader_id);
			//$(".coment-area-h").html();
			$.when(_self.tags.request).done(function () {
				var modeltag = new TagsSectionmodel();
				var tagView = new TagsSectionView({
					collection : _self.tags,
					userId: _self.userId,
					name : _self.oldTagView,
					model:modeltag,
					uploader:uploader_id,
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
				
			}
			
			var _self = this, photoPlayer;
			_self.oldView = "comment section" + Math.random();
			$(".coment-area-h, .comment-input-outer-h").unbind().html("");
			_self.commentson = new CommentsCollection();
			_self.commentson.subject_entity_type = entity_id;
			_self.commentson.id = id;
			_self.commentson.fetch();
			
			$.when(_self.commentson.request).done(function () {
				console.error(_self.commentson);
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
			
		},
		
		setUpTagPhotoView : function(entity_id, id) {
			var self = this;
			this.tagViewPhoto = new TagView({
				model : new UserModel(),
				template : tagTemplate,
				name : "tag-image " + new Date().toString() ,
				destination : "#image-tagging-photo",
				user_id : self.userId || null,
				sports_id : self.sports_id,
				channel : 'tag-image-success-photo'
			});
				self.scheme.push(this.tagViewPhoto);
				self.layout.render();
      },
      
      tagFunction : function(data) {
	      	var self = this;
	      	alert(JSON.stringify(data));
      }
	});
	return PhotoPlayerController;

});

