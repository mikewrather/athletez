<br>
<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">

			<table cellpadding="0" cellspacing="0" border="0" align="center" width="80%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td><?php
						if($feed->hasAction(array('comment','feedparent')))
						{
							?>new comment on team page<?php
						}
						elseif($feed->hasAction(array('comment')))
						{
							?>new comment on team page<?php
						}

						echo $obj_full->name();

						?>
						<span style="font-weight: bold; font-size: 12px;"></span><br>
						<span style="font-size: 12px;"></span>
					</td>
				</tr>
			</table>
			<br>
		</td>
	</tr>
</table>