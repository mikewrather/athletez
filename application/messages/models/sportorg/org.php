<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 下午9:35
 * To change this template use File | Settings | File Templates.
 */

	return array(
		'single_sport' => array(
			'in_array' => ':field only accept 0 or 1'
		),
		'season_profiles_id' => array(
			'not_equals' => ':field can\'t be null',
		),
		'complevel_profiles_id' => array(
			'not_equals' => ':field can\'t be null',
		),
		'leagues_id' => array(
			'not_equals' => ':field can\'t be null',
		),
		'divisions_id' => array(
			'not_equals' => ':field can\'t be null',
		)
	);