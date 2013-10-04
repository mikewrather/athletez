define(["require","text!profilesetting/templates/positions.html","facade","views","utils","vendor","profilesetting/collections/positions"],function(e,t){var n,r,i=e("facade"),s=e("views"),o=s.SectionView,u=e("utils"),a=u.lib.Channel,f=e("vendor"),l=e("profilesetting/collections/positions"),c=f.Mustache,h=i.$,r=o.extend({template:t,events:{},controls:{spnPositionTitle:".spn-position-title_h",divLevels:".div-levels",btnPositions:".btnOpenPositions",btnClose:".btn-Close-Positions"},messages:{},properties:{},initialize:function(e){n=this,n.setOptions(e),n.BindPositions(),n.bindEvents()},bindEvents:function(){},MarkPosition:function(e){h(e).hasClass("active")?h(e).addClass("active"):h(e).removeClass("active")},setOptions:function(e){if(!e.sport_id)throw new Error("Sport_id is missing for Positions View",e);this.destination=e.destination,this.sport_id=e.sport_id,this.el=e.destination,this.target=e.target},BindPositions:function(){if(n.sport_id){var e=new l;e.sport_id=n.sport_id,e.fetch(),h.when(e.request).done(function(){if(e.isError())return;var t=e.toJSON();n.positions=[];if(t!=null&&t.length){n.positions=[];for(var r in t)n.positions.push(t[r].payload)}else n.positions=[];n.render()})}},render:function(){var e=c.to_html(n.template,{Data:n.positions||[]});h(n.destination).html(e),n.positions!=null&&n.positions.length>0?h(n.destination).parents(n.controls.divLevels).find(n.controls.btnPositions).fadeIn():h(n.destination).parents(n.controls.divLevels).find(n.controls.btnPositions).fadeOut()}});return r});