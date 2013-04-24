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
	);