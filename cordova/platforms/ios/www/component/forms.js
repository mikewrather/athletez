define(["require","facade","views","utils","vendor","vendor/plugins/qtip/qtip","text!vendor/plugins/qtip/qtip.css","vendor/plugins/spin.min"],function(e){return function(t,n){var r={},s,o=e("facade"),u=e("views"),a=o.Backbone.Model.extend({schema:t}),f=new a,l=(new o.Backbone.Form({model:f,formValues:r})).render();n.append(l.el);if(t){var c=l.getValue();r.fields={};for(var h in c)r.fields[h]={currentValue:function(){return l.fields[h].editor.getValue()},form_field:l.fields[h].editor,deps:l.fields[h].editor.valueBindings?l.fields[h].editor.valueBindings:[],post_to_server:typeof l.fields[h].editor.post_to_server!="undefined"?l.fields[h].editor.post_to_server:!0};r.getFormValues=function(){var e={};if(r.fields)for(var t in r.fields)if(r.fields[t].post_to_server){var n=[];if(r.fields[t].deps&&r.fields[t].deps.length)for(var i in r.fields[t].deps)n.push(l.fields[r.fields[t].deps[i]].editor.getValue()||"");else n.push(l.fields[t].editor.getValue());var s=l.fields[t].editor.serverKey||t;e[s]=n.join(" ")}return e},r.updateUiAfterUpdatingObject=function(e,t){l.fields&&e&&l.fields[e]&&l.fields[e].editor.setValue(t)},r.getFieldValue=function(e){if(l.fields&&e&&l.fields[e]){var t=[];if(r.fields[e].deps&&r.fields[e].deps.length)for(var n in r.fields[e].deps)t.push(l.fields[r.fields[e].deps[n]].editor.getValue()||"");else t.push(l.fields[i].editor.getValue());return t.join(" ")}return undefined},r.updateFormValues=function(e){if(e&&e.objectValuesToUpdate)for(var t in e.objectValuesToUpdate){var n=l.fields[e.objectValuesToUpdate[t]].editor;n.setValue("","")}},r.showServersErrors=function(e){if(l.fields)for(var t in l.fields)if(l.fields[t].editor.serverDbField)for(var n in e)if(e[n].field==l.fields[t].editor.serverDbField){if(l.fields[t].editor.valueBindings&&l.fields[t].editor.valueBindings.length){var r=l.fields[l.fields[t].editor.valueBindings[0]].editor.id;$("#"+r).parents(".field-row").find("*[data-error='']").html(e[n].error).show()}else{var r=l.fields[t].editor.id;$("#"+r).parents(".field-row").find("*[data-error='']").html(e[n].error).show()}break}}}return{form:l,formValues:r}}});