define(["require","text!registration/templates/select_org.html","facade","views","utils","registration/models/my_club","registration/views/find_my_club"],function(e,t){var n,r=e("facade"),i=e("views"),s=e("utils"),o=r.$,u=s.lib.Channel,a=i.SectionView,f=e("registration/models/my_club"),l=e("registration/views/find_my_club");return n=a.extend({id:"main-content",step:1,events:{"click .find_club":"findMyClub","click .high_school":"highSchoolLocator","click .indiv_sports":"individualSports","click .next":"nextStep"},template:t,initialize:function(e){a.prototype.initialize.call(this,e)},childViews:[],findMyClub:function(e){e.preventDefault();if(this.step!=1)return;var t=this;this.myclub?(this.myclub.fetch(),this.findMyClubView.render(),o("#"+this.findMyClubView.id).dialog({width:"80%",close:t.removeMyClubView})):(this.myclub=new f,this.myclub.id=t.model.get("payload").id,this.myclub.fetch(),o.when(this.myclub.request).done(function(){t.setupFindMyClub()}))},setupFindMyClub:function(){function n(){o("#"+e.findMyClubView.id).dialog("close")}var e=this;this.findMyClubView=new l({model:this.myclub});var t=this.addChildView(this.findMyClubView);this.childViews.findMyClubView=this.findMyClubView,this.callbacks.add(function(){t()}),this.findMyClubView.render(),this.$el.append(e.findMyClubView.el),o("#"+e.findMyClubView.id).dialog({width:"80%",close:e.removeMyClubView}),u("registration-close-clubview").subscribe(n)},removeMyClubView:function(){},highSchoolLocator:function(e){e.preventDefault();if(this.step!=2)return},individualSports:function(e){e.preventDefault();if(this.step!=3)return},nextStep:function(e){e.preventDefault();if(this.step!=4)return}}),n});