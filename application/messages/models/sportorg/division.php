<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-2
 * Time: 下午9:46
 * To change this template use File | Settings | File Templates.
 */

$e = Kohana::$config->load('error_messages');

return array(
	'states_id' => array(
		'not_equals' => $e->get('not_null'),
	),
	'sections_id' => array(
		'not_equals' => $e->get('not_null'),
	)
);