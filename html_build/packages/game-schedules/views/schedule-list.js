define(["vendor","facade","views","utils","schedules/views/schedule-item","utils/storage","text!schedules/templates/schedule-list.html"],function(e,t,n,r,i,s,o){var u,a,f=t.$,l=t._,c=r.lib.Channel,h=n.CollectionView,p=e.Mustache,d=n.SectionView;return a=h.extend(d.prototype),u=a.extend({__super__:h.prototype,id:"schedule-list",name:"schedule List",tagName:"ul",_tagName:"li",_className:"org",_view:i,events:{"click .add-game-h":"addGame","mouseover .team-info-h":"showinfo","mouseout .team-info-h":"showinfo"},showinfo:function(e){e.preventDefault(),f(e.target).parents(".game-info").length||(f(e.target).find(".game-info").hasClass("hide")?f(e.target).find(".game-info").removeClass("hide"):f(".game-info").addClass("hide"))},checkForUser:function(){return!l.isUndefined(routing.userLoggedIn)&&routing.userLoggedIn?!0:!1},addGame:function(e){if(!this.checkForUser()){f(".signup-email").trigger("click");return}routing.trigger("add-game",0,f(e.currentTarget).data("team-id"),f(e.currentTarget).data("sport-id"))},initialize:function(e){if(!l.isUndefined(e.teamRecords)&&e.teamRecords){var t=e.collection.toJSON();t&&!l.isUndefined(t[0])&&!l.isUndefined(t[0].payload)&&!l.isUndefined(t[0].payload.teams)&&t[0].payload.teams.length&&(this.renderTemplate(),this.singleView=!0,this.listView=".schedule-list-h")}h.prototype.initialize.call(this,e);if(!this.collection)throw new Error("Schedulr expected options.collection.");l.bindAll(this),this.addSubscribers()},renderTemplate:function(){var e={};e.data=this.collection.toJSON(),console.log("Schedule Data",e.data);var t=p.to_html(o,e);return this.$el.html(t),this}}),u});