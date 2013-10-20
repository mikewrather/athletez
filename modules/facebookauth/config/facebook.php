<?php defined('SYSPATH') or die('No direct access allowed.');

/* Facebook
Permissions list: https://developers.facebook.com/docs/reference/api/permissions/
Facebook Query Language: http://developers.facebook.com/docs/reference/fql/
*/
//if(Kohana::$environment == Kohana::PRODUCTION)
if(Kohana::$environment == Kohana::DEVELOPMENT || Kohana::$environment == Kohana::LOCALHOST || Kohana::$environment == Kohana::PRODUCTION){
{
	return array(
		'appId'			=> '219148511595084',
		'secret'		=> '9fbebcbf568334f8a7efa0b12ccc3c8b',
		'cookie'		=> true,

		/* (optional) The URL to redirect the user to once the login/authorization process is complete.
		The user will be redirected to the URL on both login success and failure, so you must check the
		error parameters in the URL as described in the authentication documentation.
		If this property is not specified, the user will be redirected to the current URL
		(i.e. the URL of the page where this method was called, typically the current URL in the user's browser). */
		//'redirect_uri'   => url::site(Request::current()->uri(), true),

		/* (optional) Next URL to which to redirect the user after logging out (should be an absolute URL). */
		//'next'  =>  url::site(Request::current()->uri(), true),

		/* (optional) The permissions to request from the user. If this property is not specified, basic
		permissions will be requested from the user. */
		'scope'         => 'email, offline_access, publish_stream',

		/* (optional) The display mode in which to render the dialog. The default is page, but can be set to other values
		such as popup. */
		'display'   =>  'page',

		/* Fields from users table.
		user: http://developers.facebook.com/docs/reference/fql/user/ */
		'fields'    => 'uid, username, pic, name, email',

		/* Where to store session files.
		   For example:  'native', 'database'
		 */
		'session_type' => 'native',

	);
}
elseif(Kohana::$environment == Kohana::DEVELOPMENT || Kohana::$environment == Kohana::LOCALHOST){
	return array(
		'appId'			=> '239430712864961',
		'secret'		=> 'c0ca56d9d4b2345ef36a539d8851189b',
		'cookie'		=> true,

		/* (optional) The URL to redirect the user to once the login/authorization process is complete.
		The user will be redirected to the URL on both login success and failure, so you must check the
		error parameters in the URL as described in the authentication documentation.
		If this property is not specified, the user will be redirected to the current URL
		(i.e. the URL of the page where this method was called, typically the current URL in the user's browser). */
		//'redirect_uri'   => url::site(Request::current()->uri(), true),

		/* (optional) Next URL to which to redirect the user after logging out (should be an absolute URL). */
		//'next'  =>  url::site(Request::current()->uri(), true),

		/* (optional) The permissions to request from the user. If this property is not specified, basic
		permissions will be requested from the user. */
		'scope'         => 'email, offline_access, publish_stream',

		/* (optional) The display mode in which to render the dialog. The default is page, but can be set to other values
		such as popup. */
		'display'   =>  'page',

		/* Fields from users table.
		user: http://developers.facebook.com/docs/reference/fql/user/ */
		'fields'    => 'uid, username, pic, name, email',

		/* Where to store session files.
		   For example:  'native', 'database'
		 */
		'session_type' => 'native',

	);

}
