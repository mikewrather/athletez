<script type="text/javascript" src="/plupload/js/plupload.full.js"></script>
<script type="text/javascript" src="/plupload/js/jquery.ui.plupload/jquery.ui.plupload.js"></script>

<script type="text/javascript">
	$(function () {
		var uploader = new plupload.Uploader({
			runtimes:'gears,html5,flash,silverlight,browserplus',
			browse_button:'pickfiles',
			container:'container',
			max_file_size:'500mb',
			max_file_count:1,
			chunk_size:'5mb',
			url:'/api/user/addvideo/425983',
			unique_names:true,
			flash_swf_url:'/plupload/js/plupload.flash.swf',
			silverlight_xap_url:'/plupload/js/plupload.silverlight.xap',
			filters:[
				{title:"Video files", extensions:"mov,mp4,mpeg4,avi,mkv,webm,ogg"}
			],
			multipart_params:{title:''},
			init : {
				ChunkUploaded : function(up,file,info){
					console.log(file,info);
				},
				FileUploaded : function(up,file,info){
					$('#' + file.id + " b").html("100%");
					$('#uploadfiles').removeClass('isUploading');
					up.refresh();
					$('form.form input').val('');
					var result = $.parseJSON(info.response);
					console.log(result);
					if(result.result == 'success')
					{
						$('#resultdiv').html("SUCCESS! Your video has been uploaded and is now being encoded.  This may take a few minutes.  You will receive an email when the video is ready to view.  If anything goes wrong you can refer to the encode job ID: " + result.jobID).show();
					}
					console.log(file,info);
				}
			}
		});

		uploader.bind('Init', function (up, params) {
			$('#filelist').html("<div></div>");
		});

		$('#uploadfiles').click(function (e) {
			if($('input#title').val() == '') {
				alert("Please enter a title for this video.");
				return;
			}
			else
			{
				uploader.settings.multipart_params.name = $('input#title').val();
				uploader.settings.multipart_params.mm = $('input#mm').is(':checked');
				uploader.settings.multipart_params.sports_id = $('select#sports_id').val();
				$('#uploadfiles').addClass('isUploading');
				uploader.start();
			}
			e.preventDefault();
		});

		uploader.init();

		uploader.bind('FilesAdded', function (up, files) {
			maxCountError = false;
			$.each(files, function (i, file) {
				if(uploader.settings.max_file_count && i >= uploader.settings.max_file_count){
					maxCountError = true;
					setTimeout(function(){ up.removeFile(file); }, 50);
				}
				else
				{
					$('#filelist').append(
						'<div id="' + file.id + '">' +
							file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
							'</div>');
				}
				if(maxCountError)
				{
					$('#resultdiv').html("You can only select one video at a time.").show();
				}
			});

			up.refresh(); // Reposition Flash/Silverlight
		});

		uploader.bind('UploadProgress', function (up, file) {
			$('#' + file.id + " b").html(file.percent + "%");
		});

		uploader.bind('Error', function (up, err) {
			$('#filelist').append("<div>Error: " + err.code +
				", Message: " + err.message +
				(err.file ? ", File: " + err.file.name : "") +
				"</div>"
			);

			up.refresh(); // Reposition Flash/Silverlight
		});
	});
</script>

<div id="file_upload"></div>
<form class="form">
	<div id="container">
		<div id="filelist">No runtime found.</div>

	<span class="file-wrapper">
				<div class="qq-upload-button" id="pickfiles" style="float:left; width:95%;">
					<span>Select a Video File</span>
					<span style="font-size:11px; display:block; color:#880000;" id="fileVal"></span>
				</div></span><br/>
		<label>Title:</label>
		<input type="text" id="title" name="title" style="width:95%" placeholder="Enter a Title"/>
		<label style="margin-bottom: 2px;">Sport</label>
		<select name="sports_id" id="sports_id" style="width:95%;" class="">
			<?php
			foreach ($sports as $sport)
			{
				?>
				<option value="<?php echo $sport->id; ?>"><?php

				echo str_replace(array("Men's","Women's"),'',$sport->name);
				if($sport->male==1 && $sport->female==0){
					echo " (Men's) ";
				}
				elseif($sport->female==1 && $sport->male==0)
				{
					echo " (Women's) ";
				}
				else if($sport->female==1 && $sport->male==1){
					echo " (Individual) ";
				}

				?></option><?php
			}
			?></select>

		<div id="uploadfiles" class="qq-upload-button" style="width:70px;">Upload</div>

	</div>
</form>

<div id="resultdiv" style="display: none; padding-left: 10px;"></div>