<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-6
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
	$e = Kohana::$config->load('error_messages');
	return array(
		//TODO,Add by Jeffrey. Below can remove later, It's unnecessay if the validate function name "not_equals" already have default message in messages/validation.php.
//		'complevels_id' => array(
//			'not_equals' => $e->get('not_null'),
//		),
//		'seasons_id' => array(
//			'not_equals' => $e->get('not_null'),
//		),

	);