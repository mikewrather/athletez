define(["user/models/basics"],function(e){var t;return t=e.extend({fetchSuccess:function(t,n){e.prototype.fetchSuccess.call(this,t,n);var r=new Date(t.get("payload").dob),i=new Date,s=i.getFullYear()-r.getFullYear();s>18?t.set("show_highschool",!1):t.set("show_highschool",!0)}}),t});