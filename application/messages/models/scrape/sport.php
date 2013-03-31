<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 上午11:32
 * To change this template use File | Settings | File Templates.
 */

	return array(
		'name' => array(
			'not_empty' => 'Sport name required',
		),
		'male' => array(
			'in_array' => 'Only True/False accepted in :field column',
		),
		'female' => array(
			'in_array' => 'Only True/False accepted in :field column',
		),
		'sport_type_id' => array(
			'Model_Scrape_Sport::check_sport_type_exist' => ':field does not exist',
		)
	);