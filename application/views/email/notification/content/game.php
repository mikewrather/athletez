<br>
<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">

			<table cellpadding="0" cellspacing="0" border="0" align="center" width="80%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td align="center" style="width:70px;">
						<?php $image = $obj_full->getPrimaryImage();

						if($image){
							print_r($image);

						/*	?><img src="<?php

							?>" width="55" height="55" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"><?php*/
						}?>
					</td>
					<td>
						<span style="font-weight: bold; font-size: 12px;">Game Scheduled For <?php
							echo date('M jS, g:i a',strtotime($obj_full->gameDay." ".$obj_full->gameTime));
						?>:</span><br>
						<span style="font-size: 12px;"><br />Address: <br /><a href="https://www.google.com/maps/preview#!q=<?php
							echo urlencode($obj_full->get_game_location()); ?>"><?php
								echo $obj_full->get_game_location(); ?></a></span>
					</td>
				</tr>
			</table>
			<br>
		</td>
	</tr>
</table>