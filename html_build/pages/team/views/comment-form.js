define(["require","team/models/commentform","site/views/comment-form"],function(e,t,n){var r;return r=n.extend({setOptions:function(e){if(!this.collection)throw new Error("CommentFormView expected options.collection.");this.model||(this.model=new t({id:this.collection.id,sport_id:this.collection.sport_id,complevel_id:this.collection.complevel_id,season_id:this.collection.season_id}),this.model.fetch())}}),r});