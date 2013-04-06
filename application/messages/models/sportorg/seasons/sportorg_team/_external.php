<?php
	/**
	 * Created by JetBrains PhpStorm.
	 * User: Jeffrey
	 * Date: 13-3-31
	 * Time: 下午10:47
	 * To change this template use File | Settings | File Templates.
	 */
	$e = Kohana::$config->load('error_messages');
	return array(
		'org_sport_link_id' => array(
			'check_org_sport_id_exist' => $e->get('org_sport_not_exist')
		),
		//TODO,Add by Jeffrey. Below can remove later, It's unnecessay if the validate function name "not_equals" already have default message in messages/validation.php.
//		'seasons_id' => array(
//			'not_equals' => $e->get('not_null'),
//		),
//		'complevels_id' => array(
//			'not_equals' => $e->get('not_null'),
//		),
	);