define(["require","text!usercontrol/dropdown/template/layout.html","facade","views","utils","vendor"],function(e,t){var n,r=e("facade"),i=e("views"),s=i.SectionView,o=e("utils"),u=o.lib.Channel,a=e("vendor"),f=a.Mustache,l=r.$,c=i.BaseView,h=r.Backbone,p,d;return p=h.View.extend({template:t,multiple:!1,selectedOptions:[],className:"dropdown-wrapper",events:{"click .up-down-arrow-h":"showDropdown","click li a":"selectOptions"},selectOptions:function(e){var t=l(e.target).data("id");this.multiple?this.setMultipleOptions(t,e):this.setSingleOption(t,e),this.showSelectedValue(),this.callback&&this.callback(this.selectedOptions)},showSelectedValue:function(){var e=this.$el.find(".common-dropdown li.selected").text()||this.title;this.$el.find(".dropdown-header-box").html(e)},setMultipleOptions:function(e,t){var n=this.checkifExists(e);n==-1?(l(t.target).parent().addClass("selected"),this.selectedOptions.push(e)):(l(t.target).parent().removeClass("selected"),this.selectedOptions.splice(n,1))},setSingleOption:function(e,t){var n=this.checkifExists(e);n==-1&&(this.selectedOptions=[],console.log(this.$el.find(".common-dropdown li")),this.$el.find(".common-dropdown li").removeClass("selected"),l(t.target).parent().addClass("selected"),this.selectedOptions.push(e),this.$el.find(".hidden-input-dropdown-h").val(e),this.hideDropdown())},checkifExists:function(e){var t=-1;for(var n in this.selectedOptions)if(this.selectedOptions[n]==e){t=n;break}return t},initialize:function(e){d=this,n=this,this.selectedOptions=[],n.setOptions(e),this.render(),this.$el.find(".hidden-input-dropdown-h").attr("id",this.elementId)},hideDropdown:function(e){if(!e||!this.$el.find(l(e.target)).parents(".dropdown-container").length)this.$el.find(".up-down-arrow-h span").removeClass("icon-chevron-up").addClass("icon-chevron-down"),this.$el.find(".common-dropdown").slideUp()},showDropdown:function(e){e.preventDefault();var t=this;l(e.currentTarget).find("span").hasClass("icon-chevron-down")?(l(e.currentTarget).find("span").removeClass("icon-chevron-down").addClass("icon-chevron-up"),l(".dropdown-container").removeClass("increase-dropown-zindex"),t.$el.find(".dropdown-container").addClass("increase-dropown-zindex"),l("html").bind("click",function(e){t.hideDropdown(e)})):l(e.currentTarget).find("span").removeClass("icon-chevron-up").addClass("icon-chevron-down"),l(e.currentTarget).parents(".dropdown-container").find(".common-dropdown").slideToggle()},getRecordId:function(){return this.payload[d.data.recordId]},defaultSelected:function(e){if(d.multiple){if(_.isArray(d.selectedValue))for(var t in d.selectedValue)if(d.selectedValue[t]==this.payload[d.data.recordId])return"selected"}else if(d.selectedValue&&d.selectedValue==this.payload[d.data.recordId])return"selected"},getRecordValue:function(){return this.payload[d.data.recordValue]},render:function(){this.data.dropView=this;if(!this.selectedValue){if(this.data.records.length)var e=this.data.records[0].payload[this.data.recordId];this.multiple?(this.selectedValue=[],this.selectedValue.push(e)):this.selectedValue=e}var t=this,n=f.to_html(t.template,this.data);return l(t.el).html(n),this.targetView.$el.find(this.destination).html(this.el),this.$el.find(".hidden-input-dropdown-h").val(this.selectedValue),this.selectedOptions.push(this.selectedValue),this.showSelectedValue(),l("#"+this.elementId).length?t.callback&&t.callback(this.selectedOptions):setTimeout(function(){console.log("self.callback",t.callback,t.selectedOptions),t.callback&&t.callback(t.selectedOptions)},200),!0},setOptions:function(e){for(var t in e)this[t]=e[t]}}),p});