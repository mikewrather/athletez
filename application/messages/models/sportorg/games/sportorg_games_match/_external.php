<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-4
 * Time: 下午12:40
 * To change this template use File | Settings | File Templates.
 */
$e = Kohana::$config->load('error_messages');
return array(
	'games_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'match_num' => array(
		'match_num_unique_in_one_game' => $e->get('unique'),
	)
);