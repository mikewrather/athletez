// Header View
// ---------
// Package Image Uploader
// Requires `define`, `require`
// Returns {ImageUploaderView} constructor

define([
        'require', 
        'text!imageup/templates/uploader.html', 
        'facade', 
        'views',
        'utils',
        'vendor',
    	"imageup/models/basic",
    	"imageup/views/errors"
        ], 
function(require, imageBasicTemplate) {

    var ImageBasicView,
        facade = require('facade'),
        views = require('views'),
        utils = require('utils'),
        Channel = utils.lib.Channel,
        vendor = require('vendor'), 
        SectionView = views.SectionView,
		ImageBasicModel = require("imageup/models/basic"),
		ErrorDispView = require("imageup/views/errors"),
        $ = facade.$,
        _ = facade._,
        debug = utils.debug;
	debug.log("SectionView: ",SectionView);


    ImageBasicView = SectionView.extend({
	
        id: 'imageuploadForm',

        events: {
	            "click #imageup": "imageUploadClick",
				"change #image_file" : "imagePreview",
				"dragover #imageholder" : "drag",
				"drop #imageholder":"drop"
	    },
	
        template: imageBasicTemplate,
		data :imageBasicTemplate,

        initialize: function (options,attr) {
        	$("#errormsg, #preview").html("");
        	
            SectionView.prototype.initialize.call(this, options);   
			debug.log("Image upload basic view");   
			this.attr=attr;      
			this.files_drag=[];

			$('#imgUploadModal').modal('show') ;
		    $('#imgUploadModal').on('hidden', function () {
		    	routing.trigger('refresh-onImageUpload');
		    });
			$('#imgUploadModal').on('hide', function () {
		    	routing.trigger('refresh-onImageUpload');
		    });
		    console.log($(".modal-body").html());
        },
		drag: function(event) {
			event.stopPropagation();
		    event.preventDefault();
		    event.originalEvent.dataTransfer.dropEffect = 'copy';
		},
		drop: function(event) {
			var _self = this;
			event.stopPropagation();
			event.preventDefault();
			$("#errormsg").hide();
			var files = event.originalEvent.dataTransfer.files;
			this.files_drag=event.originalEvent.dataTransfer.files;
			if(files.length > 0) _self.showLoader(_self);
		    var output = [];var dataum=[];var k=0;
		    for (var i = 0, f; f = files[i]; i++) {
		      if (!f.type.match('image.*')) {
		        continue;
		      }
		      var reader = new FileReader();
		      reader.onload = (function(theFile) {
		        return function(e) {
					var preview_id="preview_"+k;
				  k++;
				  dataum.push({"preview_id":preview_id,"width":"150","height":"150","filesrc":e.target.result,"title":escape(theFile.name)}); 
				  if(k==files.length)
				  {
					data={"data":dataum};
					$('#image_file').attr('disabled', 'disabled')
					routing.trigger("imageup-preview", data);
				  }
				  _self.hideLoader();
				};
		      })(f);
		      reader.readAsDataURL(f);
		    }
		   
		},
		imagePreview: function(event) {
			var _self = this;
			debug.log("Image preview view");
			$("#preview").hide();
			$("#errormsg").hide();
			var files = $('#image_file')[0].files; 
			console.log(files.length);
			if(files.length > 0) _self.showLoader(_self);
			var dataum=[];var i = 0, f,k=0;
		    for (; f = files[i]; i++) {

		      if (!f.type.match('image.*')) {
		        continue;
		      }
		      var reader = new FileReader();
		     
		      reader.onload = (function(theFile) {
		        return function(e) {
					var preview_id="preview_"+k;
				  k++;
				  dataum.push({"preview_id":preview_id,"width":"150","height":"150","filesrc":e.target.result,"title":escape(theFile.name)}); 
				  if(k==files.length)
				  {
					data={"data":dataum};
					routing.trigger("imageup-preview", data);
				  	_self.hideLoader();
				  }
				  
				};
				
		      })(f);
		      reader.readAsDataURL(f);
		    }
		},
        imageUploadClick: function(event)
        {
	        

	        event.preventDefault();

			var thiss=this;			
			$("#errormsg").hide();
			$("#imageup").attr("disabled", "disabled");
			$(".closepreview").attr("disabled", "disabled");
			$(".rotate").attr("disabled", "disabled");
			console.log($('#image_file')[0].files.length)
			console.log(this.files_drag.length)
			console.log($(".previewimg").length)
			if($(".previewimg").length==0)
			{
				var msg={"msg":"Image Field Empty","color":"alert-error"};
				routing.trigger("imageup-msg", msg);	
				$("#imageup").removeAttr("disabled");
			}
			else if(this.files_drag.length>=1)
			{
				var len=this.files_drag.length;
				jQuery.each(this.files_drag, function(i, file) {
					var data = new FormData();
					if ($('#preview_'+i+"group").length > 0) {
						data.append('image_file',file);
						if($('#preview_'+i+'rotang').val()>0)
							data.append('rotate',$('#preview_'+i+'rotang').val());
						else
							data.append('rotate',"false");
						for(var attrname in thiss.attr) {
							data.append(attrname,thiss.attr[attrname]);
						}
						var dataum={"dataum":data,"id":i,"len":len};
						routing.trigger("imageup-add-image", dataum);
					}
				});
				this.files_drag=[];
				$("#imageup").removeAttr("disabled");
			}
			else
			{
				console.log($('#image_file')[0].files.length + "=file prasobh");
				jQuery.each($('#image_file')[0].files, function(i, file) {
					var data = new FormData();
					if ($('#preview_'+i+"group").length > 0) {
						data.append('image_file',file);
						if($('#preview_'+i+'rotang').val()>0)
							data.append('rotate',$('#preview_'+i+'rotang').val());
						else
							data.append('rotate',"false");
						for(var attrname in thiss.attr) {
							data.append(attrname,thiss.attr[attrname]);
						}	
						var dataum={"dataum":data,"id":i,"len":$('#image_file')[0].files.length};
						routing.trigger("imageup-add-image", dataum);
					}
				});
				$("#imageup").removeAttr("disabled");
			}

        }	
                
    });


    return ImageBasicView;
});