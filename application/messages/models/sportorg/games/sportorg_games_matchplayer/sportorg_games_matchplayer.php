<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-4
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */

	return array(
		'users_id' => array(
			'not_equals' => ':field can\'t be null',
		),
		'game_matches_id' => array(
			'game_match_id_exist' => ':field not exist',
		),
		'match_winner' => array(
			'in_array' => ':field only accept True/False',
		)
	);