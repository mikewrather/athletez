<?php defined('SYSPATH') OR die('No direct access allowed.');

$dbconfig = array
(
	'default' => array
	(
		'type'       => 'MySQL',
		'connection' => array(
			/**
			 * The following options are available for MySQL:
			 *
			 * string   hostname     server hostname, or socket
			 * string   database     database name
			 * string   username     database username
			 * string   password     database password
			 * boolean  persistent   use persistent connections?
			 * array    variables    system variables as "key => value" pairs
			 *
			 * Ports and sockets may be appended to the hostname.
			 */
			'hostname'   => 'localhost',
			'database'   => 'athletesup_main',
			'username'   => 'root',
			'password'   => '', //PASSWORD SET BELOW
		),
		'table_prefix' => '',
		'charset'      => 'utf8',
		'caching'      => FALSE,
	),
);

//SET UP CASE FOR ENV
if(Kohana::$environment == Kohana::LOCALHOST || Kohana::$environment == Kohana::DEVELOPMENT)
{
	$dbconfig['default']['connection']['password'] = ''; // UPDATE PASSWORD
	$dbconfig['scraping']['connection']['password'] = '';// UPDATE PASSWORD
}
elseif(Kohana::$environment == Kohana::PRODUCTION)
{
	$dbconfig['default']['connection']['hostname'] = 'athletez.cvl37zb89ev5.us-east-1.rds.amazonaws.com';
	$dbconfig['default']['connection']['password'] = 'WIrdw4S99f2LUp7m'; //UPDATE PASSWORD
	$dbconfig['default']['connection']['username'] = 'mike';
}

return $dbconfig;