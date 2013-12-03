define(["require","text!pages/home/templates/menu.html","facade","views","jquery.slimscroll"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView;return n=s.extend({id:"menu",events:{"blur #search":"updateSearch","focus #search":"hideDropdown","click .restype":"changeBaseUrl","click .dropdown-menu-alias > li > a":"select","click .dd":"doNothing","click .menu-link-h":"showMenuDropdown","click .views-reset-btn-h":"resetView","click .sport-reset-btn-h":"resetSport","click .location-reset-btn-h":"resetLocation","click .reset-all-btn-h":"resetAll"},demoSelect:function(){},resetAll:function(){this.resetView(),this.resetLocation(),this.resetSport()},resetView:function(){var e="view";Channel("resetFilter").publish(e),this.$el.find(".menu-detail-h").hide(),this.$el.find(".reset-view-area-h ul li a.select, .reset-view-area-h ul li.select").removeClass("select")},resetSport:function(){var e="sports";Channel("resetFilter").publish(e),this.$el.find(".menu-detail-h").hide(),this.$el.find(".reset-sport-area-h ul li a.select, .reset-sport-area-h ul li.select").removeClass("select")},resetLocation:function(){var e="location";Channel("resetFilter").publish(e),this.$el.find("#city").val(""),this.$el.find(".menu-detail-h").hide(),this.$el.find(".reset-location-area-h ul li a.select, .reset-location-area-h ul li.select").removeClass("select")},template:t,intialize:function(e){s.prototype.initialize.call(this,e)},updateSearch:function(e){Channel("textChanged").publish($(e.target).val())},changeBaseUrl:function(e){var t=$(e.currentTarget);t.parents("ul").find(".restype").removeClass("select"),t.addClass("select");var n=t.data("number");Channel("baseUrlChanged").publish(n)},stateListChange:function(e){var t=$(e.currentTarget).val(),n=t.data("id");routing.trigger("stateChanged",n)},doNothing:function(e){e.preventDefault(),e.stopPropagation()},hideDropdown:function(){this.$el.find(".menu-detail-h").hide()},hideAllDropdowns:function(){var e=this;$("html, #search").click(function(t){try{}catch(t){console={},console.log=function(e){}}$(t.target).parents(".menu").length||e.hideDropdown()})},showMenuDropdown:function(e){var t=$(e.currentTarget).next();t.css("display")=="none"?(this.$el.find(".menu-detail-h").hide(),t.show()):t.hide()},select:function(e){e.preventDefault(),e.stopPropagation();var t=$(e.currentTarget),n=t.attr("class");$(".dropdown-menu > li > a."+n).removeClass("select"),n=t.attr("class").split(" ")[0],$(t).addClass("select");var r={submenu:n,value:$(t).data("id")||$(t).text()};Channel("viewFilterChanged").publish(r),debug.log(r)},toggle:function(e){e.preventDefault();var t=$(e.currentTarget),n=$(t).offset(),r=n.top+40,i=n.left+10,s=t.attr("id");s="#"+s+" .dd",$(s).attr("class")==="dd open"?$(s).hide().removeClass("open"):($(".open").hide().removeClass("open"),$(s).css("top",r).css("left",i),$(s).show(),$(s).addClass("open"))},afterRender:function(){this.hideAllDropdowns();var e=this,t=setInterval(function(){try{$(e.el).find(".sport-list").slimScroll(),clearInterval(t)}catch(n){}},1e3),n=this.model.toJSON();try{}catch(r){console={},console.log=function(e){}}}}),n});