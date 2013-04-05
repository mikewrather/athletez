<?php
/**
 * User: mike
 * Date: 2/2/13
 * Time: 2:55 PM
 */
$e = Kohana::$config->load('error_messages');
return array(
	'password' => array(
		'not_empty' => $e->get('not_null'),
	),
	'password_confirm' => array(
		'matches' => 'The password fields did not match.',
	),
);