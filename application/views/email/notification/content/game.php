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
										?>&zoom=12&size=150x150&sensor=false" /></a>
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
	$timestring = strtotime($obj_full->gameDay." ".$obj_full->gameTime);

	$url = "https://maps.googleapis.com/maps/api/timezone/json?location=".$lonlat[1].",".$lonlat[0]."&timestamp=".$timestring."&sensor=false";
	$tzjson = file_get_contents($url);
	$tzjson = get_object_vars(json_decode($tzjson));
	//print_r($tzjson);

	$timestring = $timestring - $tzjson['rawOffset'] - $tzjson['dstOffset'];

	$dtt_start = date('Ymd\THis\Z',$timestring);
	$dtt_end = date('Ymd\THis\Z',$timestring + 3600);

	$attachment = "BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Athletez//EN
BEGIN:VEVENT
UID:event".$obj_full->id."@".$_SERVER['SERVER_NAME']."
DTSTAMP:".$dtt_start."
DTSTART:".$dtt_start."
DTEND:".$dtt_end."
SUMMARY:".$obj_full->name()."
DESCRIPTION:";

	if($feed->hasAction('updated')) $attachment.= "
STATUS:UPDATED";

	$attachment .= "
LOCATION:".$obj_full->get_game_location()."
END:VEVENT
END:VCALENDAR";

	$queued->addAttachment($attachment);
}