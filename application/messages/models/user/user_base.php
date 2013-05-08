<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Jeffrey
 * Date: 13-4-4
 * Time: 下午10:04
 * To change this template use File | Settings | File Templates.
 */

	return array(
//		'username' => array(
//			'not_empty' => 'You must provide a username.',
//			'min_length' => 'The username must be at least :param2 characters long.',
//			'max_length' => 'The username must be less than :param2 characters long.',
//			'username_available' => 'This username is already in use.',
//		),
		'email' => array(
			'not_empty' => 'You must enter an email address',
			'email' =>	'Please enter valid email address',
			'unique_email' => 'This email address is already in use.',
		),
		'gender' => array(
			'in_array' => 'Gender must M or F'
		)
	);