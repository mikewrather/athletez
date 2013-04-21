<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-21
 * Time: 下午7:10
 * To change this template use File | Settings | File Templates.
 */

	$e = Kohana::$config->load('error_messages');

	return array(
		'sport_type_id' =>array(
			'sport_type_id_exist' => $e->get("sport_type_id_exist"),
		),
	);