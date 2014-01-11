<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border: 1px solid #c9c9c9;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">
			<!-- START OF TEST CONTENT -->
			<br>
			<br>
			<table cellpadding="0" cellspacing="0" border="0" align="center" width="90%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<?php
					$subject_pic = false;
					if($subject['enttypes_id']==19)
					{
						$sub_obj = Model_Media_Base::get_media_as_correct_type($subject['id']);
						$subject = $sub_obj->getBasics();
					}

					if($subject['enttypes_id']==1){
						$subject_pic =  $subject['user_picture_obj']['types']['standard_thumb']['url'];
					}
					elseif($subject['enttypes_id']==8){
						$subject_pic =  $subject['game_picture']['types']['standard_thumb']['url'];
					}
					elseif($subject['enttypes_id']==5){
						$subject_pic =  $subject['user_picture_obj']['types']['standard_thumb']['url'];
					}
					elseif($subject['enttypes_id']==21){
						$subject_pic =  $subject['types']['standard_thumb']['url'];
					}
					elseif($subject['enttypes_id']==20){
						$subject_pic =  $subject['types']['standard_thumb']['url'];
					}

					if($subject_pic){
					?>
					<td align="left" style="width:160px;">
						<img src="<?php echo $subject_pic; ?>" width="150" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">

					</td><?php }
					?><td align="left" valign="top" id="entInfo">
						<span style="font-size: 20px;font-weight: bolder;display: block;line-height: 25px;"><?php

							echo method_exists($sub_obj,'name') ? $sub_obj->name() : $subject['title'];
							?></span>
			<span style="display: block;line-height: 25px;font-size: 14px;">Total Votes: <?php echo (int)$subject['num_votes']; ?></span>
			<span style="display: block;line-height: 25px;font-size: 14px;">Total Followers: <?php echo (int)$subject['num_followers']; ?></span>
		</td>
	</tr>
</table>