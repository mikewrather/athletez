<?php
/**
 * User: mike
 * Date: 2/2/13
 * Time: 2:55 PM
 */
$e = Kohana::$config->load('error_messages');
return array(
	'fitness_data_id' => array(
		'fitness_datavalue_exist' => $e->get('fitness_datavalue_exist'),
	),
	'fitness_data_values_id' => array(
		'fitness_data_values_id_exist' => $e->get('fitness_data_values_id_exist'),
	)
);