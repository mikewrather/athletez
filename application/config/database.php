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
			'database'   => 'boxscore',
			'username'   => 'root',
			'password'   => 'R370ad3d',
			'persistent' => FALSE,
		),
		'table_prefix' => '',
		'charset'      => 'utf8',
		'caching'      => FALSE,
	),
	'scraping' => array
	(
		'type'       => 'MySQL',
		'connection' => array(
			'hostname'   => 'localhost',
			'database'   => 'sportsdata',
			'username'   => 'root',
			'password'   => 'R370ad3d',
			'persistent' => FALSE,
		),
		'table_prefix' => '',
		'charset'      => 'utf8',
		'caching'      => FALSE,
	),

);

//SET UP CASE FOR ENV
if(Kohana::$environment == Kohana::LOCALHOST)
{
	$dbconfig['default']['connection']['password'] = '  qmi!#j';
	$dbconfig['scraping']['connection']['password'] = '  qmi!#j';
}

return $dbconfig;