define(["facade","views","utils","media/views/image-item","media/views/image-board","media/views/add-image","text!media/templates/image-list.html"],function(e,t,n,r,i,s,o){var u,a,f=e.$,l=e._,c=require("vendor"),h=n.lib.Channel,p=t.CollectionView,d=t.SectionView,v=c.Mustache;return a=p.extend(d.prototype),u=a.extend({__super__:p.prototype,template:o,_tagName:"li",_className:"image",page:0,page_limit:6,listView:".image-list",_view:r,events:{"click .see-more-h":"seeMore","click .open-photo-player-h":"initPhotoPlayer","dragover #image-place-holder":"drag","drop #image-place-holder":"drop"},renderTemplate:function(){var e=v.to_html(this.template,{target:this.target_id});return this.$el.html(e),this},drag:function(e){e.stopPropagation(),e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="copy"},drop:function(e){var t=this;e.stopPropagation(),e.preventDefault();var n=e.originalEvent.dataTransfer.files;this.files_drag=e.originalEvent.dataTransfer.files;var r=[],i=[],s=0;for(var o=0,u;u=n[o];o++){if(!u.type.match("image.*"))continue;var a=new FileReader;a.onload=function(e){return function(r){var o="preview_"+s;s++,i.push({preview_id:o,drag_info:t.files_drag,width:"150",height:"150",filesrc:r.target.result,title:escape(e.name)}),s==n.length&&(data={data:i},t.openImageUploader(data))}}(u),a.readAsDataURL(u)}},openImageUploader:function(e){var t=this.sport_id,n=this.target_url+this.target_id,r={sports_id:t},i=e;routing.trigger("add-image",n,r,i)},checkForUser:function(){return!l.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},initialize:function(e){e.name?this.name=e.name:this.name="image list",console.error(e),this.pageName=e.pageName?e.pageName:"profile",e.collecton&&(this.collection=e.collection),this.target_id=e.target_id,this.target_url=e.target_url,this.sport_id=e.sport_id,this.user_id=e.user_id,this.media_id=e.media_id,this.triggerItem=e.triggerItem,e.dontrenderTemplate||this.renderTemplate();var t=this;t.allData=this.collection.toArray();var n=t.allData.length;t.start=0,t.end=t.page_limit,t.page_limit=8,t.seeMore(),p.prototype.initialize.call(this,e);if(!this.collection)throw new Error("ImageListView expected options.collection.");l.bindAll(this),this.addSubscribers(),this.setupBoardView(),this.setupAddView(),t.media_id&&setTimeout(function(){if(t.allData)for(var e in t.allData)if(t.media_id==t.allData[e].get("payload").media_id){routing.trigger("photo-player-init",e,t.allData,t.user_id,!0,t.pageName);break}},500)},initPhotoPlayer:function(e){var t=f(e.target).parents("li").index(),n=f("#add-media").length?1:0;t-=n,t<0&&(t=0),routing.trigger("photo-player-init",t,this.allData,this.user_id,!0,this.pageName)},seeMore:function(e){var t=this.allData.length;e&&(this.start=this.end,this.end=this.end+this.page_limit),t<=this.end&&this.$el.find(".see-more-h").hide(),e?this.collection.add(this.allData.slice(this.start,this.end)):this.collection.reset(this.allData.slice(this.start,this.end)),this.page++,e&&(this.addSubscribers&&this.addSubscribers(),this.setupBoardView&&this.setupBoardView(),this.setupAddView&&this.setupAddView())},childViews:{},setupAddView:function(){function r(e){t.model=e,t.render(),f(this.listView).append(t.el)}var e,t=new s({collection:this.collection}),n=this.addChildView(t);this.childViews.form=t,this.callbacks.add(function(){n()}),h("addimage:fetch").subscribe(r)},filterWithImageType:function(e){var t=this.collection;return f.each(t.models,function(t,n){n.selectImageType&&n.selectImageType(e)}),t},setupBoardView:function(){function o(e){r.model=e,r.render()}var e=this;setTimeout(function(){e.triggerItem&&!f("#add-icons").length&&(f(e.listView).prepend('<li id="add-icons"></li>'),routing.trigger(e.triggerItem,"#add-icons"))},0);if(this.collection.size()==0)return;var t=this.filterWithImageType(this.imagetype),n,r=new i({collection:t,model:t.at(0)}),s=this.addChildView(r);this.childViews.board=r,this.callbacks.add(function(){s(),r.render(),f(this.listView).prepend(r.el)}),h("changeimage"+this.collection.id).subscribe(o)}}),u});