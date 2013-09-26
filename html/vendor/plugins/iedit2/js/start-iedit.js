/*
	Functions for displaying Image Editor & Uploader window
*/

$(function () {
    'use strict';
	
	var isEditShown = false;
    
	// Temporary hard links
	var orig = 'http://s3.amazonaws.com/com-runtriz-pictures/144_1_bgiPad_478.jpg';
	var saved_edit = 'http://runtriz-universal-images.s3.amazonaws.com/instances/he_beta/processed/6225432.jpg';

	// Clear the display window, update title and highlight link
	function clearDisplay(newtitle, linksel)  {
		$('.display-main').empty();
		$('.extra-tools').hide();
		$('#page-title').empty();
		$('#page-title').append(newtitle);
		$('.nav').find('a').removeClass('selected'); 
        $(document).find('#'+linksel).addClass('selected'); 
	}
	
	// Create the iEdit window
	$('#show-iedit').click(function() {
		var html = '<div id="image-editor"><div class="main"><table cellspacing="0" cellpadding="0"><tr><td>' +
				'<div class="content"><div id="menu-frame">' +
				'<div class="header"><h1 id="page-title"></h1><a id="iedit-close" class="x" title="close"></a></div>' +
				'<div class="sub"><div class="nav">' +
					'<a id="view-link"><p>View Image</p></a>' +
					'<a id="edit-link"><p>Edit Image</p></a>' +
					'<a id="upload-link"><p>Upload Image</p></a>' +
					'<a id="library-link"><p>Choose From Library</p></a>' +
				'</div><div class="extra-tools"></div></div>' +
				'<div class="display-main"></div>' +
				'</div></div></td></tr></table></div>' +
				'<div class="mask"></div></div>';
		$('body').html(html);
		
		// Start by displaying the existing Banner Image
		clearDisplay("View Image", "view-link");
		var html =  '<table cellspacing="0" cellpadding="0" class="image-display show">' + 
					    '<tr><td class="displayzone">' +
						    '<div class="container">' +
								'<div class="head"><h1>Banner Image</h1></div>' +
								'<img id="displayonly" src="'+saved_edit+'">' + 
								'<div class="nav"><a id="goEdit">Edit Image</a></div>' +
							'</div>' +
						'</td></tr>' +
					'</table>'; 
		$('.display-main').append(html);             

		// Ensure the Edit Image button links to the Edit Image tab
		$('.nav').find('#goEdit').bind('click', function() {
			clearDisplay("Edit Image", "edit-link");
            $('#image-editor').iedit('start', {
					viewportWidth: 700,
					viewportHeight: 300,
					startX: 0, 
					startY: 0,
					startZoom: 100, 
					title: 'Banner Image', 
					original: orig,
					edited: saved_edit
                });
			$('.extra-tools').show();
		});

	$('#view-link').click(function() {
		clearDisplay("View Image", "view-link");
		
		var html =  '<table cellspacing="0" cellpadding="0" class="image-display show">' + 
					    '<tr><td class="displayzone">' +
						    '<div class="container">' +
								'<div class="head"><h1>Banner Image</h1></div>' +
								'<img id="displayonly" src="'+saved_edit+'">' + 
								'<div class="nav"><a id="goEdit">Edit Image</a></div>' +
							'</div>' +
						'</td></tr>' +
					'</table>'; 
		$('.display-main').append(html);

		// Ensure the Edit Image button links to the Edit Image tab
		$('.nav').find('#goEdit').bind('click', function() {
			clearDisplay("Edit Image", "edit-link");
			$('#image-editor').iedit('start', {
					viewportWidth: 700,
					viewportHeight: 300,
					startX: 0, 
					startY: 0,
					startZoom: 100, 
					title: 'Banner Image', 
					original: orig,
					edited: saved_edit
			});
			$('.extra-tools').show();
		});
	});
		
	$('#upload-link').click(function() {
		clearDisplay("Upload Image", "upload-link");
		$('.fileupload-buttonbar').show();
		$('#dragtext').show();
		
		// Display the image upload tab
		var html = '<table cellspacing="0" cellpadding="0" class="image-edit show"><tr><td class="panzone">' +
			'<div class="dropzone">' +
			'<p id="dragtext">Drag an image here<br /><br />Or<br /><br /></p>' +
				'<form id="fileupload" action="server/upload.php" method="POST" enctype="multipart/form-data">' +
					'<div class="fileupload-buttonbar">' +
					'<span class="btn btn-success fileinput-button">' +
					'<span>Choose an image...</span>' +
                    '<input type="file" name="files[]">' +
					'</span></div>' +
				'</form>' +
			'<div class="progress-container"><div id="progress"><div class="bar"></div></div></div>' +
			'</div></td></tr></table>';
		$('.display-main').append(html);
		
		// Initialize the jQuery File Upload widget:
		$('#fileupload').fileupload({
			dataType: 'json',
			autoUpload: 'true',
			progressall: function (e, data) {
				$('#upload-error').remove();
				$('.fileupload-buttonbar').hide();
				$('#dragtext').hide();
				$('#progress').show();
				
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
					'width',
					progress + '%'
				)}
		});

		// Enable iframe cross-domain access via redirect option:
		$('#fileupload').fileupload(
			'option',
			'redirect',
			window.location.href.replace(
				/\/[^\/]*$/,
				'/server/result.html?%s'
			)
		);

		// Redirect to Edit Image tab after upload completes
		$('#fileupload').bind('fileuploadalways', function (e, data) {
            var jresp = $.parseJSON(data.jqXHR.responseText);
            if (jresp == null) var jresp = data.result;
            
			// Confirm success of the upload
            if (jresp != null) {
			if (typeof jresp.error !== "undefined") {
				$('#progress').hide();
				var upload_error = '<div id="upload-error">There was an error during the upload. Please try again.</div>';
				$('.panzone').append(upload_error);
			} else {
                var newimage = jresp.url
				clearDisplay("Edit Image", "edit-link");
				orig = newimage;
				if (isEditShown === true) $('#image-editor').iedit('destroy');
				$('#image-editor').iedit('start', {	
					viewportWidth: 700,
					viewportHeight: 300, 
					startX: 0, 
					startY: 0,
					startZoom: 100, 
					title: 'Banner Image', 
					original: newimage,
					edited: saved_edit
				});
				$('.extra-tools').show();
            }
            }
		});

		// Hover effects for drag and drop
		$(document).bind('dragover', function (e) {
			var dropZone = $('.dropzone'),
				timeout = window.dropZoneTimeout;
			if (!timeout) {
				dropZone.addClass('in');
			} else {
				clearTimeout(timeout);
			}
			if (e.target === dropZone[0]) {
				dropZone.addClass('hover');
			} else {
				dropZone.removeClass('hover');
			}
			window.dropZoneTimeout = setTimeout(function () {
				window.dropZoneTimeout = null;
				dropZone.removeClass('in hover');
			}, 100);
		});
	});
	
	$('#edit-link').click(function() {
		clearDisplay("Edit Image", "edit-link");
		
		// Display the Image Editor
		$('#image-editor').iedit('start', {						
					viewportWidth: 700,
					viewportHeight: 300,
					startX: 0, 
					startY: 0,
					startZoom: 100, 
					title: 'Banner Image', 
					original: orig,
					edited: saved_edit
		});
		
        $('.extra-tools').show();
		var isEditShown = true;
	});
	
	$('#library-link').click(function() {
		clearDisplay("Choose From Library", "library-link");
		
		// Display the Library browser (currently empty)
		
	});
	
	
	// Close the iEdit window
	$(document).find('#iedit-close').click(function() {
		$('#image-editor').remove();
	}); 	

	
	});
});