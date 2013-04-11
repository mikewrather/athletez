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
	);