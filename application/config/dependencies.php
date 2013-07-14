<?php
/**
 * Date: 7/8/13
 * Time: 3:34 AM
 *
 * @author: Mike Wrather
 *
 */

return array(
	//delete media
	'Media_Base' => array(
		'Media_Image' => 'media_id',
		'Media_Video' => 'media_id',
		'Site_Tag' => 'media_id'
	),
	'Media_Image' => array(
		'Media_Imagetypelink' => 'images_id',
	),
	'Media_Video' => array(
		'Media_Videotypelink' => 'videos_id'
	),
	'Media_Videotypelink' => array(
		'Media_Videometa' => 'video_type_link_id'
	),

	//delete org
	'Sportorg_Org' => array(
		'Sportorg_Orgsportlink' => 'orgs_id',
	),
	'Sportorg_Orgsportlink' => array(
		'Sportorg_Team' => 'org_sport_link_id'
	),

	//delete team
	'Sportorg_Team' => array(
		'Sportorg_Games_Teamslink' => 'teams_id',
		'Stats_Vals' => 'teams_id',
		'User_Teamslink' => 'teams_id',
	),

	'User_Teamslink' => array(
		'User_Teamslink_Positionlink' => 'users_teams_link_id'
	),

	//postion
	'Sportorg_Position' => array(
		'User_Teamslink_Positionlink' => 'positions_id',
		'User_Resume_Data_Profile_Sportslink' => 'positions_id'
	),








	//de








);