<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 上午11:32
 * To change this template use File | Settings | File Templates.
 */
$e = Kohana::$config->load('error_messages');

return array(
	'name' => array(
		'not_empty' => $e->get('not_null'),
	),
	'male' => array(
		'in_array' => $e->get('bool'),
	),
	'female' => array(
		'in_array' => $e->get('bool'),
	),
	'sport_type_id' => array(
		'Model_Scrape_Sport::check_sport_type_exist' => $e->get('not_found'),
	)
);