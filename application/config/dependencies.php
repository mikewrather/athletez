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

	//sport
	'Sportorg_Sport' => array(
		'Sportorg_Section' => 'sports_id',
		'Sportorg_Orgsportlink' => 'sports_id',
		'Sportorg_Position' => 'sports_id',
		//'Stats_Tab' TODO, add by jeffrey
		//'Stats_Base' TODO, add by jeffrey
		'Media_Base' => 'sports_id'
	),

	'Sportorg_Section' => array(
		'Sportorg_League' => 'sections_id',
		'Sportorg_Division' => 'sections_id'
	),

	'Sportorg_League' => array(
		'Sportorg_Org' => 'leagues_id',
	),

	'Sportorg_Division' => array(
		'Sportorg_Org' => 'divisions_id',
	),

	'Sportorg_Orgsportlink' => array(
		'Sportorg_Team' => 'org_sport_link_id',
	),

	'Sportorg_Position' => array(
		'User_Resume_Data_Profile_Sportslink' => 'positions_id',
		'User_Teamslink_Positionlink' => 'positions_id',
	),

	//team
	'Sportorg_Team' => array(
		'Sportorg_Games_Teamslink' => 'teams_id',
		'Stats_Vals' => 'teams_id',
		'User_Teamslink' => 'teams_id',
	),

	'User_Teamslink' => array(
		'User_Teamslink_Positionlink' => 'users_teams_link_id',
	),

	'Sportorg_Seasons_Base' => array(
		'Sportorg_Team' => 'seasons_id'
	),

	'Sportorg_Seasons_Profile' => array(
		'Sportorg_Seasons_Base' => 'season_profiles_id',
		'Sportorg_Org' => 'season_profiles_id',
	),

	'Sportorg_Complevel_Base' => array(
		'Sportorg_Team' => 'complevels_id',
	),

	'Sportorg_Complevel_Profile' => array(
		'Sportorg_Complevel_Base' => 'complevel_profiles_id',
		'Sportorg_Org' => 'complevel_profiles_id'
	),

	'User_Resume_Data' => array(
		'User_Resume_Data_Vals' => 'resume_data_id',
	),

	'User_Resume_Data_Group' => array(
		'User_Resume_Data_Group_Profilelink' => 'resume_data_groups_id',
		'User_Resume_Data' => 'resume_data_groups_id'
	),

	'User_Resume_Data_Profile' => array(
		'User_Resume_Data_Group_Profilelink' => 'resume_data_profiles_id',
		'User_Resume_Data_Profile_Sportslink' => 'resume_data_profiles_id',
	),

	//No dependency table
	'User_Resume_Data_Vals' => array(

	),

	'Sportorg_Games_Base' => array(
		'Sportorg_Games_Match' => 'games_id',
		'Sportorg_Games_Teamslink' => 'games_id',
		'Stats_Vals' => 'games_id',
		'Site_Pog' => 'games_id',
		'User_Sportlink_Gamelink' => 'games_id'
	),

	//do game related
	'Sportorg_Games_Match' => array(
		'Sportorg_Games_Matchplayer' => 'game_matches_id',
	),

	'Location_Base' => array(
		'Sportorg_Org' => 'locations_id',
		'Sportorg_Games_Base' => 'locations_id'
	),

	//TODO, add by Jeffrey, like users stable ,there is cities_id there ,but no relationship line connected.
	'Location_City' => array(
		'Location_Base' => 'cities_id',
	),

	'Location_County' => array(
		'Location_City' => 'county_id'
	),

	//TODO, as to states_id, we may lose some line connection on states
	'Location_State' => array(
		'Location_County' => 'states_id',
		'Sportorg_Section' => 'states_id',
		'Sportorg_Division' => 'states_id',
		'Sportorg_League' => 'states_id'
	),

	// Sportorg_Section already have config in above line 62

	'Sportorg_Division' => array(
		'Sportorg_Org' => 'divisions_id',
	),

	'Sportorg_League' => array(
		'Sportorg_Org' => 'leagues_id'
	),

	'Academics_Tests' => array(
		'Academics_Tests_Topics' => 'academics_tests_id'
	),

	'Academics_Tests_Topics' => array(
		'Academics_Tests_Scores' => 'academics_tests_topics_id'
	),

	'Sportorg_Games_Matchplayer' => array(

	)












	//de








);