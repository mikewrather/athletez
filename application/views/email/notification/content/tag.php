<?php

?><br>
<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">

			<table cellpadding="0" cellspacing="0" border="0" align="center" width="80%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td align="center" style="width:70px;">
						<img src="<?php echo $mobj['types']['small_thumb']['url']; ?>" width="55" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;">
					</td>
					<td>
						<span style="font-weight: bold; font-size: 12px;"><?php
							echo $obj['tagger']['name']." tagged ";
							if($obj['tagger']['id'] == $obj['subject']['id'])
								echo $obj['tagger']['gender'] == 'M' ? "himself " : "herself ";
							else
								echo $obj['subject']['name'];
							echo " on " . date('M j,S h:i a',strtotime($obj['timePosted']));
						 ?></span><br>
						<span style="font-size: 12px;"></span>
					</td>
				</tr>
			</table>
			<br>
		</td>
	</tr>
</table>