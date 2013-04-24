<?php defined('SYSPATH') OR die('No direct script access.');

/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-6
 * Time: 下午4:34
 * To change this template use File | Settings | File Templates.
 */
	//User can overwrite the kohana default validation error messages here.
	//Also user can add global custom validaton messages here.
	$e = Kohana::$config->load('error_messages');
	return array(
		'not_equals' => $e->get('not_null'),
		'unique_email' => $e->get('unique_email'),
		'subject_id_exist' => $e->get('subject_id_exist'),
		'resume_data_profiles_id_exist' => $e->get('resume_data_profiles_id_exist'),
		'resume_data_id_exist' => $e->get('resume_data_id_exist'),
		'stat_contexts_id_exist' => $e->get('stat_contexts_id_exist'),
		'resume_data_groups_id_exist' => $e->get('resume_data_groups_id_exist'),
		'users_id_exist' => $e->get('users_id_exist'),
		'location_type_exist' => $e->get('location_type_exist'),
		'state_entity_exist' => $e->get('state_entity_exist'),
		'correct_date_format' => $e->get('correct_date_format'),
		'season_profiles_id_exist' => $e->get('season_profiles_id_exist'),
		'locations_id_exist' => $e->get('locations_id_exist'),
		'states_id_exist' => $e->get('states_id_exist'),
		'sections_id_exist' => $e->get('sections_id_exist'),
		'complevel_profiles_id_exist' => $e->get('complevel_profiles_id_exist'),
		'leagues_id_exist' => $e->get('leagues_id_exist'),
		'divisions_id_exist' => $e->get('divisions_id_exist'),
		'video_services_id_exist' => $e->get('video_services_id_exist'),
		'media_id_exist' => $e->get('media_id_exist'),
	);