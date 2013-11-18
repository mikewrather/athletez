/*
 *  Form Component
 *  Author: Sanjay Kumar
 * 	Description:
 *  Date: 10th November, 2013
 *
 * */

define(['require', 'facade', 'views', 'utils', 'vendor'], function(require) {

	return function(fields, $target) {
		var formValues = {}, self, facade = require('facade'), views = require('views');
		var FormModel = facade.Backbone.Model.extend({
			schema : fields
		});

		var formModel = new FormModel();
		var form = new facade.Backbone.Form({
			model : formModel,
			formValues: formValues
		}).render();
		$target.append(form.el);

		// generate form Value Object
		if (fields) {
			var formData = form.getValue();
			formValues.fields = {};
			for (var key in formData) {
				formValues.fields[key] =  {
					currentValue : formData[key],
					form_field : form.fields[key].editor,
					deps : (form.fields[key].editor.valueBindings)?form.fields[key].editor.valueBindings:[],
					post_to_server : (typeof form.fields[key].editor.post_to_server != "undefined")?form.fields[key].editor.post_to_server:true,
				};
			}
			
			// get form values 
			formValues.getFormValues = function() {
				var ob = {};
				if(formValues.fields) {
					for(var i in formValues.fields) {
						var v = "";
						if(formValues.fields[i].deps && formValues.fields[i].deps.length) {
							for(var j in formValues.fields[i].deps) {
								v += form.fields[formValues.fields[i].deps[j]].editor.getValue() || '';
							}
						} else {
							v = form.fields[i].editor.getValue();
						}
						if(formValues.fields[i].post_to_server) {
							var key = form.fields[i].editor.serverKey || i;
							ob[key] = v;
						}
					}
				}
				return ob;
			};
			
			// update form values after field update
			formValues.updateFormValues = function(editor) {
				if(editor && editor.objectValuesToUpdate) {
					for(var i in editor.objectValuesToUpdate) {
						var ob = form.fields[editor.objectValuesToUpdate[i]].editor;
						var v = [];
						if(ob.valueBindings) {
							for(var k in ob.valueBindings) {
								v.push(form.fields[ob.valueBindings[k]].editor.getValue());
							}
						}
						ob.setValue(v.join(" "));
					}
				}
			};
		}
		return {
			form : form,
			formValues : formValues
		};
	};

}); 