<br>
<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">

			<table cellpadding="0" cellspacing="0" border="0" align="center" width="80%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td align="center" style="width:70px;">
						<img src="<?php echo $comment['user']['user_picture_obj']['types']['small_thumb']['url']; ?>" width="55" height="55" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
					</td>
					<td>
						<span style="font-weight: bold; font-size: 12px;"><?php echo $comment['user']['name']; ?> Posted a New Comment on <?php echo $comment['comment_date']; ?>:</span><br>
						<span style="font-size: 12px;"><?php echo $comment['comment']; ?></span>
					</td>
				</tr>
			</table>
			<br>
		</td>
	</tr>
</table>