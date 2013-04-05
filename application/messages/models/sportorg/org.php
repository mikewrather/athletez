<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 下午9:35
 * To change this template use File | Settings | File Templates.
 */
$e = Kohana::$config->load('error_messages');

return array(
	'single_sport' => array(
		'in_array' => $e->get('bool'),
	),
	'season_profiles_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'complevel_profiles_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'leagues_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'divisions_id' => array(
		'not_equals' => $e->get('not_null'),
	)
);