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
					currentValue : function() { return form.fields[key].editor.getValue(); } ,
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
						if(formValues.fields[i].post_to_server) {
							var v = [];
							if(formValues.fields[i].deps && formValues.fields[i].deps.length) {
								for(var j in formValues.fields[i].deps) {
									v.push(form.fields[formValues.fields[i].deps[j]].editor.getValue() || '');
								}
							} else {
								v.push(form.fields[i].editor.getValue());
							}
								var key = form.fields[i].editor.serverKey || i;
								ob[key] = v.join(" ");
						}
					}
				}
				return ob;
			};
			
			// update form values ui field when we 
			formValues.updateUiAfterUpdatingObject = function(fieldName, value) {
				if(form.fields && fieldName && form.fields[fieldName]) {
					form.fields[fieldName].editor.setValue(value);
				}
			};
			
			// get field value by object
			formValues.getFieldValue = function(fieldName) {
				if(form.fields && fieldName && form.fields[fieldName]) {
					var v = [];
					if(formValues.fields[fieldName].deps && formValues.fields[fieldName].deps.length) {
						for(var j in formValues.fields[fieldName].deps) {
							v.push(form.fields[formValues.fields[fieldName].deps[j]].editor.getValue() || '');
						}
					} else {
						v.push(form.fields[i].editor.getValue());
					}
					return v.join(" ");
				} else {
					return undefined;
				}
			};
			
			// update form values after field update
			formValues.updateFormValues = function(editor) {
				console.error(editor);
				if(editor && editor.objectValuesToUpdate) {
					for(var i in editor.objectValuesToUpdate) {
						var ob = form.fields[editor.objectValuesToUpdate[i]].editor;
						ob.setValue("");
					}
				}
			};
			
			
			// display server error after submitting form
			formValues.showFormValues = function(jsonData) {
				
			};
			
			
		}
		return {
			form : form,
			formValues : formValues
		};
	};

}); 