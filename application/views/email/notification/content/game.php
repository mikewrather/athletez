<br>
<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="contentTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" valign="top" align="center">

			<table cellpadding="0" cellspacing="0" border="0" align="center" width="80%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>

					<td><br/><br/>
						<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tr>
								<td>
									<a href="https://www.google.com/maps/preview#!q=<?php echo urlencode($obj_full->get_game_location()); ?>"><?php
										$lonlat = $obj_full->get_game_lonlat();
										?>
										<img height="150" width="150" src="http://maps.googleapis.com/maps/api/staticmap?center=<?php
											echo $lonlat[0].",".$lonlat[1];
										?>&markers=<?php
											echo urlencode("color:blue|".$lonlat[1].",".$lonlat[0]);
										?>&zoom=14&size=150x150&sensor=false" /></a>
								</td>
								<td valign="top" style="font-size: 18px; line-height: 22px; padding-left: 15px;">
									<span style=" color: #333; text-decoration: none;"><?php
										echo date('M jS, g:i a',strtotime($obj_full->gameDay." ".$obj_full->gameTime));

									?><br /><br/><a style=" color: #333; text-decoration: none;" href="https://www.google.com/maps/preview#!q=<?php
										echo urlencode($obj_full->get_game_location());
									?>"><?php
										echo $obj_full->get_game_location(); ?></a></span>
								</td>
							</tr>
						</table>

					</td>
				</tr>
			</table>
			<br>
		</td>
	</tr>
</table><?php

if(strtotime($obj_full->gameDay." ".$obj_full->gameTime) > time())
{
	//$tz = date_default_timezone_get();

	//date_default_timezone_set('UTC');
	$dtt_start = date('Ymd\THis\z',strtotime($obj_full->gameDay." ".$obj_full->gameTime));
	$dtt_end = date('Ymd\THis\z',strtotime($obj_full->gameDay." ".$obj_full->gameTime) + 7200);
	//date_default_timezone_set($tz);
	$attachment = "BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Athletez//EN
BEGIN:VEVENT
UID:$dtt_start@athletez.com
DTSTAMP:".$dtt_start."
DTSTART:".$dtt_start."
DTEND:".$dtt_end."
SUMMARY:".$obj_full->name()."
DESCRIPTION:
LOCATION:".$obj_full->get_game_location()."
END:VEVENT
END:VCALENDAR";

	$queued->addAttachment($attachment);
}