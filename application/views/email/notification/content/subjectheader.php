<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border: 1px solid #c9c9c9;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">
			<!-- START OF TEST CONTENT -->
			<br>
			<br>
			<table cellpadding="0" cellspacing="0" border="0" align="center" width="90%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td align="left" style="width:160px;">
						<img src="<?php

			if($subject['enttypes_id']==1){
				echo $subject['user_picture_obj']['types']['standard_thumb']['url'];
			}
			elseif($subject['enttypes_id']==8){
				echo $subject['game_picture']['types']['standard_thumb']['url'];
			}
			elseif($subject['enttypes_id']==5){
				echo $subject['user_picture_obj']['types']['standard_thumb']['url'];
			}
			elseif($subject['enttypes_id']==21){
				echo $subject['types']['standard_thumb']['url'];
			}
			elseif($subject['enttypes_id']==20){
				echo $subject['types']['standard_thumb']['url'];
			}
			?>" width="150" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">

		</td>
		<td align="left" valign="top" id="entInfo">
			<span style="font-size: 20px;font-weight: bolder;display: block;line-height: 25px;"><?php echo (isset($subject['title']) && $subject['title']!="") ? $subject['title'] : $subject['name']; ?></span>
			<span style="display: block;line-height: 25px;font-size: 14px;">Total Votes: <?php echo (int)$subject['num_votes']; ?></span>
			<span style="display: block;line-height: 25px;font-size: 14px;">Total Followers: <?php echo (int)$subject['num_followers']; ?></span>
		</td>
	</tr>
</table>