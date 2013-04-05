<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-3-31
 * Time: 下午11:36
 * To change this template use File | Settings | File Templates.
 */

$e = Kohana::$config->load('error_messages');

return array(
	'sections_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'states_id' => array(
		'not_equals' => $e->get('not_null'),
	)
);