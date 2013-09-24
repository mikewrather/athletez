<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-20
 * Time: 下午6:31
 * To change this template use File | Settings | File Templates.
 */

	$e = Kohana::$config->load('error_messages');

	return array(
		'all_info' => array(
			'not_empty' => 'The address you entered could not be verified.  Please check and make sure that this address exists and try again.',
		)
	);