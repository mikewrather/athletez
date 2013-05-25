<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-4
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */
$e = Kohana::$config->load('error_messages');
return array(
	'users_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'game_matches_id' => array(
		'game_match_id_exist' => $e->get('not_found'),
	),
	'match_winner' => array(
		'in_array' => $e->get('bool'),
	)
);