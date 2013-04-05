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
	'season_profiles_id' => array(
		'not_equals' => $e->get('not_null'),
	)
);